import { forwardRef, type ReactNode } from "react"
import styles from "./landing.module.css"

// A CSS-3D phone modelled on the current iPhone Pro: thin uniform bezels, Dynamic Island,
// and an aluminium frame. The face sits at z=0 and a stack of rounded "slices" behind it
// builds the frame, so when the phone is tilted you see its side and buttons.
const SLICES = 18
const STEP = 1.4

export const Phone = forwardRef<HTMLDivElement, { children: ReactNode; glareRef?: React.Ref<HTMLDivElement> }>(
  function Phone({ children, glareRef }, ref) {
    return (
      <div ref={ref} className={styles.phone}>
        {Array.from({ length: SLICES }, (_, i) => (
          <div key={i} className={styles.slice} style={{ transform: `translateZ(${-(i + 1) * STEP}px)` }}>
            {/* Buttons only exist on the middle slices, so they read as raised keys */}
            {i > 4 && i < 13 && (
              <>
                <span className={styles.btnAction} />
                <span className={styles.btnVolUp} />
                <span className={styles.btnVolDown} />
                <span className={styles.btnSide} />
                <span className={styles.btnCamera} />
              </>
            )}
          </div>
        ))}
        <div className={styles.back} style={{ transform: `translateZ(${-(SLICES + 1) * STEP}px)` }} />

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
