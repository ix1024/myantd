import React, { memo } from 'react';
import { Tooltip, Statistic } from 'antd';
import styles from './MyInfo.less';

export const MyInfo = memo(
  ({ title, value, bordered, tips = '点击数字查看', onClick = () => {} }) => (
    <Tooltip placement="top" title={`${tips}${title}`}>
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <div onClick={onClick}>
          <Statistic className={styles.link} value={value} valueStyle={{ color: '#cf1322' }} />
        </div>
        {bordered && <em />}
      </div>
    </Tooltip>
  ),
);
export default MyInfo;
