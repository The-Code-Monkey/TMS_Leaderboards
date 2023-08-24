import Link from 'next/link';
import styles from './page.module.scss';

export default async function Home() {
  const result = await fetch(process.env.URL + '/api/new-entry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: 'dsadnasjdasbjk',
      accountId: 1,
      displayName: 'Test',
      pluginVersion: '1.1.1',
    }),
    cache: 'no-store',
  });

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
