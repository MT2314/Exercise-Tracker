// Dependencies
const router = require("express").Router();
const Workout = require("../models/workout.js");

// Get all the workouts 
router.get("/api/workouts/", (req, res) => {
    // Add a field of Total Duration
    Workout.aggregate(
        [{
            $addFields: { totalDuration: { $sum: "$exercises.duration" } }
        }]
    )
        .then((workoutDb) => {
            res.json(workoutDb);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// Add exercise to the workout by the id
router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(req.params.id,
        {
            $push: { exercises: { ...req.body } }
        })

        .then(workoutDb => {
            res.json(workoutDb);
        })

        .catch(err => {
            res.status(400).json(err)
        })
})

// Create a workout
router.post("/api/workouts/", (req, res) => {
    Workout.create(req.body)
        .then(workoutDb => {
            res.json(workoutDb);
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// Get last 7 workouts added
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate(
        [{
            $addFields: { totalDuration: { $sum: "$exercises.duration" } }
        }]
    )
        .sort({ day: -1 })
        .limit(7)
        .then(workoutDb => {
            res.json(workoutDb.reverse()); 
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

module.exports = router;