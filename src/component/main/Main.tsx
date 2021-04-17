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
  Switch,
  Route
} from 'react-router-dom';
import HomePage from 'pages/home/HomePage';
import Map from 'pages/map/Map';
import {makeStyles} from '@material-ui/styles';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 65,
    display: 'flex',
    height: '100%',
  },
  main: {
    width: '100%',
    height: '100%',
  },
}));

const Main: React.FC = () => {
  const classes = useStyles();

  return (
    <div className="App">
      <Header />
      <div className={classes.root}>
        <Sidebar />
        <div className={classes.main}>
          <Switch>
            <Route path="/map">
              <Map />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Main;
