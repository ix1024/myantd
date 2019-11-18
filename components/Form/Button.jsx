/**
 * @name 提交按钮Loading
 * @author hz15041151
 * @date 2019-07-26
 * @param type {string} 按钮类型
 * @param icon {any} 按钮图标
 * @param size {string} 按钮大小
 * @param style {object} 按钮样式
 * @param children {any} 按钮内容
 * @param onClick {function} 提交事件
 * @example
 *   import { SubmitButton } from '@/components/MyAntd';
 *   <SubmitButton onClick={handleSubmit}>按钮哦</SubmitButton>
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

export class SubmitButton extends Component {
  static propTypes = {
    type: PropTypes.string,
    icon: PropTypes.any,
    size: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.any,
  };

  static defaultProps = {
    type: 'default',
    icon: null,
    size: 'default',
    style: {},
    className: '',
    children: <></>,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  // 点击事件
  handleClick = () => {
    const { onClick } = this.props;
    this.setState({ loading: true });

    onClick()
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { loading } = this.state;
    const { icon, style, className, size, type, children, onClick, ...rest } = this.props;
    return (
      <Button
        type={type}
        icon={icon}
        size={size}
        style={style}
        className={className}
        loading={loading}
        onClick={() => {
          const clickResult = onClick && onClick();
          if (clickResult && clickResult.then) {
            this.setState({ loading: true });
            clickResult
              .then(() => {
                this.setState({ loading: false });
              })
              .catch(() => {
                this.setState({ loading: false });
              });
          } else if (onClick) {
            // eslint-disable-next-line no-console
            console.error('应该返回一个Promise对象');
          }
        }}
        {...rest}
      >
        {children}
      </Button>
    );
  }
}

export default SubmitButton;
