/**
 * @name 页面面包屑功能
 * @author hz16042180
 * @date 2019-07-31
 * @param data {array} 面包屑数据，没有path值时，展示为文本
 * 数据结构：[{ name: '一级', path: '/xx/xx' }, { name: '二级', path: '/xx/xx' }, { name: '当前' }]
 * @param style {object} 自定义样式
 * @example
 *   import { MyBreadcrumb } from '@/components/MyAntd';
 *   const data = [
 *     { name: '一级', path: '/xx/xx' },
 *     { name: '当前' },
 *   ];
 *   <MyBreadcrumb data={data} />
 */

import React, { memo } from 'react';
import Link from 'umi/link';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';

const MyBreadcrumb = memo(props => {
  const { data, style } = props;
  const breadcrumbItem = data.map((item, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <Breadcrumb.Item key={index}>
      {item.path ? <Link to={item.path}>{item.name}</Link> : <span>{item.name}</span>}
    </Breadcrumb.Item>
  ));
  return <Breadcrumb style={{ marginBottom: '20px', ...style }}>{breadcrumbItem}</Breadcrumb>;
});
MyBreadcrumb.propTypes = {
  data: PropTypes.array,
  style: PropTypes.object,
};
MyBreadcrumb.defaultProps = {
  data: [],
  style: {},
};

export default MyBreadcrumb;
