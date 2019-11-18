import { message } from 'antd';

const duration = 3;
// 临时保存，避免同一个消息多次弹出
window.ANTD_MESSAGE = window.ANTD_MESSAGE || {};

export const success = (msg, options = {}) => {
  const ops = Object.assign({ id: null, duration, onClose: () => {} }, options);

  if (ops.id) {
    if (window.ANTD_MESSAGE[ops.id]) {
      return;
    }
    window.ANTD_MESSAGE[ops.id] = ops.id;
  }

  message.success(msg, ops.duration, () => {
    if (ops.id) {
      delete window.ANTD_MESSAGE[ops.id];
    }
    ops.onClose();
  });
};
export const warning = (msg, options = {}) => {
  const ops = Object.assign({ id: null, duration, onClose: () => {} }, options);

  if (ops.id) {
    if (window.ANTD_MESSAGE[ops.id]) {
      return;
    }
    window.ANTD_MESSAGE[ops.id] = ops.id;
  }

  message.warning(msg, ops.duration, () => {
    if (ops.id) {
      delete window.ANTD_MESSAGE[ops.id];
    }
    ops.onClose();
  });
};
export const error = (msg, options = {}) => {
  const ops = Object.assign({ id: null, duration, onClose: () => {} }, options);

  if (ops.id) {
    if (window.ANTD_MESSAGE[ops.id]) {
      return;
    }
    window.ANTD_MESSAGE[ops.id] = ops.id;
  }

  message.error(msg, ops.duration, () => {
    if (ops.id) {
      delete window.ANTD_MESSAGE[ops.id];
    }
    ops.onClose();
  });
};
