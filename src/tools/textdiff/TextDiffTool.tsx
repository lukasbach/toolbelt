import * as React from 'react';
import { ToolContainer } from '../../smoothui/ToolContainer';
import MonacoEditor, { MonacoDiffEditor } from 'react-monaco-editor';
import cxs from 'cxs';
import { px } from '../../smoothui/common';
import { BottomContent } from '../../smoothui/BottomContent';
import { Button } from '../../smoothui/Button';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AlignedButtons } from '../../smoothui/AlignedButtons';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as monacoEditor from 'monaco-editor';

export const TextDiffTool: React.FC<{}> = props => {
  const [leftCode, setLeftCode] = useState('');
  const [rightCode, setRightCode] = useState('');
  const [done, setDone] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [inline, setInline] = useState(false);
  const monacoLeftEditorRef = useRef<any>();
  const monacoRightEditorRef = useRef<any>();
  const monacoDiffRef = useRef<any>();
  const monacoDiffEditorRef = useRef<monacoEditor.editor.IStandaloneDiffEditor>();

  useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight);
      monacoRightEditorRef.current?.layout();
      monacoLeftEditorRef.current?.layout();
      monacoDiffEditorRef.current?.layout();
    })
  }, []);

  return (
    <ToolContainer
      theme={{ color: '#DE4F3C', background: ['rgb(43,33,31)', 'rgb(84,45,51)'] }}
      toolKey="textdiff"
      showTitle={!done}
      showHeader={true}
    >
      {
        !done ? (
          <div className={cxs({
            display: 'flex',
            '> div': {
              margin: px(8),
            }
          })}>
            <MonacoEditor
              width={'100%'}
              height={windowHeight - 550}
              theme="vs-dark"
              value={leftCode}
              onChange={setLeftCode}
              editorDidMount={e => monacoLeftEditorRef.current = e}
            />
            <MonacoEditor
              width={'100%'}
              height={windowHeight - 550}
              theme="vs-dark"
              value={rightCode}
              onChange={setRightCode}
              editorDidMount={e => monacoRightEditorRef.current = e}
            />
          </div>
        ) : (
          <MonacoDiffEditor
            original={leftCode}
            value={rightCode}
            width="100%"
            height={windowHeight - 250}
            editorDidMount={e => monacoDiffEditorRef.current = e}
            options={{
              renderSideBySide: !inline
            }}
            // editorDidMount={(editor, monaco) => {
            //   let height = Math.max(
            //     editor.getModifiedEditor().getContentHeight(),
            //     editor.getOriginalEditor().getContentHeight()
            //   );
            //   editor.getDomNode().style.height = `${height}px`;
            //   editor.layout();
            // }}
            ref={monacoDiffRef}
          />
        )
      }
      <AlignedButtons
        left={done && (
          <>
            <Button icon={faChevronLeft} onClick={() => {
              setLeftCode('');
              setRightCode('');
              setDone(false);
            }} big>
              Start over
            </Button>

            <Button onClick={() => setInline(i => !i)}>
              { inline ? 'Use side-by-side editor' : 'Use inline editor' }
            </Button>
          </>
        )}
        right={!done && (
          <Button icon={faChevronRight} onClick={() => setDone(true)} big>
            Show difference
          </Button>
        )}
      />
    </ToolContainer>
  );
};
