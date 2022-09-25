import { atom } from 'recoil';

export const ModalAtom = atom<React.ReactNode>({
  key: 'modal.atom',
  default: null,
});
