import React, { memo, Component } from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';

const InputGroup = Input.Group;

class NewsInputGroup extends Component {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  static propTypes = {
    placeholder: PropTypes.array,
  };

  static defaultProps = {
    placeholder: ['最少', '最多'],
  };

  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      minValue: value.minValue || '',
      maxValue: value.maxValue || '',
    };
  }

  minValueChange = e => {
    const { value } = e.target;
    if (!('value' in this.props)) {
      this.setState({ minValue: value });
    }
    this.triggerChange({ minValue: value });
  };

  maxValueChange = e => {
    const { value } = e.target;
    if (!('value' in this.props)) {
      this.setState({ maxValue: value });
    }
    this.triggerChange({ maxValue: value });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue,
      });
    }
  };

  render() {
    const { minValue, maxValue } = this.state;
    const { placeholder } = this.props;
    return (
      <InputGroup compact style={{ display: 'inline-flex' }}>
        <Input
          style={{ flex: 1 }}
          placeholder={placeholder[0]}
          value={minValue}
          maxLength={2}
          onChange={this.minValueChange}
        />
        <Input
          style={{
            width: 30,
            borderLeft: 0,
            pointerEvents: 'none',
            backgroundColor: '#fff',
          }}
          maxLength={2}
          placeholder="~"
          disabled
        />
        <Input
          style={{ flex: 1, borderLeft: 0 }}
          placeholder={placeholder[1]}
          value={maxValue}
          onChange={this.maxValueChange}
        />
      </InputGroup>
    );
  }
}

export default memo(props => {
  const { getFieldDecorator } = props.form;
  const { formItemLayout, label, placeholder, name } = props;
  const defaultLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 9 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 15 },
    },
  };
  return (
    <Form.Item label={label} style={{ width: '100%' }} {...(formItemLayout || defaultLayout)}>
      {getFieldDecorator(name, {
        initialValue: {
          minValue: '',
          maxValue: '',
        },
      })(<NewsInputGroup placeholder={placeholder} />)}
    </Form.Item>
  );
});
