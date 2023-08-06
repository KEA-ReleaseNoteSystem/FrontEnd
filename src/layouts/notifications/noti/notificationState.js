import { atom } from 'recoil';

export const notificationState = atom({
  key: 'notificationState',
  default: null, // 기본값은 알림이 없는 상태
});