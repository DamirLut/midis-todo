import { TableData } from 'lib/api.type';
import { atom } from 'recoil';

export const TableAtom = atom<TableData>({
  key: 'table.atom',
  ///@ts-ignore
  default: { error: '' },
});

export const TableExistAtom = atom({
  key: 'table.exits.atom',
  default: false,
});
