# Mole Rapture in Waterworld

A DOM-based JavaScript arcade game inspired by whack-a-mole, themed around charity: water branding and token-based game mechanics.

Live version:
https://diazdizazter.github.io/Mole-Rapture-in-Waterworld/

## Project Snapshot

- Goal: click appearing tokens to build score and avoid instant-loss conditions.
- Grid: 5x5 by default with the center tile locked.
- Session tracking: wins/losses, token counts, clicks left, and probability modifiers.
- Difficulty controls: popup speed, cycle speed, and playable tile density.
- Audience: beginner JavaScript students learning DOM events, state, and game loops.

## Tech Stack

- HTML5 for structure and UI layout.
- CSS3 for styling, grid layout, responsiveness, and simple animations.
- Vanilla JavaScript (no game libraries, no canvas) for all game logic.
- Static assets: PNG images and a WAV victory sound.
- GitHub Pages for deployment via GitHub Actions.

## APIs and Browser Features Used

- DOM API: `getElementById`, `querySelector`, `querySelectorAll`, `createElement`, `classList`, `dataset`, `textContent`, `innerHTML`.
- Event API: `addEventListener` for button clicks, grid clicks, and slider input changes.
- Timer API: `setInterval`, `clearInterval`, `setTimeout`, `clearTimeout`.
- Media API: `new Audio(...)` and `audio.play()` for win sound playback.
- Math API: `Math.random`, `Math.floor`, `Math.round` for weighted random token behavior.

## File Map

- `index.html`: UI structure, score panels, controls, grid container, and legends.
- `style.css`: visual design, layout, responsive breakpoints, and token animations.
- `script.js`: game state, rules engine, spawning logic, scoring, and event handling.
- `img/`: token art, logos, and QR images.
- `wav/`: victory sound effect.
- `.github/workflows/deploy-pages.yml`: deployment workflow to GitHub Pages.
- `.nojekyll`: ensures static file passthrough on GitHub Pages.
- `waterworld1md`: design/rubric notes from planning.

## What Each Main Action in the Code Does

### Startup and UI setup

- `createGrid()` builds the clickable grid cells and marks the center as locked.
- `refreshDifficultyLabels()` updates slider labels so players can see live speed/grid settings.
- `updateStats()` writes all score and session values to the screen.
- `renderInventory()` shows running totals for each token type spawned.

### Core game flow

- `startGame()` resets round data, updates UI, spawns first token, and starts the spawn loop.
- `resetGame()` stops timers, clears active token, and resets round stats without clearing session wins/losses.
- `startSpawnLoop()` runs repeated token generation based on current speed modifiers.
- `spawnToken()` chooses token type and location, draws it in the grid, and sets token lifetime timeout.
- Grid click listener validates clicks, runs hit animation, applies token effect, and continues the loop.

### Rules and scoring behavior

- `pickTokenType()` handles weighted random token selection and odd/even spawn rules for Water Girl and Nuke.
- `applyTokenEffect(type, index)` applies score/click/chance effects for each token.
- `applyJerryBonus()` adds reserve score after every N jerry tokens (N changes with Water Girl bonus).
- `applyReserveConversion()` converts every 7 reserve points into +3 main score.
- `spendClick()` decreases clicks left and ends game when clicks are exhausted.
- `endGame(win)` stops timers, sets win/loss state, updates center tile, updates session counters, and plays win audio.

### Difficulty and pacing

- `getStageSpeedMultiplier()` computes stage-based speed multipliers for sliders.
- `getPopupSpeedMultiplier()` and `getCycleSpeedMultiplier()` split token lifetime speed vs spawn interval speed.
- `handlePopupSpeedChange(...)`, `handleCycleSpeedChange(...)`, `handleGridDensityChange(...)` update settings at runtime.
- `applyGridDensityToUI()` toggles playable tiles for 3x3/5x5 behavior.

### Probability and timing helpers

- `getWaterGirlChance()` and `getNukeChance()` return base chance plus earned modifiers.
- `getSpeedMultiplier()`, `getSpawnMs()`, and `getTokenLifetime(type)` compute pacing with dynamic bonuses/debuffs.

## Token Rules (Gameplay)

- `Jerry`: +main score; contributes to reserve bonus cycle.
- `Water Girl`: instant win (odd spawn checks).
- `Nuke`: instant loss (even spawn checks).
- `Dead Fish`: -1 main, -1 reserve.
- `Yellow Skull`: -1 main, +1% nuke chance.
- `Bio`: -1 main; shortens lifetime of good tokens for a limited charge window.
- `Well`: +1 main or +1 reserve; +1% Water Girl chance.
- `Spring`: +1 main; activates bounce behavior for good tokens for limited charges.
- `Pool`: +1 main and +1 reserve.
- `Recycling`: +1 main but costs an extra click.
- `Gas Mask`: +1 click and -1 reserve.

## Git and Collaboration Notes

### Current remotes

- `origin`: `https://github.com/diazdizazter/Mole-Rapture-in-Waterworld`
- `upstream`: `https://github.com/GCA-Classroom/05-cw-game-water-quest.git`

### Push/Pull health check (completed)

- `git fetch --all --prune`: success.
- `git pull --ff-only`: success (already up to date).
- `git push --dry-run`: success (push path and auth are working).

### Pull request reference

- Open PR in upstream classroom repo: [#7](https://github.com/GCA-Classroom/05-cw-game-water-quest/pull/7)
- Title: "Merge Water Quest updates from fork main"
- Why it may not appear locally: local checkout is on `main`; the PR is in GitHub UI, not a locally checked-out PR branch.

## Deployment Notes (GitHub Pages)

- Workflow file: `.github/workflows/deploy-pages.yml`
- Trigger branches: `Fizgig`, `main`
- Required repo setting: Pages source set to GitHub Actions

## Skills Utilized in This Maintenance Pass

- Git repository inspection and PR verification.
- Safe sync-path validation (`fetch`, `pull --ff-only`, `push --dry-run`).
- Static code review for beginner-friendly DOM game logic.
- Bug fix implementation and behavior alignment with documented rules.
- Technical documentation authoring for class-facing project handoff.

## Known Constraints

- No backend; all state is in-memory and resets on page reload.
- No external JS framework or game engine.
- Browser autoplay rules may block sound until user interaction (normal behavior).

## Quick Run

1. Open `index.html` in a browser.
2. Click Start.
3. Click tokens, watch score/chance/click counters, and use sliders to change pacing.
4. Use Reset to restart round state.

