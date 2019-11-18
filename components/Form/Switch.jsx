import React, { memo } from 'react';
import { Form, Switch, Icon } from 'antd';

export default memo(props => {
  const {
    form,
    label,
    style,
    name,
    rules = [],
    required = false,
    message,
    formItemLayout,
    defaultValue,
    ...restProps
  } = props;
  if (!form) {
    return <>控件缺少form属性</>;
  }
  if (!name) {
    return <>控件缺少name属性</>;
  }
  const { getFieldDecorator } = form;
  return (
    <Form.Item label={label} style={style} {...formItemLayout}>
      {getFieldDecorator(name, {
        valuePropName: 'checked',
        initialValue: defaultValue,
        rules: rules.length ? rules : [{ required, message: message || `请切换${label}` }],
      })(
        <Switch
          checkedChildren={<Icon type="check" />}
          unCheckedChildren={<Icon type="close" />}
          {...restProps}
        />,
      )}
    </Form.Item>
  );
});
