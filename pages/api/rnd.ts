import type { NextApiRequest, NextApiResponse } from 'next';
import { ShortID, RandomID } from '../../lib/random';

type Data = {};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ short: ShortID(), rnd: RandomID() });
}
