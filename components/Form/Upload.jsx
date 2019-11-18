import React, { Component } from 'react';
import { Form, Upload, Button, Icon } from 'antd';
import PropTypes from 'prop-types';

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
    showLabel: PropTypes.bool,
    hasFeedback: PropTypes.bool,
    defaultValue: PropTypes.array,
    formItemLayout: PropTypes.object,
    rules: PropTypes.array,
    fileList: PropTypes.array,
    isMore: PropTypes.bool,
    onChange: PropTypes.func,
    action: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    type: 'text',
    message: '',
    className: '',
    placeholder: '请选择',
    formItemLayout: null,
    defaultValue: [],
    required: true,
    showLabel: true,
    hasFeedback: true,
    rules: [],
    fileList: [],
    isMore: true, // 是否可以多个文件
    onChange: () => {},
    action: file => `/api/file/upload?fileName=${file.name}`,
  };

  componentDidMount() {}

  normFile = e => {
    const { isMore } = this.props;
    if (Array.isArray(e)) {
      return e;
    }

    if (e && e.fileList && e.fileList.length) {
      if (isMore) {
        return e.fileList;
      }
      return [e.fileList[e.fileList.length - 1]];
    }
    return false;
  };

  // 上传所需参数
  // handleUploadData = file => {
  //   return { fileName: file.name };
  // };

  render() {
    const {
      required,
      form,
      name,
      label,
      message,
      formItemLayout,
      hasFeedback,
      defaultValue,
      style,
      placeholder,
      showLabel,
      className,
      action,
      rules,
      fileList,
      ...resProps
    } = this.props;
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
        required={required}
        className={className}
      >
        {form.getFieldDecorator(name, {
          initialValue: defaultValue,
          valuePropName: 'fileList',
          getValueFromEvent: this.normFile,
          rules: rules.length
            ? rules
            : [{ required, message: message || `${placeholder}${label}` }],
        })(
          <Upload
            style={style}
            placeholder={placeholder + label}
            action={action}
            // data={this.handleUploadData}
            {...resProps}
          >
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>,
        )}
      </Form.Item>
    );
  }
}
