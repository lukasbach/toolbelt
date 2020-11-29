import { PdfJoinTool } from './pdfjoin/PdfJoinTool';
import { TextDiffTool } from './textdiff/TextDiffTool';
import React from 'react';
import {
  faBolt, faEyeDropper,
  faFileImport,
  faFilePdf, faFileWord,
  faLock,
  faSmileWink,
  faTachometerAlt, faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { OfficeMediaExtractionTool } from './officemedia/OfficeMediaExtractionTool';
import { ColorPickerTool } from './colorpicker/ColorPickerTool';

export interface Tool {
  key: string,
  name: string,
  keyPoints: Array<{ icon: IconProp, title: string, subtitle: string, clickId?: string }>,
  subtitle: string[],
  render: () => any,
  icon: IconProp
}

export const tools = [
  {
    key: 'pdfjoin',
    name: 'PDF Join',
    subtitle: ['Easily merge multiple PDF files into one large file, without long waiting times or file restrictions.'],
    keyPoints: [
      { icon: faBolt, title: 'Fast', subtitle: 'Your PDF files are processed in your browser and do not have to be uploaded' },
      { icon: faLock, title: 'Secure', subtitle: 'The files don\'t leave your systems and are nowhere stored' },
      { icon: faTachometerAlt, title: 'No Limitations', subtitle: 'Merge as many files as you want' },
      { icon: faSmileWink, title: 'Free', subtitle: 'Now and always' },
    ],
    render: () => <PdfJoinTool />,
    icon: faFilePdf
  },
  {
    key: 'textdiff',
    name: 'Text Diff',
    subtitle: ['Show the textual difference between two text documents.'],
    keyPoints: [
      { icon: faUserTie, title: 'Professional Editor', subtitle: 'Use the diff editor from VSCode' },
      { icon: faSmileWink, title: 'Free', subtitle: 'Now and always' },
    ],
    render: () => <TextDiffTool />,
    icon: faFileImport
  },
  {
    key: 'officemedia',
    name: 'MS Office Media Extraction',
    subtitle: ['Extract media files from office documents such as Word or Excel files'],
    keyPoints: [
      { icon: faFileWord, title: 'Works on modern office files', subtitle: 'Supports *.docx, *.xlsx, *.pptx'},
      { icon: faLock, title: 'Secure', subtitle: 'The files don\'t leave your systems and are nowhere stored' },
    ],
    render: () => <OfficeMediaExtractionTool />,
    icon: faFileWord
  },
  {
    key: 'colorpicker',
    name: 'Color Picker',
    subtitle: ['Find your color'],
    keyPoints: [],
    render: () => <ColorPickerTool />,
    icon: faEyeDropper
  }
] as Tool[];