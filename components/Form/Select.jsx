import React, { Component } from 'react';
import { Form, Select } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;
export default class App extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    mode: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
    maxLength: PropTypes.number,
    defaultValue: PropTypes.any,
    showArrow: PropTypes.bool,
    showLabel: PropTypes.bool,
    hasFeedback: PropTypes.bool,
    pattern: PropTypes.object,
    formItemLayout: PropTypes.object,
    options: PropTypes.array,
    rules: PropTypes.array,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    // name: null,
    // form: null,
    label: '',
    maxLength: 200,
    type: 'text',
    mode: '',
    className: '',
    placeholder: '请选择',
    formItemLayout: null,
    defaultValue: undefined,
    showArrow: true,
    pattern: null,
    required: true,
    showLabel: true,
    hasFeedback: true,
    options: [],
    rules: [],
    disabled: false,
    onChange: () => {},
  };

  // componentDidMount() {
  //   const { defaultValue, form, name } = this.props;
  //   const obj = {};
  //   if (undefined !== defaultValue && name) {
  //     obj[name] = defaultValue.toString();
  //     form.setFieldsValue(obj);
  //   }
  // }

  render() {
    const {
      required,
      form,
      name = '',
      label,
      mode,
      formItemLayout,
      hasFeedback,
      showArrow,
      className,
      style,
      options,
      placeholder,
      showLabel,
      rules,
      setRef,
      disabled,
      defaultValue,
      onChange,
      showPleaseSelect = true,
      ...restProps
    } = this.props;
    const option = options.map(d => (
      <Option value={d.value} key={d.key || d.value}>
        {d.text}
      </Option>
    ));
    if (!form) {
      return <>控件缺少form属性</>;
    }
    if (!name) {
      return <>控件缺少name属性</>;
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
          rules: rules.length ? rules : [{ required, message: `${placeholder}${label}` }],
        })(
          <Select
            mode={mode}
            ref={setRef}
            placeholder={placeholder}
            style={style}
            defaultActiveFirstOption={false}
            showArrow={showArrow}
            filterOption={false}
            onChange={onChange}
            notFoundContent={null}
            disabled={disabled}
            {...restProps}
          >
            {!showPleaseSelect ? null : <Option value={null}>请选择</Option>}
            {option}
          </Select>,
        )}
      </Form.Item>
    );
  }
}
