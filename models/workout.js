const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [{

      name: { 
          type : String, 
          required: 'What is the name of the exercise',
          trim: true,
      },
    type: { 
        type : String, 
        required: 'What type of exercise is it?',
        trim: true,
    },
    duration: { 
        type : Number, 
        required: 'Enter the duration' 
    },
    distance: { 
        type : Number
    },
    weight: { 
        type : Number
    },
    reps: { 
        type : Number
    },
    sets: { 
        type : Number
    },
  }]
});


const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;