# Spec: Workout Generator

## Goal (one or two sentences)
A single-page website that generates a short home workout based on my available time,
the body part I want to train, my equipment and my level. A history shows how many
minutes I trained this week compared to my weekly goal.

## Users
Just me (a student with short time slots), on a laptop browser.

## Data
The exercise list is stored in script.js as text lines, one exercise per line,
values separated by semicolons:
`Name;Focus;Equipment;Level;Description`
Example: `Squats;legs;none;easy;Feet hip-wide, bend your knees, keep your back straight`
- Focus: legs, core, upper body, full body
- Equipment: none, mat, dumbbells
- Level: easy, medium, hard

## Features (numbered, so prompts can refer to them)
F1. Form "Choose": duration (dropdown 10/20/30 min), focus (dropdown), equipment
    (checkboxes none/mat/dumbbells), level (radio buttons easy/medium/hard),
    button "Generate workout".
F2. Summary line: e.g. "20 min | full body | medium".
F3. Filter the exercise list by focus, level and checked equipment.
F4. Pick 4 random, different exercises from the filtered list and show one card per
    exercise with name, "40 s + 20 s" and the short description.
F5. Warm-up card (jumping jacks, 2 min) at the start and cool-down card
    (stretching, 3 min) at the end. Show the number of rounds ("× 3 rounds").
F6. Button "New workout" shuffles: new random exercises with the same settings.
F7. Button "Done!" adds a row (date, focus, duration) to the history table.
F8. The history is saved in localStorage and is still there after a reload.
F9. Progress bar: minutes trained this week compared to the weekly goal of 60 min
    (e.g. "30 / 60 min").

## Rules (how the features behave)
- Focus "full body" uses exercises from all focuses.
- Level: easy → only easy exercises; medium → easy and medium; hard → all levels.
- Equipment: an exercise is allowed only if its equipment is checked.
- Rounds depend on the duration: 10 min → 1 round, 20 min → 3 rounds, 30 min → 6 rounds
  (warm-up 2 min + cool-down 3 min + 4 exercises × 1 min per round).
- "This week" means from Monday until today.

## Acceptance criteria (how I know a feature works)
- F1: All form fields and the button are visible in the "Choose" area.
- F2: After clicking "Generate workout" the summary shows my chosen values.
- F3/F4: Only exercises that match my choices appear; no exercise appears twice.
- F4: If fewer than 4 exercises match, a short message tells me to change my choices.
- F5: Warm-up is the first card, cool-down the last; 20 min shows "× 3 rounds".
- F6: Clicking "New workout" several times gives different combinations.
- F7: Clicking "Done!" adds exactly one new row with today's date.
- F8: After a reload, all history rows are still there.
- F9: After a 20-min workout the bar shows "20 / 60 min" and is one third full.

## Out of scope (do NOT build)
- No login, no server, no database
- No frameworks or libraries (no React, no jQuery, no Bootstrap)
- No timer or countdown, no sound, no animations beyond simple CSS transitions
- No editing or deleting history rows
- No mobile app

## Look & feel
Simple and readable. Three areas like my sketch: "Choose" on the left, "My workout" on the
right, "History" at the bottom across the full width. One accent colour.
Exercise cards and history are created by JavaScript, not written in the HTML.
