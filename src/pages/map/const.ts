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

export const TILE_WIDTH = 20;
export const TILE_HEIGHT = 20;

export interface TileType {
  code: number;
  color: string;
}

interface Indexable {
  [key: string]: TileType;
}

export const TileTypes: Indexable = {
  Available: {code: 1, color: '#787878'},
  Unavailable: {code: 2, color: '#add8e6'},
  Premium: {code: 3, color: '#b2b200'},
};
