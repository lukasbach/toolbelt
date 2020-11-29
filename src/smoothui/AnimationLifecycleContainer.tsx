import * as React from 'react';
import { useAnimationLifecycle } from './common';

export const AnimationLifecycleContainer: React.FC<{
  display: boolean,
}> = props => {
  const animationClass = useAnimationLifecycle(props.display);

  return (
    <div className={animationClass}>
      { props.children }
    </div>
  );
};
