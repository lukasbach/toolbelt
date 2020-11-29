import * as React from 'react';
import cxs from 'cxs';
import { px, Theme, ThemeContext } from './common';
import { Header } from './Header';
import Color from 'color';
import { Title } from './Title';
import { Tool, tools } from '../tools/tools';
import { KeyPoints } from './KeyPoints';
import { Footer } from './Footer';

const style = {
  toolContainer: cxs({
    minHeight: '100%',
    color: Color('#fff').darken(.1).toString(),
    position: 'relative',
  }),
  padded: cxs({
    padding: px(0, 240)
  })
};

export const ToolContainer: React.FC<{
  theme: Theme;
  toolKey: string;
  showHeader?: boolean;
  showTitle?: boolean;
  tool?: Tool;
}> = props => {
  const tool = props.tool || tools.find(t => t.key === props.toolKey)!;
  const [bg1, bg2] = props.theme.background;

  return (
    <ThemeContext.Provider value={props.theme}>
      <div
        className={style.toolContainer}
        style={{
          background: `linear-gradient(180deg, ${bg1} 0%, ${bg2} 100%)`,
        }}
      >
        { props.showHeader && <Header tool={tool} /> }
        <div className={style.padded}>
          { props.showTitle && <Title text={tool.name} subtext={tool.subtitle} icon={tool.icon} /> }
        </div>
        { props.showTitle && <KeyPoints keyPoints={tool.keyPoints} /> }
        <div className={style.padded}>
          { props.children }
        </div>
        <div style={{ height: '128px' }} />
        <Footer pageColor={bg2} />
      </div>
    </ThemeContext.Provider>
  );
};
