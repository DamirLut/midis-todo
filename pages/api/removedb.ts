import type { NextApiRequest, NextApiResponse } from 'next';
import { removeDB } from '../../lib/api';

type Data = {};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ ok: removeDB() });
}
