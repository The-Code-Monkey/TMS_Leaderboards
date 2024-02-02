import styles from './page.module.scss';
import Table from './table';
import Provider from '@/app/provider';
import { PageProps } from '@/app/utils';
import supabase from '@/app/supabase';

type RecordType = {
  date: string;
  name: string;
  link: string;
  ats: number;
  skips: number;
  time?: string;
  wrs?: number;
  validated: boolean;
};

export const revalidate = 60;

const getData = async (table: string): Promise<Array<RecordType>> => {
  const { data } = await supabase.from(table).select('*').eq('validated', true);

  return data as unknown as Promise<Array<RecordType>>;
};

const Page = async ({ params }: PageProps) => {
  const board = params.board;
  const data = await getData(board);

  const sortedData = data.sort((a, b) => {
    if (board.includes('wr')) {
      if (a?.wrs > b?.wrs) {
        return -1;
      }
      if (a?.wrs < b?.wrs) {
        return 1;
      }
    } else {
      if (a.ats > b.ats) {
        return -1;
      }
      if (a.ats < b.ats) {
        return 1;
      }
    }
    return 0;
  });

  return (
    <Provider>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>{board.toUpperCase()} Leaderboard</h1>
          <Table board={board} data={sortedData} />
        </main>
      </div>
    </Provider>
  );
};

export default Page;
