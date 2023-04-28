import Link from 'next/link'
import styles from './page.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
    <main className={styles.main}>
      <div className={styles.center}>
        <Link href='/rmc'>
        <h1 className={styles.title}>
          RMC <br /> Leaderboard
        </h1>
        </Link>
        <Link href='/rms'>
        <h1 className={styles.title}>
          RMS <br /> Leaderboard
        </h1>
        </Link>
        <Link href='/rmct'>
          <h1 className={styles.title}>
            RMCT <br /> Leaderboard
          </h1>
        </Link>
        <Link href='/submit'>
          <h1 className={styles.title}>
            Submit <br /> Record
          </h1>
        </Link>
      </div>
    </main>
    </div>
  )
}
