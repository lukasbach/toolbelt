import * as React from 'react';
import { ToolContainer } from '../../smoothui/ToolContainer';
import { ExplicitDropZone } from '../../smoothui/ExplicitDropZone';
import { useState } from 'react';
import JSZip from 'jszip';
import cxs from 'cxs';
import { px } from '../../smoothui/common';


export const OfficeMediaExtractionTool: React.FC<{}> = props => {
  const [media, setMedia] = useState<Array<[string, Blob]>>([]);

  return (
    <ToolContainer
      theme={{ color: '#7ee634', background: ['rgb(31,53,9)', 'rgb(56,98,20)'] }}
      showHeader={true}
      showTitle={true}
      toolKey="officemedia"
    >

      {
        !media && (
          <ExplicitDropZone
            accept=".docx,.pptx,.xlsx"
            title={'Drop a MS Office file to start'}
            onDrop={files => {
              const file = files[0];
              if (!file || !file.name.endsWith('x')) {
                return alert('You have to use an file from Microsoft Office 2007 or later (docx, xlsx, pptx)');
              }
              setMedia([]);
              const zip = new JSZip();
              zip.loadAsync(file).then(value => {
                value.folder('word')?.folder('media')?.forEach((relativePath, fobj) => {
                  fobj.async('blob').then(content => setMedia(m => [...m, [fobj.name, content]]));
                });
                value.folder('ppt')?.folder('media')?.forEach((relativePath, fobj) => {
                  fobj.async('blob').then(content => setMedia(m => [...m, [fobj.name, content]]));
                });
                value.folder('xl')?.folder('media')?.forEach((relativePath, fobj) => {
                  fobj.async('blob').then(content => setMedia(m => [...m, [fobj.name, content]]));
                });
              })
            }}
          />
        )
      }

      <div className={cxs({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: px(32),
      })}>
        {
          media.map(([name, blob], i) => {
            if (name.endsWith('emf')) return null;

            const url = URL.createObjectURL(blob);

            return (
              <a href={url} download={name}>
                {
                  name.endsWith('svg') ? 'SVG File' : (
                    <img
                      key={i}
                      src={url}
                      className={cxs({
                        maxWidth: px(480),
                        borderRadius: px(8),
                        marginBottom: px(16),
                        transition: '.3s all ease',
                        ':hover': {
                          cursor: 'pointer',
                          transform: 'translateY(-4px)',
                        }
                      })}
                     alt=""/>
                  )
                }
              </a>
            );
          })
        }
      </div>
    </ToolContainer>
  );
};
