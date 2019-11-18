/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Form, InputNumber, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import styles from './InputNumberRange.less';

// const defaultLayout = {};
class InputNumberRange extends Component {
  static propTypes = {
    name: PropTypes.array,
    placeholder: PropTypes.array,
    minRange: PropTypes.array,
    maxRange: PropTypes.array,
    label: PropTypes.string,
  };

  static defaultProps = {
    name: ['input-range-min', 'input-range-max'],
    label: '',
    placeholder: ['开始', '结束'],
    minRange: [0, 100],
    maxRange: [0, 100],
  };

  constructor(props) {
    super(props);
    this.state = { innterMaxMinValue: 0 };
  }

  onChange(ev) {
    this.setState({ innterMaxMinValue: ev });
  }

  render() {
    const { form, label, name, placeholder, minRange, maxRange, formItemLayout } = this.props;
    const { getFieldDecorator } = form;
    const { innterMaxMinValue } = this.state;
    return (
      <Row>
        <Col span={6} className={styles.labelBox}>
          <label id={label} htmlFor={label} title={label}>
            {label}:
          </label>
        </Col>
        <Col span={18}>
          <Row>
            <Col span={10}>
              <Form.Item formItemLayout={formItemLayout}>
                {getFieldDecorator(name[0], {})(
                  <InputNumber
                    min={minRange[0]}
                    max={minRange[1]}
                    placeholder={placeholder[0]}
                    onChange={ev => {
                      this.onChange(ev);
                    }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={4}>~</Col>
            <Col span={10}>
              <Form.Item formItemLayout={formItemLayout}>
                {getFieldDecorator(name[1], {})(
                  <InputNumber
                    min={Math.max(maxRange[0], innterMaxMinValue)}
                    max={maxRange[1]}
                    placeholder={placeholder[1]}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
export default InputNumberRange;
