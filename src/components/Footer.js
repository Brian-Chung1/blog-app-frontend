import React from 'react';
import { makeStyles, Container, Typography } from '@material-ui/core';
// import { GitHubIcon, LinkedInIcon, EmailIcon } from '@material-ui/icons';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles({
  testing: {
    border: '1px solid red',
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.testing}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Brian Chung
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          <GitHubIcon />
          <LinkedInIcon />
          <div>
            <EmailIcon />
            brian.chung.cs@gmail.com
          </div>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
