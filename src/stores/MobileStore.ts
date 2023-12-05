import { atom } from 'recoil';

export const mobileIsOpenStore = atom<boolean>({
  key: `mobileIsOpenStore`,
  default: false,
});
