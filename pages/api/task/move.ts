import type { NextApiRequest, NextApiResponse } from 'next';
import { moveTask } from '../../../lib/api';

type Data = {};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { table_id, id, position } = req.query as {
    table_id: string;
    id: string;
    position: string;
  };
  let table = moveTask(table_id, id, +position);
  if (table) {
    res.status(200).json(table);
  } else {
    res.json({
      error: 'cant move task',
    });
    res.status(400).end();
  }
}
