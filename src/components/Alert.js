import React, { useEffect } from 'react';

import './Alert.css';

const Alert = (props) => {
  const { type, msg, removeAlert } = props;

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert(false, '', '');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [removeAlert]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
