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

import {AppBar, Divider, IconButton, Toolbar} from '@material-ui/core';
import {GitHub, Twitter} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';
import React from 'react';
import logo from './logo.png';
import GetInvolvedDialog from '../getinvolveddialog/GetInvolvedDialog';
import ConnectButton from '../connectbutton/ConnectButton';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    flexGrow: 1,
    color: '#ffffff',
  },
  menuButton: {
    marginRight: 8,
  },
  title: {
    flexGrow: 1,
  },
  footer: {
    borderTop: '1px solid #c7c7c7',
    padding: '50px',
    marginTop: '100px',
    color: '#c7c7c7',
    backgroundColor: '#15998D',
    fontSize: '.90em',
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.root}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <img src={logo} height="40" />
        </IconButton>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <GetInvolvedDialog />
          <IconButton href="https://www.twitter.com/safemoongame">
            <Twitter style={{color: '#ffffff'}} />
          </IconButton>
          <IconButton href="https://www.github.com/safemoongame">
            <GitHub style={{color: '#ffffff'}} />
          </IconButton>
          <Divider
            orientation="vertical"
            flexItem
            style={{backgroundColor: '#787878', marginLeft: 10}}
          />
          <ConnectButton />
        </div>
      </Toolbar>
      <Divider style={{backgroundColor: '#343434'}} />
    </AppBar>
  );
};

export default Header;
