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

import {IconButton, Typography} from '@material-ui/core';
import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '10px',
    padding: '10px 20px',
  },
  button: {
    backgroundColor: '#ffffff33',
    '&:hover': {
      backgroundColor: '#ffffff77',
    },
  },
  selected: {
    backgroundColor: '#ffffff77',
  },
}));

const SidebarButton: React.FC<{
  label: string;
  to: string;
  selected?: boolean;
}> = props => {
  const classes = useStyles();
  const {label, selected, to, children} = props;

  return (
    <div className={`${classes.root} ${selected ? classes.selected : ''}`}>
      <IconButton className={classes.button} component={Link} to={to}>
        {children}
      </IconButton>
      <Typography
        style={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          marginTop: '5px',
        }}
      >
        {label}
      </Typography>
    </div>
  );
};

export default SidebarButton;
