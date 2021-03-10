import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

const Test = () => {
  const classes = useStyles();
  const [notification, setNotification] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  useEffect(() => {
    if (notification.length && !messageInfo) {
      setMessageInfo({ ...notification[0] });
      setNotification((prev) => prev.slice(1));
      setOpen(true);
    } else if (notification.length && messageInfo && open) {
      setOpen(false);
    }
  }, [notification, open, messageInfo]);

  const handleClick = (message, severity) => () => {
    setNotification((prev) => [
      ...prev,
      { message, severity, key: new Date().getTime() + Math.random() },
    ]);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <>
      <div>
        <Button onClick={handleClick('Success Message', 'success')}>
          Show Success Message
        </Button>
        <Button onClick={handleClick('Error Message', 'error')}>
          Show Error Message
        </Button>
        <Button onClick={handleClick('Info Message', 'info')}>
          Show Info Message
        </Button>
        <Button onClick={handleClick('Warning Message', 'warning')}>
          Show Warning Message
        </Button>
      </div>

      <div>
        <Snackbar
          key={messageInfo ? messageInfo.key : undefined}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          onExited={handleExited}
          message={messageInfo ? messageInfo.message : undefined}
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
              </Button>
              <IconButton
                aria-label="close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          }
        >
          {messageInfo ? (
            <Alert severity={messageInfo.severity}>{messageInfo.message}</Alert>
          ) : undefined}
        </Snackbar>
      </div>
    </>
  );
};

export default Test;
