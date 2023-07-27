
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const projectIdState = atom({
  key: 'projectId',
  default: null,
  effects_UNSTABLE: [persistAtom]
});