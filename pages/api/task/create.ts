import type { NextApiRequest, NextApiResponse } from 'next';
import { createTask } from '../../../lib/api';

type Data = {};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { table_id, name, description } = req.query as {
    table_id: string;
    name: string;
    description: string;
  };

  let task = createTask(table_id, name, description);

  if (task) {
    res.status(200).json( task );
  } else {
    res.json({
      error: 'cant create task',
    });
    res.status(400).end();
  }
}
