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

import {Snackbar, Theme} from '@material-ui/core';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {createStyles, makeStyles} from '@material-ui/styles';
import React, {useRef, useState, useEffect} from 'react';
import MiniMap from './minimap/MiniMap';
import Legend from './legend/Legend';
import Tiles from './tiles/Tiles';
import PlotInfo, { Plot } from './plotinfo/PlotInfo';

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
  })
);

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Map: React.FC = () => {
  const classes = useStyles();

  const parentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [plot, setPlot] = useState<Plot>();

  const [currentTile, setCurrentTile] = useState<{row: number, col: number}>({row: -1, col: -1});
  const [mapOffset, setMapOffset] = useState<{x: number, y: number}>({x: -1, y: -1});
  const [dimensions, setDimensions] = useState<{width: number, height: number}>();

  const updateDimensions = () => {
    if (parentRef.current) {
      setDimensions({
        width: parentRef.current.offsetWidth,
        height: parentRef.current.offsetHeight}
      );
    }
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [parentRef]);

  const onMiniMapClick = (x: number, y: number): void => {
    if (parentRef.current) {
      const viewportX = x * 10;
      const viewportY = y * 10;

      const halfWidth: number = parentRef.current.offsetWidth / 2;
      const halfHeight: number = parentRef.current.offsetHeight / 2;

      setMapOffset({
        x: -(viewportX - halfWidth),
        y: -(viewportY - halfHeight),
      });
    }
  };

  const onSelectTile = (tileX: number, tileY: number) => {
    setCurrentTile({
      col: tileX,
      row: tileY,
    });
    setPlot({
      username: 'unowned',
      x: tileX,
      y: tileY,
      price: 10000000
    });
  }

  const onMoveMap = (x: number, y: number) => {
    setMapOffset({
      x: x,
      y: y,
    });
  }

  return (
    <>
      <div ref={parentRef} className={classes.root}>
        <Tiles
          width={dimensions?.width}
          height={dimensions?.height}
          onSelect={(tileX: number, tileY: number) => onSelectTile(tileX, tileY)}
          onMove={(x: number, y: number) => onMoveMap(x, y)}
          mapOffset={mapOffset}
          />
        <PlotInfo currentTile={currentTile} mapOffset={mapOffset} plot={plot} />
        <MiniMap
          viewport={{
            x: -mapOffset.x,
            y: -mapOffset.y,
            width: parentRef.current?.offsetWidth,
            height: parentRef.current?.offsetHeight
          }}
          onClick={(x: number, y: number) => onMiniMapClick(x, y)}
          onZoomIn={() => null}
          onZoomOut={() => null}
        />
        <Legend />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          Map successfully saved.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Map;
