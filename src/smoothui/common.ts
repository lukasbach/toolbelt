import React, { CSSProperties, DOMAttributes, useContext, useEffect, useState } from 'react';
import Color from 'color';

export interface Theme {
  color: string;
  background: [string, string];
}

export const px = (...value: number[] | string[]) => (value as any[]).map(v => `${v}px`).join(' ');
export const cls = (...classes: any[]) => classes.filter(c => !!c).join(' ');
export const bounceTransition = 'cubic-bezier(.47,1.64,.41,.8)';
export const globals = {
  borderRadius: px(8)
};
export const lighten = (col: string, perc: number) => Color(col).lighten(perc).toString();
export const darken = (col: string, perc: number) => Color(col).darken(perc).toString();
export const alpha = (col: string, perc: number) => Color(col).alpha(perc).toString();
export const ThemeContext = React.createContext<Theme>(null as unknown as Theme);
export const useTheme = () => useContext(ThemeContext);
export const useAdaptiveStyles = (hoverStyles: CSSProperties, activeStyles?: CSSProperties, focusStyles?: CSSProperties) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    const listener = () => setIsActive(false);
    document.addEventListener('mouseup', listener);
    return () => document.removeEventListener('mouseup', listener);
  })

  return {
    adaptiveProps: {
      onMouseOver: () => {
        setIsHovering(true);
      },
      onMouseOut: () => {
        setIsHovering(false);
      },
      onMouseDown: () => {
        setIsActive(true);
      },
      onMouseUp: () => {
        setIsActive(false);
      },
      onFocus: () => {
        setIsFocus(true);
      },
      onBlur: () => {
        setIsFocus(false);
      }
    } as DOMAttributes<any>,
    adaptiveStyles: {
      ...(isHovering ? hoverStyles : {}),
      ...(isActive && !isFocus && activeStyles ? activeStyles : {}),
      ...(isFocus && focusStyles ? focusStyles : {})
    }
  };
}

export const useAnimationLifecycle = (display: boolean) => {
  enum AnimationLifecycleState {
    Initial,
    Show,
    Hidden,
  }

  const [state, setState] = useState<AnimationLifecycleState>(
    display ? AnimationLifecycleState.Show : AnimationLifecycleState.Initial);

  useEffect(() => setState(display ? AnimationLifecycleState.Show : AnimationLifecycleState.Hidden),
    [display, AnimationLifecycleState.Show, AnimationLifecycleState.Hidden]);

  if (state === AnimationLifecycleState.Show) {
    return 'animate__animated animate__faster animate__fadeInLeft';
  } else if (state === AnimationLifecycleState.Hidden) {
    return 'animate__animated animate__faster animate__fadeOutRight';
  } else {
    return '';
  }
}