import type { FC, ReactNode } from 'react';
import OverlaysModal, { type RenderModalBackdropProps } from 'react-overlays/Modal';

import * as styles from './Modal.styles';

const Backdrop: FC<RenderModalBackdropProps> = (props) => <div className={styles.backdrop()} {...props}></div>;

type Props = {
  show: boolean;
  onHide: () => void;
  children: ReactNode;
};

export const Modal: FC<Props> = ({ children, onHide, show }) => (
  <OverlaysModal className={styles.container()} onHide={onHide} renderBackdrop={Backdrop} show={show}>
    <div className={styles.inner()} data-testid="modal">
      {children}
    </div>
  </OverlaysModal>
);
