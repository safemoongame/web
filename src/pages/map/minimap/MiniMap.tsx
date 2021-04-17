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
import React, {useRef} from 'react';
import {BoundingBox} from '../Map';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: 10,
      left: 10,
      display: 'flex',
    },
    map: {
      position: 'absolute',
      backgroundColor: '#000000',
      border: '1px solid #ffffff',
      overflow: 'hidden',
    },
    miniSelection: {
      position: 'absolute',
      border: '1px solid #ffffff',
      backgroundColor: '#ffffff77',
    },
  })
);

interface MiniMapProps {
  viewport?: BoundingBox;
  onClick(x: number, y: number): void;
  onZoomOut(): void;
  onZoomIn(): void;
}

const MiniMap: React.FC<MiniMapProps> = (props: MiniMapProps) => {
  const {viewport, onClick, onZoomIn, onZoomOut} = props;

  const classes = useStyles();
  const mouseDown = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const miniRef = useRef<HTMLDivElement>(null);

  const handleMouseUp = (e: React.MouseEvent) => {
    mouseDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseDown.current && miniRef.current) {
      const x = 125;
      const y = 75;
      onClick(e.nativeEvent.clientX - x, e.nativeEvent.clientY - y);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseDown.current = true;
    if (miniRef.current) {
      const x = 125;
      const y = 75;
      onClick(e.nativeEvent.clientX - x, e.nativeEvent.clientY - y);
    }
  };

  return (
    <div className={classes.root} onMouseDown={(e: React.MouseEvent) => handleMouseDown(e)}>
      <div
        id="mini"
        ref={miniRef}
        className={classes.map}
        onMouseUp={(e: React.MouseEvent) => handleMouseUp(e)}
        onMouseMove={(e: React.MouseEvent) => handleMouseMove(e)}
        onMouseLeave={(e: React.MouseEvent) => handleMouseUp(e)}
      >
        <img src={'/api/minimap'} style={{marginBottom: -5}} />
        <div
          ref={ref}
          className={classes.miniSelection}
          style={{
            left: `${viewport && viewport?.x / 10}px`,
            top: `${viewport && viewport?.y / 10}px`,
            width: viewport && viewport?.width / 10,
            height: viewport && viewport?.height / 10,
          }}
        />
      </div>
    </div>
  );
};

export default MiniMap;
