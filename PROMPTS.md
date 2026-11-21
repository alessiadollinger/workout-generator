# Prompts für Copilot – Workout Generator

Diese Datei ist nur für dich (nicht committen nötig).

## Ablauf pro Schritt
1. Neuer Chat (+), Modus **Agent**
2. Prompt reinkopieren (`#file:` jeweils aus der Liste auswählen, damit es ein Chip wird)
3. Änderungen lesen → **Keep**
4. Im Browser testen (F12-Konsole offen), "Done when" prüfen
5. PROGRESS.md aktualisieren (Schritt nach "Done", Notizen unter "Decisions & notes")
6. Commit (z. B. "Step 3: summary line") → am Ende Sync/Push

Klappt etwas nicht: im selben Chat schreiben, was gemacht wurde, was erwartet wurde
und die genaue Fehlermeldung aus der Konsole. Nach 3 Fehlversuchen: Discard + neuer Chat.

---

## Step 1 – HTML skeleton
```
Context: #file:SPEC.md #file:PROGRESS.md
Task: Step 1 – HTML skeleton (F1, layout only).
Details: A heading "Workout Generator". Three sections: "1) Choose", "2) My workout", "3) History".
In "Choose": a form with a dropdown for duration (10/20/30 min), a dropdown for focus (legs, core, upper body, full body), checkboxes for equipment (none, mat, dumbbells), radio buttons for level (easy, medium, hard) and a button "Generate workout".
In "My workout": an empty div for the summary, an empty div for the cards, and the buttons "Done!" and "New workout".
In "History": an empty table with the columns date, focus, duration, and an empty div for the progress bar.
Link style.css and script.js. Give every element that JavaScript will need a clear id.
Constraints: Only change index.html. No CSS, no JavaScript yet.
Done when: I see all three areas with the form and the buttons in the browser.
```

## Step 2 – CSS layout
```
Context: #file:SPEC.md #file:PROGRESS.md #file:index.html
Task: Step 2 – basic CSS layout (Look & feel from SPEC).
Details: "Choose" on the left, "My workout" on the right, "History" below across the full width. Readable font, one accent colour for the buttons. Simple style for exercise cards (border, padding) and the table.
Constraints: Only change style.css.
Done when: The page looks like my sketch: two columns on top, history at the bottom.
```

## Step 3 – Exercise list + summary line
```
Context: #file:SPEC.md #file:PROGRESS.md #file:index.html
Task: Step 3 – F2: exercise list and summary line.
Details: Put the exercise list into script.js as an array of text lines in the format "Name;Focus;Equipment;Level;Description" (about 20 exercises, at least 4 per focus, all levels and equipment mixed). Write a function that turns these lines into objects. When I click "Generate workout", read the form values and show the summary line, e.g. "20 min | full body | medium". The page must not reload.
Constraints: Only change script.js. No cards yet.
Done when: I choose 20 min, full body, medium, click "Generate workout" and see "20 min | full body | medium".
```

## Step 4 – Filter and show cards
```
Context: #file:SPEC.md #file:PROGRESS.md #file:script.js
Task: Step 4 – F3: filter the exercise list and show all matching exercises as cards.
Details: Use the rules from SPEC.md (full body = all focuses; level easy/medium/hard; only checked equipment). Show one card per matching exercise with name, "40 s + 20 s" and the description. Create the cards with document.createElement(). Clear the old cards before showing new ones.
Constraints: Only change script.js.
Done when: With focus "legs", level "easy" and only "none" checked, I only see easy leg exercises without equipment.
```

## Step 5 – 4 random exercises
```
Context: #file:SPEC.md #file:PROGRESS.md #file:script.js
Task: Step 5 – F4: show only 4 random, different exercises from the filtered list.
Details: No exercise appears twice. If fewer than 4 exercises match, show a short message like "Not enough exercises – please check more equipment or another level." instead of cards.
Constraints: Only change script.js.
Done when: Clicking "Generate workout" several times shows 4 different exercises each time, and with very few options checked I see the message.
```

## Step 6 – Warm-up, cool-down, rounds
```
Context: #file:SPEC.md #file:PROGRESS.md #file:script.js
Task: Step 6 – F5: warm-up, cool-down and number of rounds.
Details: Add a warm-up card "Warm-up: jumping jacks – 2 min" before the 4 exercises and a cool-down card "Cool-down: stretching – 3 min" after them. Show the number of rounds next to the exercises (10 min → 1, 20 min → 3, 30 min → 6), e.g. "× 3 rounds".
Constraints: Only change script.js (and style.css only if needed for the new cards).
Done when: With 20 min I see warm-up first, 4 exercises, "× 3 rounds", cool-down last.
```

## Step 7 – New workout (shuffle)
```
Context: #file:SPEC.md #file:PROGRESS.md #file:script.js
Task: Step 7 – F6: "New workout" button.
Details: Clicking "New workout" picks 4 new random exercises with the same form settings as the last generated workout and shows them (with warm-up, rounds and cool-down). If no workout was generated yet, do nothing or show a short hint.
Constraints: Only change script.js.
Done when: Clicking "New workout" several times shows different combinations.
```

## Step 8 – Done! → history row
```
Context: #file:SPEC.md #file:PROGRESS.md #file:script.js
Task: Step 8 – F7: "Done!" adds a row to the history table (in memory only).
Details: Store completed workouts in an array of objects { date, focus, duration }. Re-render the whole table with a function renderHistory() after each change. Date format like "20.11.". If no workout was generated yet, do nothing.
Constraints: Only change script.js. No localStorage yet.
Done when: After generating a workout and clicking "Done!", exactly one new row with today's date, the focus and the duration appears.
```

## Step 9 – localStorage
```
Context: #file:SPEC.md #file:PROGRESS.md #file:script.js
Task: Step 9 – F8: save and load the history with localStorage.
Details: Save the history array every time a workout is added. Load it when the page starts and show the table with renderHistory(). Store the full date so later steps can check the week.
Constraints: Only change script.js.
Done when: I click "Done!" twice, reload the page, and both rows are still there.
```

## Step 10 – Progress bar
```
Context: #file:SPEC.md #file:PROGRESS.md #file:script.js
Task: Step 10 – F9: progress bar for this week.
Details: Add up the minutes of all workouts from this week (Monday until today). Show a bar whose width is minutes / 60 (max 100 %) and the text "30 / 60 min". Update it on page start and after every "Done!".
Constraints: Change script.js and style.css only.
Done when: After one 20-min workout the bar is one third full and shows "20 / 60 min", and it stays the same after a reload.
```

---

## Zum Schluss
- README.md prüfen: nur Features auflisten, die wirklich funktionieren
- Commit "Add README" → Sync/Push
