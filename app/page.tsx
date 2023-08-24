'use client'

import Link from 'next/link'
import styles from './page.module.scss'

export default function Home() {
  fetch('/api/new-entry', {
    method: "POST",
    body: JSON.stringify({
      token: "SDASdsadasgduasgduysatd67d3y2",
      accountId: 1,
      displayName: "Test",
      pluginVersion: "1.1.1"
    })
  })

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
          {/*<Link href='/rmct'>*/}
          {/*  <h1 className={styles.title}>*/}
          {/*    RMCT <br /> Leaderboard*/}
          {/*  </h1>*/}
          {/*</Link>*/}
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
