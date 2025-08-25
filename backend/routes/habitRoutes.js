const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");
const auth = require("../middleware/auth");

// Public route for getting habit details for copying
router.get("/public/:id", auth, habitController.getHabitForCopy);

// Protect all other routes
router.use(auth);

router.get("/", habitController.getHabits);
router.get("/:id", habitController.getHabit);
router.post("/", habitController.createHabit);
router.put("/:id", habitController.updateHabit);
router.delete("/:id", habitController.deleteHabit);
router.post("/:id/complete", habitController.completeHabit);

module.exports = router;
