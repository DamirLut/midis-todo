import type { NextApiRequest, NextApiResponse } from 'next';
import { createTable } from '../../../lib/api';

type Data = {};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name } = req.query as { name: string };
  const tableId = createTable(name);
  res.status(200).json({ id: tableId });
}
