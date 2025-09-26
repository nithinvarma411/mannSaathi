import { parse } from 'csv-parse';
import { Readable } from 'node:stream';

export type CsvUserRow = {
  uid: string;               // student/counsellor unique id
  name: string;              // student/counsellor name
  email: string;             // registered email
  phone: string;             // registered mobile
  role: 'student' | 'counsellor';
};

export function parseUsersCsv(stream: Readable): Promise<CsvUserRow[]> {
  return new Promise((resolve, reject) => {
    const rows: CsvUserRow[] = [];
    stream
      .pipe(parse({ columns: true, trim: true }))
      .on('data', (rec) => {
        rows.push({
          uid: String(rec.uid),
          name: String(rec.name),
          email: String(rec.email).toLowerCase(),
          phone: String(rec.phone),
          role: rec.role === 'counsellor' ? 'counsellor' : 'student'
        });
      })
      .on('end', () => resolve(rows))
      .on('error', reject);
  });
}
