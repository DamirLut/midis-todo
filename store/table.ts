import { TableData } from 'lib/api.type';
import { atom } from 'recoil';

export const TableAtom = atom<TableData>({
  key: 'table.atom',
  default: { title: '', columns: [] },
});
