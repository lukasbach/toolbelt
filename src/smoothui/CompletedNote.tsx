import * as React from 'react';
import { alpha, px, useTheme } from './common';
import cxs from 'cxs';

export const CompletedNote: React.FC<{
  title: string;
  text: string;
  primaryButton: React.ReactNode;
  redoButton?: React.ReactNode;
}> = props => {
  const theme = useTheme();

  return (
    <div className={cxs({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    })}>
      <div className={cxs({
        width: px(640),
        backgroundColor: alpha(theme.color, .05),
        borderRadius: px(32),
        padding: px(24),
        display: 'flex',
        alignItems: 'center'
      })}>
        <div className={cxs({
          '> h2': {
            margin: 0
          }
        })}>
          <h2>{ props.title }</h2>
          <p>{ props.text }</p>
          { props.redoButton }
        </div>
        <div className={cxs({
          minWidth: px(240)
        })}>
          { props.primaryButton }
        </div>
      </div>
    </div>
  );
};
