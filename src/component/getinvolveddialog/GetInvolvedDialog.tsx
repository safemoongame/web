/*
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

import React from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& a': {
      color: '#ffffff',
    },
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    '& > li': {
      fontWeight: 'bold',
    },
  },
}));

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    list: {
      listStyle: 'none',
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const GetInvolvedDialog = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/*
      <Button onClick={handleClickOpen}>
        Join the team
      </Button>
      */}
      <Dialog
        className={classes.root}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Join the team
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            We are looking for talented individuals like you to join our growing
            team of creatives to build an exciting new game based on the
            SafeMoon craze. We are currently looking for expertise in the
            following areas:
          </Typography>
          <Typography gutterBottom>
            <ul className={classes.list}>
              <li>Graphic Artist</li>
              <li>Marketing</li>
              <li>Any other skill you this is helpful</li>
            </ul>
          </Typography>
          <Typography gutterBottom>
            If you are interested in joining the team, send us an email at{' '}
            <a href="mailto:safemoongame@gmail.com">safemoongame@gmail.com</a>{' '}
            with the position you're interested in and we'll let you know what
            you can do to help. Thanks!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GetInvolvedDialog;
