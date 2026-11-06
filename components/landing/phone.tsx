import { forwardRef, type ReactNode } from "react"
import styles from "./landing.module.css"

// A CSS-3D phone. The face sits at z=0 and a stack of rounded "slices" behind it
// builds the titanium edge, so when the phone is tilted you see its side and buttons.
const SLICES = 12

export const Phone = forwardRef<HTMLDivElement, { children: ReactNode; glareRef?: React.Ref<HTMLDivElement> }>(
  function Phone({ children, glareRef }, ref) {
    return (
      <div ref={ref} className={styles.phone}>
        {Array.from({ length: SLICES }, (_, i) => (
          <div
            key={i}
            className={styles.slice}
            style={{ transform: `translateZ(${-(i + 1) * 1.25}px)` }}
          >
            {/* Side buttons only exist on the middle slices, so they read as raised keys */}
            {i > 2 && i < 9 && (
              <>
                <span className={styles.btnAction} />
                <span className={styles.btnVolUp} />
                <span className={styles.btnVolDown} />
                <span className={styles.btnPower} />
              </>
            )}
          </div>
        ))}
        <div className={styles.back} style={{ transform: `translateZ(${-(SLICES + 1) * 1.25}px)` }} />

        <div className={styles.face}>
          <div className={styles.screen}>
            {children}
            <div className={styles.island} />
            <div ref={glareRef} className={styles.glare} />
          </div>
        </div>
      </div>
    )
  },
)
