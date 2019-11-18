import React, { memo } from 'react';
import { Pagination } from 'antd';
import lodash from 'lodash';
import style from './MyPagination.less';
import { defaultPageSize } from '@/utils/const';

export const pageSize = 10;
/**
 * 所有分页 公共默认配置
 */
export const paginationInitData = {
  defaultPageSize,
  hideOnSinglePage: true,
  // showSizeChanger: true,
  showTotal: total => (
    <>
      总共 <span style={{ color: 'red' }}>{total}</span> 条
    </>
  ),
};

// 设置分页配置数据
export const getPaginationData = (data = {}, onChange = () => {}) => ({
  current: data.pageNo || 1,
  pageSize: data.pageSize || defaultPageSize,
  total: data.total || 0,
  showSizeChanger: true,
  showTotal: text => (
    <>
      总共 <span style={{ color: 'red' }}>{text}</span> 条
    </>
  ),
  onChange,
  onShowSizeChange: onChange,
});

const MyPagination = memo(props => {
  let initProps = Object.assign(paginationInitData, props);
  initProps = lodash.cloneDeep(initProps);
  return (
    <div className={style.box}>
      <Pagination {...initProps} />
    </div>
  );
});

export default MyPagination;
