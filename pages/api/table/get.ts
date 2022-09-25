import type { NextApiRequest, NextApiResponse } from 'next';
import { getTable } from '../../../lib/api';

type Data = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query as { id: string };
  const table = getTable(id);
  if (table) {
    return res.status(200).json(table);
  }
  res.json({
    error: 'table not found',
  });
  res.status(400).end();
}
