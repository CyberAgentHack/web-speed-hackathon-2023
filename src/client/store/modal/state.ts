import { atom } from 'recoil';

export type ModalKey = 'SIGN_UP' | 'SIGN_IN';
export const modalState = atom<ModalKey | undefined>({ default: undefined, key: 'modal' });
