import Link from 'next/link';
import styles from './page.module.scss';

export default async function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Official TMX Leaderboards</h1>
        <div className={styles.center}>
          <Link href="/rmc">
            <h1 className={styles.title}>
              RMC <br /> Leaderboard
            </h1>
          </Link>
          <Link href="/rms">
            <h1 className={styles.title}>
              RMS <br /> Leaderboard
            </h1>
          </Link>
          {/*<Link href='/rmct'>*/}
          {/*  <h1 className={styles.title}>*/}
          {/*    RMCT <br /> Leaderboard*/}
          {/*  </h1>*/}
          {/*</Link>*/}
        </div>
      </main>
    </div>
  );
}
