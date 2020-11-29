import * as React from 'react';
import { BottomContent, BottomContentActionButton, BottomContentCard } from './BottomContent';


export const UiContainer: React.FC<{}> = props => {

  return (
    <>
      <BottomContent>
        <BottomContentCard>Lorem Ipsum</BottomContentCard>
        <BottomContentCard>Lorem Ipsum</BottomContentCard>
        <BottomContentCard>Lorem Ipsum</BottomContentCard>
      </BottomContent>
    </>
  );
};
