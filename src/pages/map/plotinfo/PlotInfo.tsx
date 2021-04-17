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

import { Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { TILE_HEIGHT, TILE_WIDTH } from '../const';

export interface Plot {
  username: string;
  x?: number;
  y?: number;
  price?: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tooltip: {
      position: 'absolute',
      transform: 'translateX(calc(-50% + 10px)) translateY(calc(-100% - 5px))',
    },
    owner: {
      padding: 10,
      backgroundColor: '#ffffff',
      color: '#000000',
      borderRadius: '5px',
    },
    arrow: {
      margin: 'auto',
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderTop: '10px solid #ffffff',
    }
  }
));

export interface Plots {
  [key: string]: Plot;
}

interface PlotInfoProps {
  mapOffset: {x: number, y: number};
  currentTile: {row: number, col: number};
  plot: Plot;
}

const PlotInfo: React.FC<PlotInfoProps> = (props) => {

  const classes = useStyles();

  const {mapOffset, currentTile, plot} = props;

  return (
    <div
      className={classes.tooltip}
      style={{
        display: plot ? 'block' : 'none',
        top: currentTile.row * TILE_HEIGHT + mapOffset.y,
        left: currentTile.col * TILE_WIDTH + mapOffset.x,
      }}
    >
      <div className={classes.owner}>
        <Typography gutterBottom>
          Plot:{' '}
          <b>
            {plot?.x}, {plot?.y}
          </b>
        </Typography>
        <Typography gutterBottom>{plot?.username}</Typography>
        {plot?.price && (
          <Button variant="contained" color="secondary">
            Buy ({plot.price} $SFM)
          </Button>
        )}
      </div>
      <div className={classes.arrow}></div>
    </div>
  );
}

export default PlotInfo;
