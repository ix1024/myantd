import React, { memo } from 'react';
import { Modal } from 'antd';

const { confirm } = Modal;

const showConfirm = obj => {
  const { title } = obj;

  confirm({
    title: `不能删除该${title}！`,
    content: '该类别正在规则中被使用',
    okText: '确认',
    cancelText: '取消',
    okButtonProps: {
      disabled: true,
    },
  });
};

export default memo(props => (
  <a
    onClick={() => {
      showConfirm(props);
    }}
  >
    删除
  </a>
));
