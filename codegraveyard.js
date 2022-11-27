const sleepSchema = new mongoose.Schema({
    wokeupTime: { type: String, required: false },
    numberOfSleepHours: { type: String, required: false },
    difficultyFallingAsleep: { type: String, required: false },
    qualityOfSleep: { type: String, required: false },
    morningFeeling: { type: String, required: false },
    numOfTimesWokenup: { type: String, required: false },
    dreams: { type: String, required: false },
    asleepTime: { type: String, required: false },
    nap: { type: Boolean, required: false },
    numberOCaffeineDrinks: { type: Number, required: false },
    numberOfMinutesOfExercise: { type: Number, required: false },
    drowsey: { type: Boolean, required: false },
    overallMoodToday: { type: String, required: false },
    oneHourBeforeBed: { type: String, required: false },
    medication: { type: Boolean, required: false },
    stressLevel: { type: String, required: false },
 },
 { 
    timestamps: true
 });
 

 const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true }, 
    username: { type: String, required: true },
    password: { type: String, required: true },
    sleep: [Sleep.schema]
});

sleepRouter.get("/", (req, res) => {
   if(req.session.currentUser) {
   User.findById(req.session.currentUser,(err, foundUser) => {
   res.render("sleep/dashboard.ejs", {
       sleep: foundUser.sleeps,
       currentUser: foundUser,
       user: foundUser,
   });
   });
   } else {
       res.render("sleep/index.ejs", {
           currentUser: req.session.currentUser,
           });
       } 
   });

