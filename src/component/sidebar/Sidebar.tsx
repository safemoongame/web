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

import {House, Info, Room} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';
import SidebarButton from './SidebarButton';
import React from 'react';
import {useLocation} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: '#18191F',
    padding: '10px',
  },
}));

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <SidebarButton label="Home" selected={location?.pathname === '/'} to="/">
        <House />
      </SidebarButton>
      <SidebarButton
        label="Map"
        selected={location?.pathname === '/map'}
        to="/map"
      >
        <Room />
      </SidebarButton>
      <SidebarButton
        label="About"
        selected={location?.pathname === '/about'}
        to="/about"
      >
        <Info />
      </SidebarButton>
    </div>
  );
};

export default Sidebar;
