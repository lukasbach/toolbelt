import * as React from 'react';
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cxs from 'cxs';
import { cls, globals, px, useAdaptiveStyles, useTheme } from './common';
import Color from 'color';
import { useState } from 'react';
import { Tool, tools } from '../tools/tools';

const style = {
  header: cxs({
    padding: px(16, 32)
  }),
  headerItem: cxs({
    padding: px(16, 18),
    color: 'white',
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer',
    borderRadius: globals.borderRadius,
  }),
  primaryHeaderItem: cxs({
    fontWeight: 'bold'
  })
};

const HeaderItem: React.FC<{
  isPrimary?: boolean,
  expandLeft?: boolean,
  url?: string,
}> = props => {
  const theme = useTheme();
  const {adaptiveProps, adaptiveStyles} = useAdaptiveStyles({
    backgroundColor: Color(theme.color).alpha(.1).toString()
  }, {
    backgroundColor: Color(theme.color).alpha(.2).toString()
  });

  return (
    <a
      href={props.url}
      className={cls(style.headerItem, props.isPrimary && style.primaryHeaderItem)}
      style={{
        ...adaptiveStyles
      }}
      {...adaptiveProps}
    >
      { props.children }
    </a>
  );
}

export const Header: React.FC<{
  tool: Tool,
}> = props => {
  const tool = props.tool;

  return (
    <header
      className={style.header}
    >
      <HeaderItem expandLeft={true} url={window.location.pathname}>
        <FontAwesomeIcon icon={faGripHorizontal} />
      </HeaderItem>
      <HeaderItem isPrimary={true}>
        { tool.name }
      </HeaderItem>
      {
        tools.filter(t => t.key !== tool.key).map(t => (
          <HeaderItem url={`${window.location.pathname}#${t.key}`}>
            { t.name }
          </HeaderItem>
        ))
      }
    </header>
  );
};
