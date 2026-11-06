import Image from "next/image"
import styles from "./landing.module.css"

// Real screenshots of the premium app (zenni-app-claude-backup web build), captured at
// 390×791 @2x. They sit below an iOS-style status bar. Data shown is the app's sample data.
export const SCREENSHOTS = [
  { src: "/app-screens/welcome.png", alt: "ZenniFit welcome screen" },
  { src: "/app-screens/home-matt.png", alt: "Home tab with strain, recovery and sleep rings" },
  { src: "/app-screens/train.png", alt: "Train tab with today's session and training load" },
  { src: "/app-screens/health.png", alt: "Health tab with daily biometrics" },
  { src: "/app-screens/coach.png", alt: "Zenni AI chat reading today's recovery" },
  { src: "/app-screens/social.png", alt: "Social tab with community and upcoming races" },
]

// Current iOS status bar: time centred in the left "ear", then signal, Wi-Fi and battery
// centred in the right ear, all vertically aligned with the Dynamic Island.
function StatusBar() {
  return (
    <div className={`${styles.statusBar} h-[42px] shrink-0 grid grid-cols-[1fr_88px_1fr] items-center text-white`} aria-hidden>
      <span className="justify-self-center text-[13px] font-semibold tracking-[-0.01em] pl-2">9:41</span>
      <span />
      <span className="justify-self-center flex items-center gap-[5px] pr-2">
        {/* Cellular */}
        <svg width="16" height="10" viewBox="0 0 16 10" fill="#fff">
          <rect x="0" y="7" width="3" height="3" rx="0.8" />
          <rect x="4.3" y="5" width="3" height="5" rx="0.8" />
          <rect x="8.6" y="2.6" width="3" height="7.4" rx="0.8" />
          <rect x="12.9" y="0" width="3" height="10" rx="0.8" />
        </svg>
        {/* Wi-Fi */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="#fff">
          <path d="M7 1.6c2.1 0 4 .8 5.5 2.1l.9-.95A9.2 9.2 0 0 0 7 .2 9.2 9.2 0 0 0 .6 2.75l.9.95A8 8 0 0 1 7 1.6Z" />
          <path d="M7 4.6c1.3 0 2.5.5 3.4 1.3l.95-.95A6.2 6.2 0 0 0 7 3.2a6.2 6.2 0 0 0-4.35 1.75l.95.95c.9-.8 2.1-1.3 3.4-1.3Z" />
          <path d="M7 7.4c.6 0 1.1.2 1.5.55L7 9.5 5.5 7.95c.4-.35.9-.55 1.5-.55Z" />
        </svg>
        {/* Battery */}
        <svg width="24" height="11" viewBox="0 0 24 11">
          <rect x="0.5" y="0.5" width="20.5" height="10" rx="3" fill="none" stroke="#fff" strokeOpacity="0.4" />
          <rect x="2" y="2" width="15" height="7" rx="1.7" fill="#fff" />
          <path d="M22.3 3.6v3.8c.75-.25 1.2-1 1.2-1.9s-.45-1.65-1.2-1.9Z" fill="#fff" fillOpacity="0.45" />
        </svg>
      </span>
    </div>
  )
}

export function AppScreenshot({ index, priority }: { index: number; priority?: boolean }) {
  const shot = SCREENSHOTS[index]
  return (
    <div className="absolute inset-0 bg-black flex flex-col">
      <StatusBar />
      <div className="relative flex-1">
        <Image src={shot.src} alt={shot.alt} fill sizes="300px" quality={90} priority={priority} className="object-contain object-top" />
      </div>
    </div>
  )
}
