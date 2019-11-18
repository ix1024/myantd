/**
 * @name 弹出框组件
 * @author hz15041151
 * @date 2019-07-26
 * @param visible {boolean} 是否显示
 * @param title {any} 标题
 * @param width {number} 宽度
 * @param okText {string} 确定按钮文案
 * @param cancelText {string} 取消按钮文案
 * @param children {any} 弹出框内容
 * @param onOk {function} 确认事件
 * @param onCancel {function} 取消事件
 * @example
 *   import { MyModal } from '@/components/MyAntd';
 *   <MyModal title={title} visible={visible} onOk={handleOk}>
 *     <div>content</div>
 *   </MyModal>
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

class MyModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.any,
    width: PropTypes.number,
    children: PropTypes.any,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    title: '',
    width: 500,
    okText: '确定',
    cancelText: '取消',
    children: <></>,
    onOk: () => Promise.resolve(),
    onCancel: () => {},
  };

  constructor(props) {
    super(props);
    const { _this, name } = props;
    if (!_this) {
      // eslint-disable-next-line no-console
      console.error('缺少父级APP，请通过 _this传入');
    }
    if (!name) {
      // eslint-disable-next-line no-console
      console.error('缺少Model的name，请通过name传入，name即为Model显示隐藏的变量名');
    }
    this.state = {
      // visible: props.visible, // 显示隐藏只能通过外部控制
      confirmLoading: false,
    };
  }

  // 点击确定按钮
  handleOk = () => {
    const { onOk, _this, name } = this.props;
    const obj = {};
    obj[name] = false;

    this.setState({
      confirmLoading: true,
    });
    onOk()
      .then(() => {
        _this.setState(obj);
        this.setState({
          // visible: false,
          confirmLoading: false,
        });
      })
      .catch(() => {
        // _this.setState(obj);
        this.setState({
          confirmLoading: false,
        });
      });
  };

  // 取消
  handleCancel = () => {
    const { onCancel, _this, name } = this.props;
    const obj = {};
    obj[name] = false;
    _this.setState(obj);
    this.setState({
      // visible: false,
      confirmLoading: false,
    });
    onCancel();
  };

  render() {
    const {
      confirmLoading,
      // visible
    } = this.state;
    const { title, width, children, okText, cancelText } = this.props;
    return (
      <Modal
        visible={this.props.visible}
        width={width}
        title={title}
        okText={okText}
        cancelText={cancelText}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={confirmLoading}
      >
        {children}
      </Modal>
    );
  }
}

export default MyModal;
