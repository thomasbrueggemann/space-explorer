# 🚀 Space Explorer — A Solar System Adventure

An ultra-realistic, kid-friendly (age ~7) 3D solar system built with **three.js**, in a single
`index.html`. Explore all 8 planets, the Sun, the Moon and Pluto — with missions, sounds,
and a passport full of stamps to collect.

## Run it

Just open `index.html` in any modern browser (Chrome, Safari, Edge, Firefox) — no build step.
Internet is needed on first load for the 3D engine and the real planet texture photos; if a
texture can't load, the app paints a stand-in planet so nothing breaks.

Or serve it locally:

```sh
npx serve .        # then open the printed URL
# or
python3 -m http.server 8000   # then open http://localhost:8000
```

Works great on phones and tablets too (touch controls built in).

## What's inside

- **Realistic planets** — real NASA-derived texture maps, Saturn & Uranus rings, Earth's
  drifting clouds + blue atmosphere glow, axial tilts (Uranus rolls on its side!), an
  asteroid belt, 6,000 stars and a Milky Way backdrop.
- **Exploration that feels exciting** — tap/click any planet and your "rocket" swooshes
  over to it and follows it along its orbit. Shooting stars streak by. Confetti when you
  succeed.
- **🎯 Space Missions** — 11 quests ("Find the RED planet!") that turn learning into a
  treasure hunt. Finish them all to become a Space Captain.
- **🛂 Space Passport** — every world stamps your passport; progress is saved between visits.
- **Education** — 3 kid-friendly facts + a "Did you know?" for every world, and a
  **Read to me** button that reads facts aloud. It automatically picks the most
  natural English voice your device offers (Edge neural voices, Siri/Premium voices
  on Apple devices, Google voices on Chrome) and reads sentence-by-sentence for
  smooth, fluent narration.
- **Sound effects** — launch rumble, whooshes, chimes, stamps and fanfares, all synthesized
  live with the Web Audio API (no audio files). Mute button included.
- **Touch + mouse navigation** — one finger / left-drag to orbit, pinch / scroll to zoom,
  tap to travel. Time controls: pause ⏸, play ▶, super-speed ⏩.

## Credits

- Planet texture maps by James Hastings-Trew (planetpixelemporium.com), served via the
  [threex.planets](https://github.com/jeromeetienne/threex.planets) project on jsDelivr.
- Built with [three.js](https://threejs.org).

*Science note shown in-app: sizes and distances are stylized — real space is far too empty
to fit on one screen!*
