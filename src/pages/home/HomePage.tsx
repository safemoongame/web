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

import {Button, Grid, Paper, Theme, Typography} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/styles';
import {Build, SwapVerticalCircle} from '@material-ui/icons';
import React, {useEffect, useRef} from 'react';
import background from './images/background.png';
import safemoon from './images/safemoon.svg';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: '500px',
      height: '650px',
      width: '100%',
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center 100px',
      backgroundRepeat: 'no-repeat',
      '@media only screen and (max-width: 600px)': {
        backgroundPosition: 'center 120px',
        paddingTop: '325px',
        height: '400px',
        backgroundSize: '50%',
      },
      '& a': {
        textDecoration: 'none',
      },
    },
    button: {
      color: '#ffffff',
      backgroundColor: '#00A79D',
      fontSize: '1.5em',
      padding: '10px 30px',
    },
    grid: {
      '@media only screen and (max-width: 600px)': {
        paddingLeft: '20px',
        paddingRight: '20px',
      },
      justifyContent: 'center',
    },
    paper: {
      color: '#ffffff',
      backgroundColor: '#000000',
      border: '1px solid #343434',
      padding: '20px',
      minHeight: '300px',
    },
    sectionHeader: {
      marginTop: '10px',
      fontWeight: 'bold',
    },
    text: {
      color: '#c7c7c7',
      marginTop: '10px',
      textAlign: 'justify',
    },
  })
);

const HomePage: React.FC = () => {
  const classes = useStyles();
  const moonRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (moonRef.current) {
      moonRef.current.style.top = '100px';
    }
  }, [moonRef]);

  return (
    <>
      <div className={classes.root}>
        <Link to="/map">
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Buy Moon Plots Now!
          </Button>
        </Link>
      </div>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item sm={3}>
          <Paper className={classes.paper}>
            <img src={safemoon} height="40" style={{margin: 'auto'}} />
            <Typography variant="subtitle1" className={classes.sectionHeader}>
              Use SafeMoon
            </Typography>
            <Typography variant="body2" className={classes.text}>
              Use your SafeMoon as in-game currency to obtain resources to build
              rockets on earth and colonize the moon.
            </Typography>
            <Typography variant="body2" className={classes.text}>
              Sell your in-game items to other players to earn additional
              SafeMoon.
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={3}>
          <Paper className={classes.paper}>
            <Build style={{color: '#ffffff', fontSize: 40}} />
            <Typography variant="subtitle1" className={classes.sectionHeader}>
              Build
            </Typography>
            <Typography variant="body2" className={classes.text}>
              Your primary goal is to get to the moon so you must obtain
              resources to build your rocket.
            </Typography>
            <Typography variant="body2" className={classes.text}>
              Once on the moon, stake your claim to the land and build your moon
              empire.
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={3}>
          <Paper className={classes.paper}>
            <SwapVerticalCircle style={{color: '#ffffff', fontSize: 40}} />
            <Typography variant="subtitle1" className={classes.sectionHeader}>
              Trade
            </Typography>
            <Typography variant="body2" className={classes.text}>
              Trade your resources and in-game NFTs with other players.
            </Typography>
            <Typography variant="body2" className={classes.text}>
              Work together to build a utopia on The Moon by creating shops to
              integrate with our ecommerce engine.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
