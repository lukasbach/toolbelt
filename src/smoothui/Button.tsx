import * as React from 'react';
import { alpha, globals, px, useTheme } from './common';
import cxs from 'cxs';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Button: React.FC<{
  big?: boolean;
  icon?: IconProp;
  rightIcon?: IconProp;
  onClick?: () => any;
}> = props => {
  const theme = useTheme();

  return (
    <button
      onClick={props.onClick}
      className={cxs({
        border: 'none',
        borderRadius: props.big ? px(16) : globals.borderRadius,
        backgroundColor: alpha(theme.color, .3),
        color: alpha('#fff', .8),
        padding: props.big ? px(16, 32) : px(8, 16),
        margin: px(0, 8),
        cursor: 'pointer',
        outline: 'none',
        fontSize: props.big ? '1.2em' : undefined,
        transition: '.1s all ease',
        ':hover': {
          backgroundColor: alpha(theme.color, .5)
        },
        ':focus': {
          boxShadow: `0 0 0 3px ${theme.color}`
        }
      })}
    >
      { props.icon && <FontAwesomeIcon icon={props.icon} style={{ marginRight: '8px' }} /> }
      { props.children }
      { props.rightIcon && <FontAwesomeIcon icon={props.rightIcon} style={{ marginLeft: '8px'}} /> }
    </button>
  );
};
