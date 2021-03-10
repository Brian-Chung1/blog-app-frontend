import { Button } from '@material-ui/core';
import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

export const NotificationTest = () => {
  const { dispatchNotification } = useNotification();

  const addNotification = () => {
    dispatchNotification({
      type: 'ADD',
      data: {
        open: true,
        severity: 'success',
        message: 'Testing my Notification Component',
      },
    });
  };

  return (
    <div>
      <Button onClick={addNotification}>Press for Notification</Button>
    </div>
  );
};

export default NotificationTest;
