import React, { Component } from 'react';
import { Modal } from 'antd';

const { confirm } = Modal;

export default class extends Component {
  showConfirm = () => {
    const { title, content, onDeleteOk } = this.props;
    confirm({
      title: `确认删除该${title}吗?`,
      content: content || '',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        onDeleteOk();
      },
    });
  };

  render() {
    return <a onClick={this.showConfirm}>删除</a>;
  }
}
