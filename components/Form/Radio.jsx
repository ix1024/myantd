import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'antd';

export default class App extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
    defaultValue: PropTypes.any,
    showLabel: PropTypes.bool,
    hasFeedback: PropTypes.bool,
    options: PropTypes.array,
    formItemLayout: PropTypes.object,
    rules: PropTypes.array,
    style: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    required: true,
    label: '',
    formItemLayout: {},
    hasFeedback: true,
    defaultValue: undefined,
    className: '',
    style: {},
    options: [],
    placeholder: '请选择',
    showLabel: true,
    rules: [],
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = { value: props.defaultValue };
  }

  componentDidMount() {
    const { defaultValue, form, name } = this.props;
    const obj = {};
    if (undefined !== defaultValue && name) {
      // obj[name] = defaultValue.toString();
      obj[name] = defaultValue;
      form.setFieldsValue(obj);
    }

    this.setState({ value: defaultValue });
  }

  onChange = e => {
    const { onChange } = this.props;
    const { value } = e.target;
    this.setState({
      value,
    });
    const obj = {};
    obj[this.props.name] = value;
    this.props.form.setFieldsValue(obj);
    onChange(value);
  };

  render() {
    const {
      required,
      form,
      name,
      label,
      formItemLayout,
      hasFeedback,
      className,
      style,
      options,
      placeholder,
      showLabel,
      rules,
      defaultValue,
      type = '',
    } = this.props;

    const option = options.map(d =>
      type !== 'button' ? (
        <>
          <Radio key={d.value} value={d.value}>
            {d.text}
          </Radio>
        </>
      ) : (
        <>
          <Radio.Button key={d.value} value={d.value}>
            {d.text}
          </Radio.Button>
        </>
      ),
    );
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
          <>
            <Radio.Group value={this.state.value} onChange={this.onChange}>
              {option}
            </Radio.Group>
            <span style={{ width: '30px', display: 'inline-block' }}></span>
          </>,
        )}
      </Form.Item>
    );
  }
}
