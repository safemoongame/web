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

import React, { useState } from 'react';
import { Stage, Layer, Image, Rect } from 'react-konva';
import useImage from 'use-image';
import { TILE_HEIGHT, TILE_WIDTH } from '../const';

interface TileStageProps {
  width: number;
  height: number;
  onSelect: (tileX: number, tileY: number) => void;
  onMove: (x: number, y: number) => void;
  mapOffset: {x: number, y: number};
}

const Tiles: React.FC<TileStageProps> = (props) => {

  const {width, height, onSelect, onMove, mapOffset} = props;

  const [image] = useImage('/api/largemap');
  const [scale, setScale] = useState<number>(1);
  const [selection, setSelection] = useState<{x: number, y: number}>();

  const onDragMove = (e) => {
    const {x, y} = e.target.position();
    onMove(x, y);
  }

  const onClick = (e) => {
    const map = e.currentTarget;
    const x = map.attrs.x ? map.attrs.x : 0;
    const y = map.attrs.y ? map.attrs.y : 0;

    const offsetX = e.evt.offsetX;
    const offsetY = e.evt.offsetY;

    const tileX = Math.floor((offsetX - x) / 20);
    const tileY = Math.floor((offsetY - y) / 20);

    setSelection({
      x: tileX * TILE_WIDTH - 1,
      y: tileY * TILE_HEIGHT - 1
    });

    onSelect(tileX, tileY);
  }

  return (
    <Stage width={width} height={height} onDragMove={(e) => onDragMove(e)}>
      <Layer draggable onClick={(e) => onClick(e)} x={mapOffset.x} y={mapOffset.y}>
        <Image scaleX={scale} scaleY={scale} image={image} />
          {selection && <Rect
            x={selection?.x}
            y={selection?.y}
            width={TILE_WIDTH + 2}
            height={TILE_HEIGHT + 2}
            stroke="#ffffff"
            strokeWidth={2}
            fill="#ffffff33" />}
      </Layer>
    </Stage>
  )
}

export default Tiles;
