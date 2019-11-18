/**
 * @name 卡片封装，加入骨架图
 * @author hz16042180
 * @date 2019-07-26
 * @param className {string} 类
 * @param style {object} 自定义样式
 * @param loading {boolean} 是否显示骨架图loading
 * @param title {string|element} 标题
 * @param extra {string|element} 右侧栏
 * @param children {any} 卡片内容
 * @example
 *   import { MyCard } from '@/components/MyAntd';
 *   <MyCard title={title} loading={loading}>
 *     <div>content</div>
 *   </MyCard>
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Card, Skeleton } from 'antd';

const MyCard = memo(props => {
  const { title, extra, loading, className, style, children } = props;

  return (
    <Card title={title} extra={extra} className={className} style={style}>
      <Skeleton loading={loading} active>
        {children}
      </Skeleton>
    </Card>
  );
});
MyCard.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.bool,
  title: PropTypes.any,
  extra: PropTypes.any,
  children: PropTypes.any,
};
MyCard.defaultProps = {
  className: '',
  style: {},
  loading: true,
  title: '',
  extra: '',
  children: <></>,
};

export default MyCard;
