import * as React from 'react';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import cxs from 'cxs';
import { cls, px, useAnimationLifecycle } from './common';

const style = {
  container: cxs({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: px(240)
  }),
  inner: cxs({
    display: 'inline-flex',
    flexDirection: 'row',
    width: px(640),
  }),
  left: cxs({
    margin: px(16, 32),
  }),
  right: cxs({
    flexGrow: 1,
    '> h1': {
      fontSize: '3em',
      margin: px(0, 0, 0, 0)
    }
  }),
};

export const Title: React.FC<{
  icon: IconProp,
  text: string,
  subtext: string[],
}> = props => {
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className={style.left}>
          <FontAwesomeIcon icon={props.icon} size={'6x'} />
        </div>
        <div className={style.right}>
          <h1>{ props.text }</h1>
          { props.subtext.map(t => <p>{t}</p>) }
        </div>
      </div>
    </div>
  );
};
