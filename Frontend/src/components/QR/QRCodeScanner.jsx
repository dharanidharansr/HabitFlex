import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

// Image preprocessing function to enhance QR code detection
const preprocessImage = (canvas, ctx, img) => {
  // Reset canvas to original size
  canvas.width = img.width;
  canvas.height = img.height;
  
  // Draw the original image
  ctx.drawImage(img, 0, 0);
  
  // Get image data for processing
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Apply contrast enhancement and noise reduction
  for (let i = 0; i < data.length; i += 4) {
    // Calculate grayscale value
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    
    // Apply threshold for better contrast (adjust threshold as needed)
    const threshold = 128;
    const binaryValue = gray > threshold ? 255 : 0;
    
    // Set RGB to the binary value
    data[i] = binaryValue;     // Red
    data[i + 1] = binaryValue; // Green
    data[i + 2] = binaryValue; // Blue
    // Alpha channel remains unchanged (data[i + 3])
  }
  
  // Put the processed image data back to canvas
  ctx.putImageData(imageData, 0, 0);
  
  // Return the processed image as data URL
  return canvas.toDataURL('image/png');
};

// Edge enhancement function for better QR code detection
const applyEdgeEnhancement = (canvas, ctx, img) => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const newData = new Uint8ClampedArray(data);
  
  // Edge detection kernel (simple Sobel operator)
  for (let y = 1; y < canvas.height - 1; y++) {
    for (let x = 1; x < canvas.width - 1; x++) {
      const idx = (y * canvas.width + x) * 4;
      
      // Get surrounding pixels (simplified grayscale)
      const tl = data[((y - 1) * canvas.width + (x - 1)) * 4];
      const tm = data[((y - 1) * canvas.width + x) * 4];
      const tr = data[((y - 1) * canvas.width + (x + 1)) * 4];
      const ml = data[(y * canvas.width + (x - 1)) * 4];
      const mr = data[(y * canvas.width + (x + 1)) * 4];
      const bl = data[((y + 1) * canvas.width + (x - 1)) * 4];
      const bm = data[((y + 1) * canvas.width + x) * 4];
      const br = data[((y + 1) * canvas.width + (x + 1)) * 4];
      
      // Sobel X and Y
      const sobelX = (tr + 2 * mr + br) - (tl + 2 * ml + bl);
      const sobelY = (bl + 2 * bm + br) - (tl + 2 * tm + tr);
      const magnitude = Math.sqrt(sobelX * sobelX + sobelY * sobelY);
      
      // Apply edge enhancement
      const enhanced = Math.min(255, magnitude > 50 ? 255 : 0);
      
      newData[idx] = enhanced;
      newData[idx + 1] = enhanced;
      newData[idx + 2] = enhanced;
    }
  }
  
  const newImageData = new ImageData(newData, canvas.width, canvas.height);
  ctx.putImageData(newImageData, 0, 0);
  
  return canvas.toDataURL('image/png');
};

// Image rotation function
const rotateImage = (canvas, ctx, img, degrees) => {
  const radians = (degrees * Math.PI) / 180;
  
  // Calculate new canvas size after rotation
  const cos = Math.abs(Math.cos(radians));
  const sin = Math.abs(Math.sin(radians));
  const newWidth = img.width * cos + img.height * sin;
  const newHeight = img.width * sin + img.height * cos;
  
  canvas.width = newWidth;
  canvas.height = newHeight;
  
  // Clear and setup transformation
  ctx.clearRect(0, 0, newWidth, newHeight);
  ctx.save();
  
  // Move to center, rotate, then move back
  ctx.translate(newWidth / 2, newHeight / 2);
  ctx.rotate(radians);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  
  ctx.restore();
  
  return canvas.toDataURL('image/png');
};

// Helper function to try scanning with different configurations
const tryMultipleScanConfigurations = async (html5QrCode, file) => {
  const configs = [
    { verbose: true, name: "verbose mode" },
    { verbose: false, name: "standard mode" }
  ];
  
  for (const config of configs) {
    try {
      console.log(`Trying ${config.name}...`);
      const result = await html5QrCode.scanFile(file, config.verbose);
      console.log(`Success with ${config.name}:`, result);
      return result;
    } catch (error) {
      console.log(`Failed with ${config.name}:`, error.message);
    }
  }
  
  throw new Error("All configuration attempts failed");
};

const QRCodeScanner = ({ onClose, onSuccess }) => {
  const [scanning, setScanning] = useState(false);
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' or 'image'
  const [imageError, setImageError] = useState(null);
  const scannerRef = useRef(null);
  const fileInputRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    if (activeTab !== 'camera') return; // Only initialize camera scanner in camera tab

    let scanner = null;
    // Set a timeout to reset scanning state if camera doesn't initialize properly
    const cameraTimeoutId = setTimeout(() => {
      if (scanning) {
        setScanning(false);
        console.error("Camera initialization timed out");
      }
    }, 5000); // 5 seconds timeout

    const timerId = setTimeout(() => {
      try {
        scanner = new Html5QrcodeScanner('reader', {
          qrbox: { width: 250, height: 250 },
          fps: 10,
        });
        scannerRef.current = scanner;

        // Only set scanning to true after camera is actually accessed
        const onScanSuccess = async (decodedText) => {
          setScanning(false); // Stop scanning after success
          clearTimeout(cameraTimeoutId); // Clear timeout when camera works
          try {
            console.log("QR Code scanned successfully:", decodedText);
            
            // Check if it's a URL instead of JSON
            if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
              console.warn("QR code contains a URL instead of JSON data:", decodedText);
              toast.error("This QR code contains a URL. Please use a QR code generated by the HabitFlex app.");
              return;
            }
            
            const qrData = JSON.parse(decodedText);
            console.log("Parsed QR data:", qrData);
            
            await processQRData(qrData);
            console.log("QR data processed successfully");
            
            if (onSuccess) {
              console.log("Calling onSuccess callback");
              onSuccess(qrData);
            }
            
            setTimeout(() => {
              console.log("Closing QR scanner");
              onClose && onClose();
            }, 300);
          } catch (error) {
            console.error("QR scan processing error:", error);
            toast.error("Invalid QR code or error processing data");
          }
        };

        const onScanFailure = (error) => {
          // Normalize error message for detection
          const msg = typeof error === 'string' ? error : error?.message;
          if (msg && msg.includes('NotFoundException')) {
            // No QR code detected, continue scanning silently
            return;
          }
          console.error("QR scan error:", error);
          setScanning(false); // Stop scanning on other errors
        };

        // Use callbacks to properly detect camera initialization
        scanner.render(onScanSuccess, onScanFailure, {
          onRenderSuccess: () => {
            setScanning(true); // Set scanning true only after camera is ready
            clearTimeout(cameraTimeoutId);
          },
          onRenderError: (error) => {
            console.error("Camera render error:", error);
            setScanning(false);
            clearTimeout(cameraTimeoutId);
          }
        });
      } catch (error) {
        console.error("Camera initialization error:", error);
        setScanning(false);
        clearTimeout(cameraTimeoutId);
      }
    }, 100);

    return () => {
      clearTimeout(timerId);
      clearTimeout(cameraTimeoutId);
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [onClose, onSuccess, activeTab]);

  const processQRData = async (qrData) => {
    if (qrData.type === 'habit') {
      try {
        await completeHabit(qrData.id);
        toast.success("Habit marked as complete! 🎉");
      } catch (error) {
        console.log("Error in processQRData:", error.message);
        // If it's a 403 error (not authorized), offer to copy the habit
        if (error.message.includes("belongs to another user")) {
          console.log("Showing copy confirmation dialog");
          const shouldCopy = window.confirm(
            `This habit "${qrData.name}" belongs to another user. Would you like to copy it to your account?`
          );
          
          if (shouldCopy) {
            console.log("User confirmed copy, attempting to copy habit");
            try {
              await copyHabitFromQR(qrData);
              toast.success(`Habit "${qrData.name}" copied to your account! 🎉`);
            } catch (copyError) {
              console.error("Copy habit error:", copyError);
              toast.error("Failed to copy habit. Please try again.");
              throw copyError;
            }
          } else {
            console.log("User cancelled copy");
            toast.error(error.message);
            throw error;
          }
        } else {
          console.log("Error not related to authorization:", error.message);
          toast.error(error.message);
          throw error;
        }
      }
    } else if (qrData.type === 'challenge') {
      console.log("Processing challenge QR code:", qrData);
      try {
        await updateChallengeProgress(qrData.id, qrData.progress || 10);
        console.log("Challenge progress updated successfully");
        toast.success(`Challenge progress updated! +${qrData.progress || 10}%`);
      } catch (error) {
        console.error("Challenge progress update failed:", error);
        toast.error("Failed to update challenge progress");
        throw error;
      }
    } else {
      console.error("Unknown QR code type:", qrData.type);
      throw new Error("Unknown QR code type");
    }
  };

  // Helper function to preprocess image
  const preprocessImage = (canvas, ctx) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert to grayscale and increase contrast
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      // Increase contrast - make darks darker and lights lighter
      const contrast = avg < 128 ? Math.max(0, avg - 50) : Math.min(255, avg + 50);
      data[i] = contrast;     // Red
      data[i + 1] = contrast; // Green
      data[i + 2] = contrast; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (!files || !files.length) return;

    setScanning(true);
    setImageError(null);

    try {
      const file = files[0];
      
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        setImageError("Please select a valid image file (JPG, PNG, GIF, etc.)");
        setScanning(false);
        return;
      }

      // Check file size (limit to 10MB for performance)
      if (file.size > 10 * 1024 * 1024) {
        setImageError("Image file is too large. Please use an image smaller than 10MB.");
        setScanning(false);
        return;
      }

      // Log file details for debugging
      console.log("File details:", {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: new Date(file.lastModified).toISOString()
      });

      // Create image element for preprocessing
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Load and preprocess the image
      try {
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => reject(new Error("Failed to load image. The file may be corrupted."));
          img.src = URL.createObjectURL(file);
        });
      } catch (loadError) {
        console.error("Image loading error:", loadError);
        setImageError("Failed to load the image. Please ensure the file is a valid image.");
        setScanning(false);
        return;
      }

      // Validate image dimensions
      if (img.width === 0 || img.height === 0) {
        setImageError("Invalid image dimensions. Please use a different image.");
        setScanning(false);
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      console.log("Original image dimensions:", img.width, "x", img.height);

      // Create a new Html5Qrcode instance for file scanning
      const html5QrCode = new Html5Qrcode("reader-file");

      try {
        console.log("Attempting to scan file with multiple methods...");
        
        let decodedText;
        let scanSuccess = false;
        
        // Method 1: Try original image with different configurations
        try {
          console.log("Method 1: Original image with multiple configurations");
          decodedText = await tryMultipleScanConfigurations(html5QrCode, file);
          scanSuccess = true;
          console.log("Method 1 successful - decoded text:", decodedText);
        } catch (error1) {
          console.log("Method 1 failed:", error1.message);
          
          // Method 2: Try with preprocessed image (enhanced contrast)
          try {
            console.log("Method 2: Enhanced contrast image");
            const processedDataUrl = preprocessImage(canvas, ctx, img);
            
            // Convert data URL back to blob for scanning
            const response = await fetch(processedDataUrl);
            const processedBlob = await response.blob();
            const processedFile = new File([processedBlob], 'processed_' + file.name, { type: 'image/png' });
            
            decodedText = await tryMultipleScanConfigurations(html5QrCode, processedFile);
            scanSuccess = true;
            console.log("Method 2 successful - decoded text:", decodedText);
          } catch (error2) {
            console.log("Method 2 failed:", error2.message);
            
            // Method 3: Try with different canvas size (resize larger for better detection)
            try {
              console.log("Method 3: Resized image (2x)");
              canvas.width = img.width * 2;
              canvas.height = img.height * 2;
              ctx.imageSmoothingEnabled = false; // Pixelated scaling for QR codes
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              
              const resizedDataUrl = canvas.toDataURL('image/png');
              const resizedResponse = await fetch(resizedDataUrl);
              const resizedBlob = await resizedResponse.blob();
              const resizedFile = new File([resizedBlob], 'resized_' + file.name, { type: 'image/png' });
              
              decodedText = await tryMultipleScanConfigurations(html5QrCode, resizedFile);
              scanSuccess = true;
              console.log("Method 3 successful - decoded text:", decodedText);
            } catch (error3) {
              console.log("Method 3 failed:", error3.message);
              
              // Method 4: Try smaller size (sometimes works better for very large images)
              try {
                console.log("Method 4: Resized image (0.5x)");
                canvas.width = Math.max(200, img.width * 0.5);
                canvas.height = Math.max(200, img.height * 0.5);
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                const smallDataUrl = canvas.toDataURL('image/png');
                const smallResponse = await fetch(smallDataUrl);
                const smallBlob = await smallResponse.blob();
                const smallFile = new File([smallBlob], 'small_' + file.name, { type: 'image/png' });
                
                decodedText = await tryMultipleScanConfigurations(html5QrCode, smallFile);
                scanSuccess = true;
                console.log("Method 4 successful - decoded text:", decodedText);
              } catch (error4) {
                console.log("Method 4 failed:", error4.message);
                
                // Method 5: Try with edge enhancement
                try {
                  console.log("Method 5: Edge enhanced image");
                  const edgeEnhancedDataUrl = applyEdgeEnhancement(canvas, ctx, img);
                  
                  const edgeResponse = await fetch(edgeEnhancedDataUrl);
                  const edgeBlob = await edgeResponse.blob();
                  const edgeFile = new File([edgeBlob], 'edge_' + file.name, { type: 'image/png' });
                  
                  decodedText = await tryMultipleScanConfigurations(html5QrCode, edgeFile);
                  scanSuccess = true;
                  console.log("Method 5 successful - decoded text:", decodedText);
                } catch (error5) {
                  console.log("Method 5 failed:", error5.message);
                  
                  // Method 6: Try with rotation correction (90 degrees)
                  try {
                    console.log("Method 6: Rotated image (90 degrees)");
                    const rotatedDataUrl = rotateImage(canvas, ctx, img, 90);
                    
                    const rotatedResponse = await fetch(rotatedDataUrl);
                    const rotatedBlob = await rotatedResponse.blob();
                    const rotatedFile = new File([rotatedBlob], 'rotated_' + file.name, { type: 'image/png' });
                    
                    decodedText = await tryMultipleScanConfigurations(html5QrCode, rotatedFile);
                    scanSuccess = true;
                    console.log("Method 6 successful - decoded text:", decodedText);
                  } catch (error6) {
                    console.log("Method 6 failed:", error6.message);
                    
                    // Method 7: Try with 180-degree rotation
                    try {
                      console.log("Method 7: Rotated image (180 degrees)");
                      const rotated180DataUrl = rotateImage(canvas, ctx, img, 180);
                      
                      const rotated180Response = await fetch(rotated180DataUrl);
                      const rotated180Blob = await rotated180Response.blob();
                      const rotated180File = new File([rotated180Blob], 'rotated180_' + file.name, { type: 'image/png' });
                      
                      decodedText = await tryMultipleScanConfigurations(html5QrCode, rotated180File);
                      scanSuccess = true;
                      console.log("Method 7 successful - decoded text:", decodedText);
                    } catch (error7) {
                      console.log("Method 7 failed:", error7.message);
                      throw error7; // Re-throw the last error
                    }
                  }
                }
              }
            }
          }
        }

        if (!scanSuccess) {
          throw new Error("All scan methods failed");
        }

        console.log("Successfully decoded QR text:", decodedText);
        
        // Parse the QR data
        let qrData;
        try {
          console.log("Raw QR code content:", decodedText);
          
          // Check if it's a URL instead of JSON
          if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
            console.warn("QR code contains a URL instead of JSON data:", decodedText);
            setImageError("This QR code contains a URL. Please use a QR code generated by the HabitFlex app.");
            setScanning(false);
            return;
          }
          
          qrData = JSON.parse(decodedText);
          console.log("Parsed QR data:", qrData);
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          console.log("Failed to parse as JSON, raw content:", decodedText);
          setImageError("QR code contains invalid data format. Expected JSON data from HabitFlex app.");
          setScanning(false);
          return;
        }

        // Validate QR data structure
        if (!qrData.type || !qrData.id) {
          console.error("Invalid QR data structure:", qrData);
          setImageError("QR code format is not supported");
          setScanning(false);
          return;
        }

        console.log("Processing QR data:", qrData);
        // Process the QR data
        await processQRData(qrData);
        console.log("QR data processed successfully from file");
        
        if (onSuccess) {
          console.log("Calling onSuccess callback from file scan");
          onSuccess(qrData);
        }
        
        setTimeout(() => {
          console.log("Closing QR scanner after file scan");
          onClose && onClose();
        }, 300);

      } catch (scanError) {
        // Normalize error message to detect no-code cases
        const msg = scanError.message || '';
        console.debug("QR image scan raw error message:", msg);
        
        // Provide more helpful error messages and suggestions
        if (msg.includes("No MultiFormat Readers were able to detect the code") || 
            msg.includes("NotFoundException")) {
          setImageError("No QR code detected. Please try: 1) Better lighting, 2) Different angle, 3) Cropping closer to the QR code, or 4) Using the camera scanner instead.");
        } else if (msg.includes("ChecksumException")) {
          setImageError("The QR code appears damaged. Please try with a clearer, higher resolution image.");
        } else if (msg.includes("FormatException")) {
          setImageError("Invalid QR code format. Please ensure this is a QR code generated by the HabitFlex app.");
        } else if (msg.includes("ReaderException")) {
          setImageError("Unable to read the QR code. Try adjusting lighting, angle, or use the camera scanner.");
        } else {
          setImageError("Could not scan the QR code. Try: 1) Camera scanner, 2) Better lighting, 3) Cropping the image closer to the QR code.");
        }
        
        // Provide debugging information
        console.log("QR Scanning Debug Info:");
        console.log("- File size:", file.size, "bytes");
        console.log("- File type:", file.type);
        console.log("- Image dimensions:", img.width, "x", img.height);
        console.log("- Methods attempted: 7 different approaches including rotation and enhancement");
        console.log("- Suggestion: Try using the camera scanner or ensure QR code takes up more of the image");
        
        setScanning(false);
        return;
      } finally {
        // Always clean up the Html5Qrcode instance
        try {
          await html5QrCode.clear();
        } catch (clearError) {
          console.warn("Error clearing Html5Qrcode instance:", clearError);
        }
        setScanning(false);
      }

    } catch (error) {
      console.error("File handling error:", error);
      setImageError("Failed to process the selected file. Please try a different image.");
      setScanning(false);
    } finally {
      // Clean up object URL to prevent memory leaks
      if (img && img.src && img.src.startsWith('blob:')) {
        URL.revokeObjectURL(img.src);
      }
    }
  };

  const copyHabitFromQR = async (qrData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");
      
      // First, check if user already has a habit with the same name
      const existingHabitsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/habits`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const existingHabit = existingHabitsResponse.data.find(
        habit => habit.name.toLowerCase() === qrData.name.toLowerCase()
      );
      
      if (existingHabit) {
        const shouldStillCopy = window.confirm(
          `You already have a habit named "${qrData.name}". Do you want to create another copy with a different name?`
        );
        
        if (!shouldStillCopy) {
          throw new Error("Habit already exists and user chose not to create a duplicate.");
        }
      }
      
      // Get the habit details from the original habit
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/habits/public/${qrData.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const originalHabit = response.data;
      
      // Create a new habit for the current user based on the original
      const newHabitData = {
        name: existingHabit ? `${originalHabit.name} (Copy)` : originalHabit.name,
        description: originalHabit.description || `Copied from ${originalHabit.user?.username || 'another user'}`,
        frequency: originalHabit.frequency,
        timeOfDay: originalHabit.timeOfDay,
        reminderEnabled: originalHabit.reminderEnabled || false,
      };
      
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/habits`,
          newHabitData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (createError) {
        // Handle backend duplicate check
        if (createError.response?.status === 400 && createError.response?.data?.existingHabit) {
          const shouldCreateWithNewName = window.confirm(
            `You already have a habit named "${newHabitData.name}". Create it with the name "${newHabitData.name} (Copy 2)" instead?`
          );
          
          if (shouldCreateWithNewName) {
            newHabitData.name = `${originalHabit.name} (Copy 2)`;
            await axios.post(
              `${import.meta.env.VITE_API_URL}/api/habits`,
              newHabitData,
              { headers: { Authorization: `Bearer ${token}` } }
            );
          } else {
            throw new Error("Habit not copied - duplicate name.");
          }
        } else {
          throw createError;
        }
      }
      
    } catch (error) {
      console.error("Copy habit error:", error);
      
      if (error.message.includes("already exists and user chose not to create")) {
        throw new Error("Habit not copied - you already have this habit.");
      } else if (error.message.includes("duplicate name")) {
        throw new Error("Habit not copied - duplicate name.");
      } else if (error.response?.status === 404) {
        throw new Error("Original habit not found or no longer exists.");
      } else if (error.response?.status === 400) {
        throw new Error("Invalid habit data. Cannot copy this habit.");
      } else {
        throw new Error("Failed to copy habit. Please try again.");
      }
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const completeHabit = async (habitId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");
      
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/habits/${habitId}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Complete habit error:", error);
      
      // Provide specific error messages based on status code
      if (error.response?.status === 403) {
        throw new Error("This habit belongs to another user. You can only complete your own habits.");
      } else if (error.response?.status === 404) {
        throw new Error("Habit not found. It may have been deleted.");
      } else if (error.response?.status === 400) {
        throw new Error("Habit already completed today.");
      } else {
        throw new Error("Failed to complete habit");
      }
    }
  };

  const updateChallengeProgress = async (challengeId, progress) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication token not found");

    try {
      // Attempt to update progress
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/challenges/${challengeId}/progress`,
        { progress },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      const msg = error.response?.data?.message;
      // If not a participant, offer to join and retry
      if (msg === 'Not a participant') {
        const shouldJoin = window.confirm(
          'You are not a participant in this challenge. Would you like to join it now?'
        );
        if (shouldJoin) {
          // Join the challenge
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/challenges/${challengeId}/join`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          // Retry progress update
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/challenges/${challengeId}/progress`,
            { progress },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return;
        }
      }
      console.error("Update challenge error:", error);
      throw new Error("Failed to update challenge progress");
    }
  };

  const handleClose = () => {
    setScanning(false);

    
    // Safely clear `scannerRef.current` if it exists
    if (scannerRef.current) {
      try {
        scannerRef.current.clear().catch(() => {});
      } catch (err) {
        console.warn("Error clearing scannerRef:", err);
      } finally {
        scannerRef.current = null;
      }
    }

    // Safely clear `html5QrCodeRef.current` if it exists
    if (html5QrCodeRef.current) {
      try {
        html5QrCodeRef.current.clear().catch(() => {});
      } catch (err) {
        console.warn("Error clearing html5QrCodeRef:", err);
      } finally {
        html5QrCodeRef.current = null;
      }
    }

    setTimeout(() => onClose && onClose(), 100);
  };

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    
    // Clean up both scanner instances when switching tabs
    if (scannerRef.current) {
      scannerRef.current.clear().catch(() => {});
      scannerRef.current = null;
    }
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.clear().catch(() => {});
      html5QrCodeRef.current = null;
    }
    
    setActiveTab(tab);
    setImageError(null);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[rgb(var(--text-primary))]">Scan QR Code</h2>
          <button onClick={handleClose} className="text-[rgb(var(--text-primary))]/60 hover:text-[rgb(var(--text-primary))] text-2xl">
            ×
          </button>
        </div>

        <div className="flex border-b border-[rgb(var(--border-primary))] mb-4">
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'camera' ? 'text-[rgb(var(--accent-primary))] border-b-2 border-[rgb(var(--accent-primary))]' : 'text-[rgb(var(--text-primary))]/60 hover:text-[rgb(var(--text-primary))]'
            }`}
            onClick={() => switchTab('camera')}
          >
            Camera
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'image' ? 'text-[rgb(var(--accent-primary))] border-b-2 border-[rgb(var(--accent-primary))]' : 'text-[rgb(var(--text-primary))]/60 hover:text-[rgb(var(--text-primary))]'
            }`}
            onClick={() => switchTab('image')}
          >
            Upload Image
          </button>
        </div>

        {activeTab === 'camera' ? (
          <>
            <p className="text-[rgb(var(--text-primary))]/60 mb-4 text-sm">
              Position the QR code within the frame to complete habits or update challenges.
            </p>
            <div className="rounded-lg overflow-hidden border-2 border-[rgb(var(--accent-primary))]">
              <div id="reader" className=""></div>
            </div>
            <div className="mt-4 text-center">
              {scanning ? (
                <div className="text-[rgb(var(--accent-primary))] text-sm flex items-center justify-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-[rgb(var(--accent-primary))] rounded-full border-t-transparent"></div>
                  Scanning...
                </div>
              ) : (
                <div className="text-[rgb(var(--accent-primary))] text-sm">Under Maintenance</div>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="text-[rgb(var(--text-primary))]/60 mb-4 text-sm">
              Upload an image containing a QR code to scan. Ensure the QR code is clear and well-lit for best results.
            </p>
            <div className="rounded-lg overflow-hidden border-2 border-[rgb(var(--accent-primary))] p-6 flex flex-col items-center justify-center min-h-[250px]">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
              <div id="reader-file" style={{ width: '1px', height: '1px', visibility: 'hidden' }}></div>
              
              {scanning ? (
                <div className="text-center">
                  <div className="animate-spin h-8 w-8 border-3 border-[rgb(var(--accent-primary))] rounded-full border-t-transparent mx-auto mb-4"></div>
                  <p className="text-[rgb(var(--accent-primary))] text-sm font-medium">Processing image...</p>
                  <p className="text-[rgb(var(--text-primary))]/60 text-xs mt-2">Trying multiple detection methods</p>
                </div>
              ) : (
                <>
                  <motion.button
                    onClick={triggerFileInput}
                    disabled={scanning}
                    className="bg-[rgb(var(--accent-primary))] hover:bg-[rgb(var(--accent-hover))] text-black font-medium py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Select Image
                  </motion.button>
                  <p className="text-[rgb(var(--text-primary))]/40 text-xs text-center max-w-xs">
                    Supported formats: JPG, PNG, GIF. Maximum size: 10MB
                  </p>
                </>
              )}
              
              {imageError && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-xs text-center">
                    {imageError}
                  </p>
                  <div className="mt-2 text-center">
                    <button
                      onClick={() => setImageError(null)}
                      className="text-red-400 hover:text-red-300 text-xs underline"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <motion.button
          onClick={handleClose}
          className="w-full mt-4 flex justify-center items-center gap-2 bg-[rgb(var(--border-secondary))] hover:bg-[rgb(var(--border-primary))] text-[rgb(var(--text-primary))] py-3 rounded-lg font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel Scanning
        </motion.button>
      </motion.div>
    </div>
  );
};

export default QRCodeScanner;