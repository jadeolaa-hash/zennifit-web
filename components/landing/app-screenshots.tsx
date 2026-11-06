import Image from "next/image"

// Real screenshots of the premium app (zenni-app-claude-backup web build), captured at
// 390×791 @2x so they fit the phone screen below a status bar. Data shown is the app's sample data.
export const SCREENSHOTS = [
  { src: "/app-screens/welcome.png", alt: "ZenniFit welcome screen" },
  { src: "/app-screens/home.png", alt: "Home tab with strain, recovery and sleep rings" },
  { src: "/app-screens/train.png", alt: "Train tab with today's session and training load" },
  { src: "/app-screens/health.png", alt: "Health tab with daily biometrics" },
  { src: "/app-screens/coach.png", alt: "AI Coach chat reading today's recovery" },
  { src: "/app-screens/social.png", alt: "Social tab with community and upcoming races" },
]

export function AppScreenshot({ index, priority }: { index: number; priority?: boolean }) {
  const shot = SCREENSHOTS[index]
  return (
    <div className="absolute inset-0 bg-black flex flex-col">
      <div className="h-[30px] shrink-0 flex items-center justify-between px-6 text-[11px] font-bold text-white">
        <span>9:41</span>
        <span className="w-4 h-2.5 rounded-[3px] border border-white/70 relative">
          <span className="absolute inset-[1.5px] right-[4px] bg-white rounded-[1px]" />
        </span>
      </div>
      <div className="relative flex-1">
        <Image src={shot.src} alt={shot.alt} fill sizes="300px" quality={90} priority={priority} className="object-cover object-top" />
      </div>
    </div>
  )
}
