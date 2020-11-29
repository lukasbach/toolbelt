import * as React from 'react';
import cxs from 'cxs';
import Color from 'color';
import { faGripHorizontal, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  container: cxs({
    position: 'absolute',
    bottom: '0px',
    left: '0px',
    right: '0px',
    padding: '16px',
    borderRadius: '12px',
    margin: '32px',
    display: 'flex',
    color: '#fff',
    '> :nth-child(1)': {
      flexGrow: 1
    },
    ' a': { color: '#fff', textDecoration: 'none', borderBottom: '1px solid white' },
    ' a:visited': { color: '#fff' },
    ' a:hover': { color: '#fff', borderBottom: '3px solid white' },
  })
}

export const Footer: React.FC<{
  pageColor: string
}> = props => {

  return (
    <div className={[
      styles.container,
      cxs({
        backgroundColor: Color(props.pageColor).lighten(.2).toString(),
      })
    ].join(' ')}>
      <div>
        Made with <FontAwesomeIcon icon={faHeart} /> by <a href="https://lukasbach.com" target="_blank">Lukas Bach</a>.{' '}
        Also checkout <a href="https://yana.js.org" target="_blank">Yana</a> and{' '}
        <a href="https://devsession.js.org" target="_blank">DevSession</a>!
      </div>
      <div>
        Icons by <a href="https://fontawesome.com/" target="_blank">fontawesome</a>{' '}
        <a href="https://fontawesome.com/license" target="_blank">(License)</a>.{' '}
        <a href="https://lukasbach.com/impress">Impress</a>.
      </div>
    </div>
  );
};
