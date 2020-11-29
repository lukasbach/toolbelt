/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import cxs from 'cxs';
import { bounceTransition, px } from './common';
import { useSpring, animated } from 'react-spring/web';
import { useState } from 'react';


export const BottomContent: React.FC<{}> = props => {
  return (
    <div className={cxs({
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: px(400),
      overflow: 'hidden',
    })}>
      <div
        className={cxs({
          position: 'relative',
          top: 0,
          left: 0,
          height: '100%',
          paddingTop: '100px',
          transition: `padding .6s ${bounceTransition}`,
          ':hover': {
            paddingTop: '120px',
            '> .box1': {
              transform: 'rotate(-9deg) translateY(150px)'
            },
            '> .box2': {
              transform: 'rotate(5deg) translateY(160px)'
            }
          }
        })}
      >
        <animated.div
          className={cxs({
            zIndex: 1,
            position: 'absolute',
            top: px(100),
            left: px(-200),
            width: '200%',
            height: px(1000),
            backgroundColor: '#e67e22',
            transform: 'rotate(-5deg) translateY(0px)',
            transition: `transform .6s ${bounceTransition}`
          }) + ' box1'}
        />
        <animated.div
          className={cxs({
            zIndex: 1,
            position: 'absolute',
            top: px(200),
            left: px(-200),
            width: '200%',
            height: px(1000),
            backgroundColor: '#e74c3c',
            transform: 'rotate(3deg) translateY(0px)',
            transition: `transform .6s ${bounceTransition}`
          }) + ' box2'}
        />
        <div
          className={cxs({
            position: 'absolute',
            width: '100%',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          })}
        >
          { props.children }
        </div>
      </div>
    </div>
  );
};

export const BottomContentCard: React.FC<{}> = props => {

  return (
    <div className={cxs({
      width: '360px',
      height: '200px',
      backgroundColor: 'white',
      // border: `2px solid #e74c3c`,
      boxShadow: `0 4px 0 2px rgba(0, 0, 0, .2)`,
      borderRadius: '16px',
      margin: '0 32px',
      transition: `transform .6s ${bounceTransition}`,
      ':hover': {
        transform: 'translateY(-40px)'
      }
    })}>
      Content
    </div>
  );
};

export const BottomContentActionButton: React.FC<{}> = props => {

  return (
    <button className={cxs({
      width: '360px',
      height: '140px',
      background: `linear-gradient(70deg, rgba(231,76,60,1) 0%, rgba(230,126,34,1) 100%)`,
      border: `8px solid white`,
      boxShadow: `0 4px 0 2px rgba(0, 0, 0, .2)`,
      borderRadius: '16px',
      margin: '0 32px',
      cursor: 'pointer',
      color: 'white',
      fontSize: '24px',
      transition: `transform .6s ${bounceTransition}`,
      ':hover': {
        transform: 'translateY(-12px) scale(1.08)'
      }
    })}>
      Let's start!
    </button>
  );
};
