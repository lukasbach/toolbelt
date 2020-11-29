import * as React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import cxs from 'cxs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { alpha, px } from './common';

export const KeyPoints: React.FC<{
  keyPoints: Array<{ icon: IconProp, title: string, subtitle: string, clickId?: string }>,
}> = props => {
  return (
    <div className={cxs({
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: px(0, 64),
    })}>
      {
        props.keyPoints.map(point => {
          const Comp = point.clickId ? 'a' : 'div';

          return (
            <Comp
              className={cxs({
                display: 'flex',
                alignItems: 'center',
                flexBasis: 0,
                minWidth: px(320),
                padding: px(0, 32),
                color: alpha('#fff', .6),
                transition: '.3s all ease',
                marginBottom: px(64),
                textDecoration: 'none',
                ':hover': {
                  color: '#fff'
                }
              })}
              href={`${window.location.pathname}#${point.clickId}`}
            >
              <div className={cxs({
                marginRight: px(16)
              })}>
                <FontAwesomeIcon icon={point.icon} size="3x" />
              </div>
              <div className={cxs({
                '> h3': {
                  margin: 0,
                },
                '> p': {
                  margin: 0,
                }
              })}>
                <h3 children={point.title} />
                <p children={point.subtitle} />
              </div>
            </Comp>
          );
        })
      }
    </div>
  );
};
