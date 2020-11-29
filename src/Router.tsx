import * as React from 'react';
import { useEffect, useState } from 'react';

export const Router: React.FC<{
  routes: Array<{
    key: string,
    render: () => any
  }>,
  fallback: () => any,
}> = props => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ignored, forceUpdate] = useState(0);

  const route = props.routes.find(r => window.location.hash.slice(1) === r.key
    || window.location.pathname.slice(1) === r.key);

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      forceUpdate(x => x + 1);
    });
  }, []);

  return route?.render() || props.fallback();
};
