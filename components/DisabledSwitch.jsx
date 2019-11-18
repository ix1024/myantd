import React, { memo } from 'react';
import { Switch, Icon } from 'antd';

export const DisabledSwitch = memo(props => {
  const { defaultChecked = true, ...resProps } = props;
  return (
    <Switch
      checkedChildren={<Icon type="check" />}
      unCheckedChildren={<Icon type="close" />}
      defaultChecked={defaultChecked}
      {...resProps}
    />
  );
});

export default DisabledSwitch;
