const exerciseLines = [
  "Squats;legs;none;easy;Stand with your feet hip-width apart and lower into a comfortable squat",
  "Reverse lunges;legs;none;medium;Step back and lower both knees, then return to standing",
  "Glute bridges;legs;mat;easy;Lie on your back and lift your hips while keeping your feet on the floor",
  "Dumbbell deadlifts;legs;dumbbells;medium;Hinge at your hips and lower the dumbbells along your legs",
  "Split squats;legs;none;hard;Lower into a lunge stance and keep your front foot flat",
  "Dead bug;core;mat;easy;Lie on your back and slowly extend opposite arm and leg",
  "Standing knee drives;core;none;easy;Stand tall and lift one knee toward your chest at a time",
  "Plank shoulder taps;core;none;medium;Hold a plank and tap each shoulder with the opposite hand",
  "Dumbbell Russian twists;core;dumbbells;hard;Sit with your knees bent and rotate the weight from side to side",
  "Mountain climbers;core;mat;medium;From a plank, alternate bringing your knees toward your chest",
  "Wall push-ups;upper body;none;easy;Place your hands on a wall and bend and straighten your elbows",
  "Dumbbell rows;upper body;dumbbells;medium;Hinge forward and pull the dumbbells toward your waist",
  "Arm circles;upper body;none;easy;Extend your arms and make small controlled circles",
  "Knee push-ups;upper body;mat;medium;Keep your body straight from your knees to your shoulders as you push up",
  "Dumbbell shoulder presses;upper body;dumbbells;hard;Press the dumbbells overhead without arching your back",
  "Step-back burpees;full body;none;easy;Step back to a plank one foot at a time and then stand up",
  "Dumbbell thrusters;full body;dumbbells;hard;Squat with the dumbbells at your shoulders and press them overhead",
  "Bird dogs;full body;mat;easy;On hands and knees, extend one arm and the opposite leg",
  "Skater steps;full body;none;medium;Step side to side and reach one foot behind you",
  "Dumbbell squat to press;full body;dumbbells;medium;Stand from a squat and press the dumbbells overhead"
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

    const matchesEquipment = selectedEquipment.includes(exercise.equipment);
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
    return;
  }

  const rounds = getRounds(duration);
  const randomExercises = getRandomExercises(matchingExercises);
  workoutCards.append(createSpecialCard("Warm-up: jumping jacks – 2 min"));

  for (const exercise of randomExercises) {
    workoutCards.append(createExerciseCard(exercise, rounds));
  }

  workoutCards.append(createSpecialCard("Cool-down: stretching – 3 min"));
}

// Shows the selected summary and matching exercise cards without reloading the page.
workoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const duration = workoutForm.elements.duration.value;
  const focus = workoutForm.elements.focus.value;
  const level = workoutForm.querySelector('input[name="level"]:checked').value;

  workoutSummary.textContent = `${duration} min | ${focus} | ${level}`;
  showExerciseCards(getMatchingExercises(), duration);
});