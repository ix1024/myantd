import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    message: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
    maxLength: PropTypes.number,
    transform: PropTypes.func,
    defaultValue: PropTypes.any,
    showLabel: PropTypes.bool,
    hasFeedback: PropTypes.bool,
    pattern: PropTypes.object,
    formItemLayout: PropTypes.object,
    rules: PropTypes.array,
    suffix: PropTypes.any,
  };

  static defaultProps = {
    // name: null,
    // form: null,
    label: '',
    maxLength: 225,
    type: 'text',
    message: '',
    className: '',
    placeholder: '请输入',
    formItemLayout: null,
    defaultValue: undefined,
    pattern: null,
    transform: item => (item ? item.trim() : item),
    required: true,
    showLabel: true,
    hasFeedback: true,
    rules: [],
    suffix: '',
  };

  render() {
    const {
      required,
      pattern,
      form,
      name,
      label,
      message,
      formItemLayout,
      hasFeedback,
      style,
      placeholder,
      showLabel,
      maxLength,
      className,
      transform,
      rules,
      suffix,
      defaultValue,
      max,
      ...resProps
    } = this.props;
    const params = {};
    if (!form) {
      return <>控件缺少form属性</>;
    }
    if (!name) {
      return <>控件缺少name属性</>;
    }
    if (maxLength !== 0) {
      params.maxLength = maxLength;
    }
    return (
      <Form.Item
        label={showLabel ? label : ''}
        {...formItemLayout}
        hasFeedback={hasFeedback}
        style={style}
        className={className}
      >
        {form.getFieldDecorator(name, {
          initialValue: defaultValue,
          rules: rules.length
            ? rules
            : [
                { max, message: `限制输入 ${max} 个字` },
                { transform, required, pattern, message: message || `${placeholder}${label}` },
              ],
        })(<TextArea placeholder={placeholder + label} style={style} {...params} {...resProps} />)}
        {suffix}
      </Form.Item>
    );
  }
}
