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

import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {abi} from './safemoonabi';
import NumberFormat from 'react-number-format';
import symbol from './images/logo.svg';
import {Button, Typography} from '@material-ui/core';

declare global {
  interface Window {
    ethereum: any;
  }
}

const ConnectButton = () => {
  const {ethereum} = window;

  const [canConnect, setCanConnect] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(-1);

  useEffect(() => {
    if (ethereum) {
      setCanConnect(ethereum.isMetaMask);
      checkConnected();
    }
  }, []);

  const checkConnected = async () => {
    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length > 0) {
      getBalance(accounts);
    }
  };

  const getBalance = async accounts => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

    // @ts-ignore
    const contract = new web3.eth.Contract(
      abi,
      '0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3'
    );

    if (contract) {
      const decimals: number = await contract.methods.decimals().call();
      const balance: number = await contract.methods
        .balanceOf(accounts[0])
        .call();
      setBalance(balance * Math.pow(10, -decimals));
    }
  };

  const onConnectClick = async () => {
    try {
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      if (accounts.length > 0) {
        getBalance(accounts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', paddingLeft: '20px'}}>
      <img src={symbol} height="25" />
      {!canConnect && (
        <Button
          variant="contained"
          color="secondary"
          style={{marginLeft: '20px'}}
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
        >
          Install MetaMask
        </Button>
      )}
      {canConnect && balance === -1 && (
        <Button
          variant="contained"
          color="secondary"
          style={{marginLeft: '20px'}}
          onClick={() => onConnectClick()}
        >
          Connect MetaMask
        </Button>
      )}
      {balance !== -1 && (
        <Typography
          style={{marginLeft: '10px', fontSize: '1.25em', color: 'yellow'}}
        >
          <NumberFormat
            value={balance}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={0}
          />
        </Typography>
      )}
    </div>
  );
};

export default ConnectButton;
