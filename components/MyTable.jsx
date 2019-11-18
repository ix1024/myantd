import React, { memo } from 'react';
import { Table, Spin } from 'antd';
import lodash from 'lodash';
import { paginationInitData } from './MyPagination';
import styles from './MyTable.less';

/**
 * @name 表格封装，统一交互效果，统一默认值
 * @author hz15041151
 * @date 2019-08-02
 * @example 用法与默认的一样，只是组件名不一样
 * @控制pagination 的loading属性实现交互效果
 */

export const MyTable = memo(props => {
  let initProps = lodash.merge(
    {
      pagination: {
        ...paginationInitData,
      },
    },
    props,
  );
  if (initProps.pagination.loading === true) {
    initProps.pagination.disabled = true;
  } else if (initProps.pagination.loading === false) {
    initProps.pagination.disabled = false;
  }
  initProps = lodash.cloneDeep(initProps);
  const { loading } = initProps.pagination;
  return (
    <div className={styles.myTable}>
      <Table {...initProps} />
      {loading ? (
        <div className={styles.loadingBox}>
          <Spin spinning={loading} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
});

export default MyTable;
