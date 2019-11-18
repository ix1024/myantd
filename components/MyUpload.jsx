import React, { memo } from 'react';
import { Upload, message } from 'antd';

const MyUpload = memo(props => {
  const { name = 'file', onChange = () => {}, children } = props;
  const initProps = {
    name,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // eslint-disable-next-line no-console
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      onChange(info);
    },
  };

  return <Upload {...initProps}>{children}</Upload>;
});

export default MyUpload;
