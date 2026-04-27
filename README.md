Learning Accelerator - Coding for the Web Project

Any Operating system / screen size / Very Challenging :)

A DOM-based JavaScript arcade game inspired by whack-a-mole, themed around charity: water branding and token-based game mechanics
Multiple available difficulty levels

Live version:
[https://diazdizazter.github.io/Desoloate Envirnoment Fighter/](https://diazdizazter.github.io/Desolate-Envirnoment-Fighter-Whack-a-Mole-FINAL/)

## Project Snapshot

- Goal: click appearing tokens to build score and avoid instant-loss conditions.
- Grid: 5x5 by default with the center tile locked.
- Session tracking: wins/losses, token counts, clicks left, and probability modifiers.
- Difficulty controls: popup speed, cycle speed, and playable tile density.
- Audience: beginner JavaScript DOM events, state, and game loops.

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

