import Link from 'next/link';
import styles from './page.module.scss';

export default async function Home() {
  // const res = await fetch(process.env.URL + '/api/new-entry', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     token: 'dsajdghasdyas',
  //     accountId: 'da4642f9-6acf-43fe-88b6-b120ff1308ba',
  //     displayName: 'Scrapie98',
  //     pluginVersion: '1.0.0',
  //     gameMode: 'rmc',
  //     runData: {
  //       ats: 1,
  //       golds: 1,
  //     },
  //   }),
  //   cache: 'no-store',
  // });
  //
  // if (res.status === 400) console.error(await res.text());
  // else console.log('STATUS:', res.status);

  // console.log("HERE", await res.json());

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
          <Link href="/wrrmc">
            <h1 className={styles.title}>
              WR RMC <br /> Leaderboard
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
