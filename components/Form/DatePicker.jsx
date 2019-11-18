import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker, MonthPicker, WeekPicker } = DatePicker;

export const format = 'YYYY-MM-DD HH:mm:ss';
export const getDateTimeString = (str, formatStr = format) =>
  str ? moment(str).format(formatStr) : str;
export const getDateString = (str, formatStr = 'YYYY-MM-DD') =>
  str ? moment(str).format(formatStr) : str;

export default class App extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    defaultValue: PropTypes.any,
    dateFormat: PropTypes.string,
    label: PropTypes.string,
    formItemLayout: PropTypes.object,
    hasFeedback: PropTypes.bool,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    showLabel: PropTypes.bool,
    className: PropTypes.string,
    showTime: PropTypes.bool,
    rules: PropTypes.array,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    required: true,
    defaultValue: undefined,
    dateFormat: format,
    type: 'DatePicker',
    label: '时间',
    formItemLayout: {},
    hasFeedback: true,
    style: {},
    placeholder: '请选择',
    showLabel: true,
    className: '',
    showTime: true,
    rules: [],
    disabled: false,
    onChange: () => {},
  };

  componentDidMount() {
    // const { defaultValue, form, name, dateFormat } = this.props;
    // const obj = {};
    // if (defaultValue && name) {
    //   obj[name] = moment(defaultValue, dateFormat);
    //   form.setFieldsValue(obj);
    // }
  }

  render() {
    const {
      required,
      form,
      defaultValue,
      dateFormat,
      type,
      name,
      label,
      formItemLayout,
      hasFeedback,
      className,
      style,
      placeholder,
      onChange,
      showLabel,
      showTime,
      rules,
      setRef,
      disabled,
      ...resProps
    } = this.props;
    if (!form) {
      return <>控件缺少form属性</>;
    }
    if (!name) {
      return <>控件缺少name属性</>;
    }

    const dateProps = {
      ...resProps,
      onChange,
      showTime,
      disabled,
      ref: setRef,
      format: dateFormat,
      placeholder: type !== 'RangePicker' ? placeholder + label : ['开始日期', '结束日期'],
      onFocus: () => {
        try {
          const calendar = document.querySelectorAll('.ant-calendar-input');
          // 兼容多个日期选择框禁用
          calendar.forEach(ele => {
            ele.readOnly = true;
          });
        } catch (error) {
          // error
        }
      },
    };
    let dateComponent;
    let initialValue = null;
    switch (type) {
      case 'DatePicker':
        dateComponent = <DatePicker {...dateProps} />;
        initialValue = defaultValue ? moment(defaultValue) : null;
        break;
      case 'RangePicker':
        dateComponent = <RangePicker style={{ width: '100%' }} {...dateProps} />;
        initialValue = defaultValue ? [moment(defaultValue[0]), moment(defaultValue[1])] : [];
        break;
      case 'MonthPicker':
        dateComponent = <MonthPicker {...dateProps} />;
        initialValue = defaultValue ? moment(defaultValue) : null;
        break;
      case 'WeekPicker':
        dateComponent = <WeekPicker {...dateProps} />;
        initialValue = defaultValue ? moment(defaultValue) : null;
        break;
      default:
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
          initialValue,
          rules: rules.length ? rules : [{ required, message: `${placeholder}${label}` }],
        })(dateComponent)}
      </Form.Item>
    );
  }
}
