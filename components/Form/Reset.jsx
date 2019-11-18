import React, { memo } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const ResetButton = memo(props => {
  const { form, onReset = () => {} } = props;
  return (
    <Button
      style={{ marginLeft: 10 }}
      onClick={() => {
        form.resetFields();
        onReset();
      }}
    >
      重置
    </Button>
  );
});

ResetButton.propTypes = {
  form: PropTypes.object.isRequired,
};
export default ResetButton;
