# Zenni Fitness

AI coaching, trail tracking, structured training, and creator content — built with Expo + React Native.

## Run it

```bash
npm install
npm run web     # preview in the browser at http://localhost:8081
npm run ios     # requires macOS / Xcode
npm run android # requires Android Studio
```

Scanning the QR code from `npm start` with Expo Go previews the real native app on your phone.

## What's here

- **Home** — dashboard: streak, weekly progress, today's plan, smartband status
- **Coachify** — the AI coaching side: readiness score, recovery/performance/movement insights
- **Run** — AllTrails-style trail discovery + tracking, Nike Run Club-style performance detail and phone-vs-smartband comparison
- **Train** — Ladder-style strength programs presented in a Better You-style day-by-day structure
- **Studio** — Zenni Studio: subscription video content from creators
- **Profile → Pricing / Smartband** — Basic / Silver / Gold / Platinum plan comparison and band connection settings

## Notes on this build

- All data is mocked (`data/`) — there's no backend yet. The tier switcher in Profile is a demo control, not a real payment flow.
- GPS tracking and Bluetooth smartband pairing only work on a real device; on web those actions are replaced with a `NativeOnly` notice while the surrounding UI still renders with mock data so the design is reviewable in the browser.
- Trail maps use a stylized `TrailMapPreview` (SVG) instead of a real map SDK — swap in `react-native-maps` (native) / a web map library when live GPS is wired up.
- The dragon mascot (`components/ui/DragonMascot.tsx`) is placeholder line-art. Drop in real artwork there and in `assets/icon.png` / `assets/splash-icon.png` once it exists — no other layout code needs to change.
- Pricing tier contents (`constants/pricing.ts`) are a proposed starting point — adjust freely, `PaywallGate` and every gated screen read from that one file.
