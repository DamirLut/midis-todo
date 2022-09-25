import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteTask } from '../../../lib/api';

type Data = {};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {table_id, id} = req.query as {table_id: string, id: string};
  
  let table = deleteTask(table_id, id);
  if (table) {
    res.status(200).json(table);
  } else {
    res.json({
      error: 'cant delete task',
    });
    res.status(400).end();
  }
}
