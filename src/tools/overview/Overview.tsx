import * as React from 'react';
import { ToolContainer } from '../../smoothui/ToolContainer';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
import { tools } from '../tools';

export const Overview: React.FC<{}> = props => {
  return (
    <ToolContainer
      theme={{ color: '#D28E08', background: ['#461B05', '#86370d'] }}
      showHeader={true}
      showTitle={true}
      toolKey="overview"
      tool={{
        icon: faHammer,
        key: 'overview',
        name: 'Toolbelt',
        subtitle: ['Helpful technical tools'],
        keyPoints: tools
          .map(tool => ({
            title: tool.name,
            icon: tool.icon,
            subtitle: tool.subtitle[0],
            clickId: tool.key
          })),
        render: () => null
      }}
    >

    </ToolContainer>
  );
};
