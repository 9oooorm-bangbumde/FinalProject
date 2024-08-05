import axiosInstance from '../../api/axiosInstance';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React from 'react';
import { EditorWrapper } from './Style';

class UploadAdapter {
  private loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file: File) => new Promise((resolve, reject) => {
      const fd = new FormData();
      fd.append('upload', file);
      axiosInstance.post('/s3/ck/upload', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          resolve({ default: response.data.url });  
        })
        .catch(error => {
          reject('Server Error');
          console.error('Server Error:', error);
        });
    }));
  }

  abort() {
    console.log('Upload aborted');
  }
}

interface Props {
  defaultValue: string;
  onChange: (data: string) => void;
  toolbar?: string[];
}

class TextEditor extends React.Component<Props> {
  render() {
    function MyCustomUploadAdapterPlugin(editor: any) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new UploadAdapter(loader);
      };
    }

    const editorConfig = {
      extraPlugins: [MyCustomUploadAdapterPlugin],
      toolbar: this.props.toolbar || [
        'undo', 'redo', '|',
        'imageUpload', 'imageStyle:full', 'imageStyle:side', '|',
        'heading', '|',
        'bold', 'italic', 'link', '|',
        'bulletedList', 'numberedList', 'insertTable',
      ],
      image: {
        toolbar: [
          'imageTextAlternative', 'imageStyle:full', 'imageStyle:side',
        ],
      },
    };

    return (
      <EditorWrapper>
        <CKEditor
          editor={ClassicEditor}
          data={this.props.defaultValue}
          config={editorConfig}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.props.onChange(data);
          }}
        />
      </EditorWrapper>
    );
  }
}

export default TextEditor;
