import React, { memo } from 'react';
import Select from './Select';

export const Status = memo(props => {
  if (undefined === props.name) {
    return <>缺少Name属性</>;
  }
  return (
    <Select
      {...props}
      label="状态"
      options={[{ text: '关闭', value: 'CLOSE' }, { text: '活跃高', value: 'ACTIVE' }]}
    />
  );
});

export default Status;
