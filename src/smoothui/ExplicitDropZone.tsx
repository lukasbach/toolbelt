import * as React from 'react';
import cxs from 'cxs';
import { alpha, cls, globals, lighten, px, useTheme } from './common';
import { DragEventHandler, useCallback, useRef, useState } from 'react';
import { faGripHorizontal, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from './Button';
import { useDropzone } from 'react-dropzone';

const style = {
  zone: cxs({
    height: px(240),
    borderRadius: px(32),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    outline: 'none',
    '> h3 > svg': {
      marginRight: px(8)
    }
  }),
  smallZone: cxs({
    height: px(160),
    '> h3': {
      margin: 0
    }
  })
};

export const ExplicitDropZone: React.FC<{
  onDrop?: (files: File[]) => any;
  small?: boolean;
  title: string;
  accept?: string;
}> = props => {
  const theme = useTheme();
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: props.accept,
    multiple: true,
    onDrop: acceptedFiles => props.onDrop?.(acceptedFiles)
  })

  return (
    <div
      className={cls(style.zone, props.small && style.smallZone)}
      style={{
        border: `4px dotted ${alpha(theme.color, .3)}`,
        ...(!isDragActive ? {} : {
          backgroundColor: alpha(theme.color, .05)
        })
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <h3><FontAwesomeIcon icon={faUpload} size={'3x'} /> { props.title }</h3>
      <p>
        or click
        <Button>here</Button>
        to choose a file from your computer
      </p>
    </div>
  );
};
