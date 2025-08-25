const schedule = require("node-schedule");
const { sendReminderEmail, sendMissedHabitEmail } = require("./emailService");
const Habit = require("../models/habitSchema");
const User = require("../models/user");

const activeReminders = new Map(); // Track active reminders

const scheduleReminders = async (habit, user) => {
  try {
    // Clear any existing reminders for this habit
    cancelReminders(habit._id);

    // Check if reminders are enabled for this habit
    if (!habit.reminderSettings?.enabled) {
      console.log(`⏸️ Reminders disabled for habit: ${habit.name}`);
      return;
    }

    const [hours, minutes] = habit.timeOfDay.split(":");
    const habitHours = parseInt(hours);
    const habitMinutes = parseInt(minutes);

    // Get user's custom reminder time (defaults to 15 minutes if not specified)
    const reminderMinutesBefore = habit.reminderSettings?.reminderTime || 15;

    // Create reminder time (user-specified minutes before habit time)
    const reminderTime = new Date();
    reminderTime.setHours(habitHours, habitMinutes - reminderMinutesBefore, 0, 0);
    
    // If the reminder time has already passed today, schedule for tomorrow
    const now = new Date();
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    // Create missed habit check time (15 minutes after habit time)
    const missedCheckTime = new Date();
    missedCheckTime.setHours(habitHours, habitMinutes + 15, 0, 0);
    
    // If the missed check time has already passed today, schedule for tomorrow
    if (missedCheckTime <= now) {
      missedCheckTime.setDate(missedCheckTime.getDate() + 1);
    }

    // Schedule the reminder email (user-specified minutes before)
    const reminderJob = schedule.scheduleJob(reminderTime, async () => {
      try {
        console.log(`Sending reminder email for habit: ${habit.name} to ${user.email} (${reminderMinutesBefore} min before)`);
        const success = await sendReminderEmail(user.email, habit.name, habit.timeOfDay, reminderMinutesBefore);
        if (success) {
          console.log(`✅ Reminder email sent successfully for habit: ${habit.name}`);
        } else {
          console.log(`❌ Failed to send reminder email for habit: ${habit.name}`);
        }
      } catch (error) {
        console.error(`Error sending reminder email for habit ${habit.name}:`, error);
      }
    });

    // Schedule the missed habit check (15 minutes after) - only if enabled
    let missedCheckJob = null;
    if (habit.reminderSettings?.missedCheckEnabled !== false) {
      missedCheckJob = schedule.scheduleJob(missedCheckTime, async () => {
        try {
          console.log(`Checking if habit was missed: ${habit.name} for user ${user.email}`);
          
          // Fetch the latest habit data to check if it was completed
          const updatedHabit = await Habit.findById(habit._id);
          
          if (updatedHabit && !updatedHabit.completedToday) {
            console.log(`Sending missed habit email for: ${habit.name} to ${user.email}`);
            const success = await sendMissedHabitEmail(user.email, habit.name);
            if (success) {
              console.log(`✅ Missed habit email sent successfully for: ${habit.name}`);
            } else {
              console.log(`❌ Failed to send missed habit email for: ${habit.name}`);
            }
          } else {
            console.log(`✅ Habit completed on time: ${habit.name}`);
          }
        } catch (error) {
          console.error(`Error checking missed habit for ${habit.name}:`, error);
        }
      });
    }

    // Store the jobs for this habit
    activeReminders.set(habit._id.toString(), {
      reminderJob,
      missedCheckJob,
      habitName: habit.name
    });

    console.log(`📅 Scheduled reminders for habit: ${habit.name}`);
    console.log(`  - Reminder: ${reminderTime.toLocaleString()} (${reminderMinutesBefore} minutes before)`);
    console.log(`  - Missed check: ${missedCheckTime.toLocaleString()}`);

  } catch (error) {
    console.error(`Error scheduling reminders for habit ${habit.name}:`, error);
  }
};

const cancelReminders = (habitId) => {
  const habitIdStr = habitId.toString();
  const reminder = activeReminders.get(habitIdStr);
  
  if (reminder) {
    if (reminder.reminderJob) {
      reminder.reminderJob.cancel();
    }
    if (reminder.missedCheckJob) {
      reminder.missedCheckJob.cancel();
    }
    activeReminders.delete(habitIdStr);
    console.log(`🗑️ Cancelled reminders for habit: ${reminder.habitName}`);
  }
};

const scheduleAllHabitsReminders = async () => {
  try {
    console.log('🔄 Scheduling reminders for all active habits...');
    
    const habits = await Habit.find({
      'reminderSettings.enabled': true
    }).populate('user');

    for (const habit of habits) {
      if (habit.user && habit.user.email) {
        await scheduleReminders(habit, habit.user);
      }
    }
    
    console.log(`✅ Scheduled reminders for ${habits.length} habits`);
  } catch (error) {
    console.error('Error scheduling all habits reminders:', error);
  }
};

module.exports = { 
  scheduleReminders, 
  cancelReminders, 
  scheduleAllHabitsReminders 
};
