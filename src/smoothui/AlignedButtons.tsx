import * as React from 'react';
import cxs from 'cxs';
import { px } from './common';

const style = {
  container: cxs({
    display: 'flex',
    marginTop: px(16)
  }),
  left: cxs({
    flexGrow: 1
  }),
  right: cxs({

  })
}

export const AlignedButtons: React.FC<{
  left?: React.ReactNode;
  right?: React.ReactNode;
}> = props => (
  <div className={style.container}>
    <div className={style.left} children={props.left} />
    <div className={style.right} children={props.right || props.children} />
  </div>
);
