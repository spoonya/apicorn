'use client';

import React from 'react';

import { Editor as MonacoEditor } from '@monaco-editor/react';

import type * as monaco from 'monaco-editor';

interface ResponseBodyTabProps {
  responseBody: string;
  language: string;
}

export const ResponseBodyTab = ({
  responseBody,
  language,
}: Readonly<ResponseBodyTabProps>) => {
  const [editorInstance, setEditorInstance] =
    React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  const formatDocument = React.useCallback(async () => {
    if (editorInstance && responseBody) {
      const formatAction = editorInstance.getAction(
        'editor.action.formatDocument'
      );
      if (formatAction) {
        try {
          const wasReadOnly = editorInstance.getRawOptions().readOnly;
          editorInstance.updateOptions({ readOnly: false });
          await formatAction.run();
          editorInstance.updateOptions({ readOnly: wasReadOnly });
        } catch (error) {
          console.error('Formatting error:', error);
        }
      }
    }
  }, [editorInstance, responseBody]);

  React.useEffect(() => {
    if (editorInstance && responseBody) {
      editorInstance.setValue(responseBody);
      formatDocument();
    }
  }, [editorInstance, formatDocument, responseBody]);

  return (
    <div className="flex flex-col gap-3 rounded-medium bg-content1 shadow-sm overflow-hidden h-full">
      <MonacoEditor
        className="pr-5 pt-5 pb-5"
        onMount={(editor) => setEditorInstance(editor)}
        height="100%"
        width="100%"
        language={language}
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          readOnly: true,
          tabSize: 2,
          insertSpaces: true,
          fontFamily: 'JetBrains Mono',
          wordWrap: 'wordWrapColumn',
          scrollBeyondLastLine: false,
          wordBasedSuggestions: 'off',
        }}
      />
    </div>
  );
};
