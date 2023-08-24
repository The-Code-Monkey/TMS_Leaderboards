'use client';

import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

interface Props {
  board: string;
  data: Array<Record<string, number | string | boolean>>;
}

const Table = ({ board, data }: Props) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Date Submitted</TableCell>
            <TableCell align="center">TM Name</TableCell>
            <TableCell>Link</TableCell>
            <TableCell align="right">ATs</TableCell>
            {board === 'rmc' && <TableCell align="right">Golds</TableCell>}
            {board === 'rms' && <TableCell align="right">Skips</TableCell>}
            {board === 'rms' && (
              <TableCell align="right">Survived Time</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.date as string}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell>
                <Link href={row.link as string} target={'_blank'}>
                  {row.link}
                </Link>
              </TableCell>
              <TableCell align="right">{row.ats}</TableCell>
              {board === 'rmc' && (
                <TableCell align="right">{row.golds}</TableCell>
              )}
              {board === 'rms' && (
                <TableCell align="right">{row.skips}</TableCell>
              )}
              {board === 'rms' && (
                <TableCell align="right">{row.time}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
