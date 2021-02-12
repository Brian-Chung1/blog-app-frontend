import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import CssBaseline from '@material-ui/core/CssBaseline';

const LoginForm = () => {
  const [open, setOpen] = useState(false);
  return (
    <Modal open={open}>
      <Container component="main" maxWidth="xs"></Container>
    </Modal>
  );
};

export default LoginForm;
