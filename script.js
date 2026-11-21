const exerciseLines = [
  "Squats;legs;none;easy;Stand with your feet hip-width apart and lower into a comfortable squat",
  "Reverse lunges;legs;none;easy;Step back and lower both knees, then return to standing",
  "Bodyweight good mornings;legs;none;easy;Hinge at your hips with a soft bend in your knees",
  "Calf raises;legs;none;easy;Rise onto your toes and lower your heels with control",
  "Split squats;legs;none;hard;Lower into a lunge stance and keep your front foot flat",
  "Glute bridges;legs;mat;easy;Lie on your back and lift your hips while keeping your feet on the floor",
  "Donkey kicks;legs;mat;easy;On hands and knees, lift one bent leg behind you",
  "Side leg raises;legs;mat;easy;Lie on your side and lift your top leg with control",
  "Clamshells;legs;mat;easy;Lie on your side with bent knees and lift your top knee",
  "Single-leg glute bridges;legs;mat;medium;Lift your hips with one foot planted and the other leg raised",
  "Goblet squats;legs;dumbbells;easy;Hold one dumbbell at your chest as you squat",
  "Dumbbell deadlifts;legs;dumbbells;easy;Hinge at your hips and lower the dumbbells along your legs",
  "Dumbbell reverse lunges;legs;dumbbells;easy;Step back into a lunge while holding dumbbells at your sides",
  "Dumbbell sumo squats;legs;dumbbells;easy;Stand wide and lower a dumbbell between your legs",
  "Dumbbell step-ups;legs;dumbbells;hard;Step onto a stable low step while holding dumbbells",
  "Standing knee drives;core;none;easy;Stand tall and lift one knee toward your chest at a time",
  "Standing trunk rotations;core;none;easy;Stand tall and slowly turn your shoulders from side to side",
  "Standing side bends;core;none;easy;Reach one arm overhead and bend gently to the opposite side",
  "Seated knee tucks;core;none;easy;Lean back slightly and draw both knees toward your chest",
  "Standing cross-body crunches;core;none;hard;Bring one elbow toward the opposite knee as you lift it",
  "Dead bug;core;mat;easy;Lie on your back and slowly extend opposite arm and leg",
  "Side plank;core;mat;easy;Support yourself on one forearm and keep your body straight",
  "Mountain climbers;core;mat;easy;From a plank, alternate bringing your knees toward your chest",
  "Bird dogs;core;mat;easy;On hands and knees, extend one arm and the opposite leg",
  "Hollow body hold;core;mat;hard;Lie on your back and hold your shoulders and feet slightly raised",
  "Dumbbell side bends;core;dumbbells;easy;Hold one dumbbell and bend gently to the opposite side",
  "Dumbbell Russian twists;core;dumbbells;easy;Sit with your knees bent and rotate the weight from side to side",
  "Dumbbell sit-ups;core;dumbbells;easy;Hold a light dumbbell at your chest as you sit up",
  "Dumbbell wood chops;core;dumbbells;easy;Move one dumbbell diagonally across your body with control",
  "Dumbbell dead bug;core;dumbbells;hard;Lie on your back and lower opposite arm and leg while holding light dumbbells",
  "Wall push-ups;upper body;none;easy;Place your hands on a wall and bend and straighten your elbows",
  "Wall angels;upper body;none;easy;Slide your arms up and down a wall while keeping them relaxed",
  "Palm presses;upper body;none;easy;Press your palms together in front of your chest and hold",
  "Arm circles;upper body;none;easy;Extend your arms and make small controlled circles",
  "Pike push-ups;upper body;none;hard;From a downward-facing V shape, bend your elbows and press back up",
  "Knee push-ups;upper body;mat;easy;Keep your body straight from your knees to your shoulders as you push up",
  "Prone Y raises;upper body;mat;easy;Lie face down and lift your arms into a Y shape",
  "Superman pull-downs;upper body;mat;easy;Lie face down, lift your chest slightly, and draw your elbows down",
  "Scapular push-ups;upper body;mat;easy;In a plank, keep your arms straight and gently move your shoulder blades",
  "Plank up-downs;upper body;mat;medium;Move from your forearms to your hands one arm at a time",
  "Dumbbell bicep curls;upper body;dumbbells;easy;Bend your elbows and curl the dumbbells toward your shoulders",
  "Dumbbell rows;upper body;dumbbells;easy;Hinge forward and pull the dumbbells toward your waist",
  "Dumbbell lateral raises;upper body;dumbbells;easy;Raise the dumbbells out to your sides with soft elbows",
  "Dumbbell triceps extensions;upper body;dumbbells;easy;Hold one dumbbell overhead and bend and straighten your elbows",
  "Dumbbell shoulder presses;upper body;dumbbells;hard;Press the dumbbells overhead without arching your back"
];

// Turns the semicolon-separated exercise lines into exercise objects.
function parseExercises(lines) {
  const exercises = [];

  for (const line of lines) {
    const values = line.split(";");
    exercises.push({
      name: values[0],
      focus: values[1],
      equipment: values[2],
      level: values[3],
      description: values[4]
    });
  }

  return exercises;
}

const exercises = parseExercises(exerciseLines);
const workoutForm = document.querySelector("#workout-form");
const workoutSummary = document.querySelector("#workout-summary");
const workoutCards = document.querySelector("#workout-cards");
const newWorkoutButton = document.querySelector("#new-workout-button");
const doneButton = document.querySelector("#done-button");
const historyRows = document.querySelector("#history-rows");
const workoutHistory = JSON.parse(localStorage.getItem("workoutHistory") || "[]");
let lastMatchingExercises = null;
let lastDuration = "";
let lastWorkout = null;

// Returns the values of the checked equipment options.
function getSelectedEquipment() {
  const equipmentInputs = workoutForm.querySelectorAll('input[name="equipment"]:checked');
  const selectedEquipment = [];

  for (const input of equipmentInputs) {
    selectedEquipment.push(input.value);
  }

  return selectedEquipment;
}

// Returns exercises that match the selected focus, level, and equipment.
function getMatchingExercises() {
  const focus = workoutForm.elements.focus.value;
  const selectedLevel = workoutForm.querySelector('input[name="level"]:checked').value;
  const selectedEquipment = getSelectedEquipment();
  const matchingExercises = [];

  for (const exercise of exercises) {
    const matchesFocus = focus === "full body" || exercise.focus === focus;
    const matchesLevel = selectedLevel === "hard"
      || exercise.level === "easy"
      || (selectedLevel === "medium" && exercise.level === "medium");

    const matchesEquipment = exercise.equipment === "none"
      || selectedEquipment.includes(exercise.equipment);
    if (matchesFocus && matchesLevel && matchesEquipment) {
      matchingExercises.push(exercise);
    }
  }

  return matchingExercises;
}

// Returns up to four different exercises picked at random.
function getRandomExercises(matchingExercises) {
  const availableExercises = matchingExercises.slice();
  const randomExercises = [];

  for (let count = 0; count < 4 && availableExercises.length > 0; count += 1) {
    const randomIndex = Math.floor(Math.random() * availableExercises.length);
    randomExercises.push(availableExercises.splice(randomIndex, 1)[0]);
  }

  return randomExercises;
}

// Returns the round count for the selected workout duration.
function getRounds(duration) {
  if (duration === "10") {
    return 1;
  }
  if (duration === "20") {
    return 3;
  }
  return 6;
}

// Creates a warm-up or cool-down card with its full label.
function createSpecialCard(title) {
  const card = document.createElement("div");
  card.className = "exercise-card";

  const name = document.createElement("h3");
  name.textContent = title;
  card.append(name);

  return card;
}

// Creates an exercise card with its timing, rounds, and description.
function createExerciseCard(exercise, rounds) {
  const card = document.createElement("div");
  card.className = "exercise-card";

  const name = document.createElement("h3");
  name.textContent = exercise.name;

  const timing = document.createElement("p");
  timing.textContent = "40 s + 20 s";

  const roundCount = document.createElement("p");
  if (rounds === 1) {
    roundCount.textContent = "× 1 round";
  } else {
    roundCount.textContent = `× ${rounds} rounds`;
  }

  const description = document.createElement("p");
  description.textContent = exercise.description;

  card.append(name, timing, roundCount, description);
  return card;
}

// Replaces old cards with warm-up, four exercises, and cool-down or a message.
function showExerciseCards(matchingExercises, duration) {
  workoutCards.textContent = "";

  if (matchingExercises.length < 4) {
    workoutCards.textContent = "Not enough exercises - please check more equipment or another level.";
    return false;
  }

  const rounds = getRounds(duration);
  const randomExercises = getRandomExercises(matchingExercises);
  workoutCards.append(createSpecialCard("Warm-up: jumping jacks – 2 min"));

  for (const exercise of randomExercises) {
    workoutCards.append(createExerciseCard(exercise, rounds));
  }

  workoutCards.append(createSpecialCard("Cool-down: stretching – 3 min"));
  return true;
}

// Shows the selected summary and matching exercise cards without reloading the page.
workoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const duration = workoutForm.elements.duration.value;
  const focus = workoutForm.elements.focus.value;
  const level = workoutForm.querySelector('input[name="level"]:checked').value;
  lastMatchingExercises = getMatchingExercises();
  lastDuration = duration;
  lastWorkout = null;

  workoutSummary.textContent = `${duration} min | ${focus} | ${level}`;
  if (showExerciseCards(lastMatchingExercises, duration)) {
    lastWorkout = { focus: focus, duration: duration };
  }
});

// Shows a new workout with the settings from the last generated workout.
function showNewWorkout() {
  if (lastMatchingExercises === null) {
    workoutCards.textContent = "Please generate a workout first.";
    return;
  }

  showExerciseCards(lastMatchingExercises, lastDuration);
}

newWorkoutButton.addEventListener("click", showNewWorkout);

// Rebuilds the history table rows from the saved workouts.
function renderHistory() {
  historyRows.textContent = "";

  for (const workout of workoutHistory) {
    const row = document.createElement("tr");
    const dateCell = document.createElement("td");
    const focusCell = document.createElement("td");
    const durationCell = document.createElement("td");

    const dateParts = workout.date.split("-");
    dateCell.textContent = `${dateParts[2]}.${dateParts[1]}.`;
    focusCell.textContent = workout.focus;
    durationCell.textContent = `${workout.duration} min`;
    row.append(dateCell, focusCell, durationCell);
    historyRows.append(row);
  }
}

// Adds the last generated workout to the history and saves it in the browser.
function markWorkoutDone() {
  if (lastWorkout === null) {
    workoutSummary.textContent = "Please generate a workout first.";
    return;
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  workoutHistory.push({
    date: `${year}-${month}-${day}`,
    focus: lastWorkout.focus,
    duration: lastWorkout.duration
  });
  localStorage.setItem("workoutHistory", JSON.stringify(workoutHistory));
  renderHistory();
}

doneButton.addEventListener("click", markWorkoutDone);
renderHistory();