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

import {Theme} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/styles';
import React from 'react';
import {TileTypes} from '../const';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    legend: {
      display: 'flex',
      alignItems: 'center',
      color: '#000000',
      backgroundColor: '#ffffff',
      borderRadius: 3,
      position: 'absolute',
      padding: 10,
      bottom: 10,
      left: 10,
    },
  })
);

const Legend: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.legend}>
      <div
        style={{
          width: 30,
          height: 30,
          backgroundColor: TileTypes.Available.color,
          border: '2px solid #4c4c4c',
        }}
      ></div>
      <div style={{marginLeft: 10}}>Available</div>
      <div
        style={{
          marginLeft: 20,
          width: 30,
          height: 30,
          backgroundColor: TileTypes.Unavailable.color,
          border: '2px solid #4c4c4c',
        }}
      ></div>
      <div style={{marginLeft: 10}}>Unavailable</div>
      <div
        style={{
          marginLeft: 20,
          width: 30,
          height: 30,
          backgroundColor: TileTypes.Premium.color,
          border: '2px solid #4c4c4c',
        }}
      ></div>
      <div style={{marginLeft: 10}}>Premium</div>
    </div>
  );
};

export default Legend;
