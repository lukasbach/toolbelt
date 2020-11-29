import * as React from 'react';
import { px, useTheme } from './common';
import cxs from 'cxs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripHorizontal, faUpload } from '@fortawesome/free-solid-svg-icons';

const style = {
  container: cxs({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  }),
  circle: cxs({
    borderRadius: px(9999),
    width: px(400),
    height: px(400),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: 'white',
    '> h2': {
      margin: 0,
    }
  }),
};

export const RoundContainer: React.FC<{}> = props => {
  const theme = useTheme();

  return (
    <div className={style.container}>
      <div
        className={style.circle}
        style={{ backgroundColor: theme.color }}
      >
        <p><FontAwesomeIcon icon={faUpload} size={'4x'} /></p>
        <h2>Drop PDF files</h2>
      </div>
    </div>
  );
};
