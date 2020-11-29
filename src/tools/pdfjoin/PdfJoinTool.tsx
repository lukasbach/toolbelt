import * as React from 'react';
import { ToolContainer } from '../../smoothui/ToolContainer';
import { faChevronLeft, faChevronRight, faDownload, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { ExplicitDropZone } from '../../smoothui/ExplicitDropZone';
import { useState } from 'react';
import { TypedSortList } from '../../smoothui/SortList';
import { AlignedButtons } from '../../smoothui/AlignedButtons';
import { Button } from '../../smoothui/Button';
import { PDFAssembler } from "pdfassembler";
import { CompletedNote } from '../../smoothui/CompletedNote';
import * as FileSaver from "file-saver";

const SortList = TypedSortList<File>();

export const PdfJoinTool: React.FC<{}> = props => {
  const [merged, setMerged] = useState<any>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfFiles, setPdfFiles] = useState<File[]>([
    // For testing:
    // { name: 'some-file.pdf', lastModified: 123456, size: 56789 },
    // { name: 'joined.pdf', lastModified: 123456, size: 56789 },
    // { name: 'sklfdajsldfökajflaösdfjksöalfkjasödfasdf.pdf', lastModified: 123456, size: 56789 },
    // { name: 'yeppidy.pdf', lastModified: 123456, size: 56789 },
    // { name: 'helloworld.pdf', lastModified: 123456, size: 56789 },
  ] as any);

  const merge = async () => {
    setIsProcessing(true);
    let reader: FileReader;
    const files = [];

    for (const file of pdfFiles) {
      reader = new FileReader();
      reader.readAsArrayBuffer(file);
      await new Promise(resolve => reader.onload = resolve);
      files.push(reader.result);
    }

    const pdfs = files.map((file: any) => new PDFAssembler(file));
    const pages = [];

    for (const pdf of pdfs) {
      const structure = await pdf.getPDFStructure();
      pages.push(...structure['/Root']['/Pages']['/Kids']);
    }

    const newPdf: any = pdfs[0];
    const structure = await newPdf.getPDFStructure();
    structure['/Root']['/Pages']['/Kids'] = pages;
    newPdf
      .assemblePdf('merged.pdf')
      .then((pdfFile: any) => {
        setMerged(pdfFile);
        setIsProcessing(false);
      });
  }

  return (
    <ToolContainer
      // theme={{ color: '#DE4F3C', backgroundColor: 'white' }}
      theme={{ color: '#344ce6', background: ['rgba(35,31,41,1)', 'rgba(62,49,82,1)'] }}
      showHeader={true}
      showTitle={pdfFiles.length === 0}
      toolKey="pdfjoin"
    >
      {
        !merged && !isProcessing && pdfFiles.length > 0 && (
          <SortList
            entries={pdfFiles}
            canDelete={true}
            renderItem={item => ({
              id: item.name + item.lastModified,
              icon: faFilePdf,
              title: item.name,
              ctxTitle: new Date(item.lastModified).toLocaleString()
            })}
            onDeleteItem={item => setPdfFiles(pdfFiles.filter(file => (file.name + file.lastModified) !== (item.name + item.lastModified)))}
            onReorder={setPdfFiles}
          />
        )
      }
      {
        !merged && !isProcessing && (
          <ExplicitDropZone
            accept=".pdf"
            title={pdfFiles.length === 0 ? 'Drop some PDF files to start' : 'Drop some PDF files to add'}
            small={pdfFiles.length > 0}
            onDrop={files => setPdfFiles([...pdfFiles, ...files.sort((f1, f2) => f1.name.localeCompare(f2.name))])}
          />
        )
      }
      {
        !merged && !isProcessing &&pdfFiles.length > 0 && (
          <AlignedButtons>
            <Button big={true} rightIcon={faChevronRight} onClick={merge}>
              Merge files
            </Button>
          </AlignedButtons>
        )
      }
      {
        !merged && isProcessing && (
          <CompletedNote
            title="Merging files..."
            text="Your files are being merged..."
            primaryButton={null}
            redoButton={null}
          />
        )
      }
      {
        merged && !isProcessing && (
          <CompletedNote
            title="Your PDF files have been merged!"
            text="You can now download the merged file or start again with another set of PDF files."
            primaryButton={(
              <Button
                icon={faDownload}
                children="Download merged PDF"
                onClick={() => FileSaver.saveAs(merged, 'merged.pdf')}
                big
              />
            )}
            redoButton={(
              <Button
                icon={faChevronLeft}
                children="Start again"
                onClick={() => {
                  setPdfFiles([]);
                  setMerged(undefined);
                  setIsProcessing(false);
                }}
              />
            )}
          />
        )
      }
    </ToolContainer>
  );
};
