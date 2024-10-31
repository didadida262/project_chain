/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-07-25 01:16:22
 * @LastEditors: didadida262
 * @LastEditTime: 2024-10-31 16:45:31
 */

import { ethers } from 'ethers';
import { useState, useMemo, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { Web3 } from 'web3'

import { EIP6963ProviderDetail } from '@/Chain/Wallet/eip6963/EthereumProviderTypes'
import {useEIP6963Wallets } from '@/Chain/Wallet/eip6963/useEIP6963Wallets'
import customToast from '@/components/customToast'
// import { useTranslation } from '@/i18n';
// import ButtonTheme from '@/components/Theme/ButtonTheme'

import { ButtonCommon, EButtonType} from './components/ButtonCommon';
import { Search } from "./components/Search";
import pattern from "./styles/pattern";

import 'react-toastify/dist/ReactToastify.css';

// 目前只支持 metamask、trust、okx wallet
export function getSupportedWalletRdns() {
  return ['io.metamask', 'com.trustwallet.app', 'com.okex.wallet'];
}

function App() {
  console.log('app组件加载....')

  // const { t } = useTranslation();
  const [data, setData] = useState(1)
  const [val, setVal] = useState('')
  const [currenProvider, setCurrentProvider] = useState() as any
  const { providers } = useEIP6963Wallets();
  const [count, setCount] = useState(0);
  const evmSupportedWalletProviders = useMemo(
    () =>
      providers.filter((item:EIP6963ProviderDetail ) =>
        getSupportedWalletRdns().includes(item.info.rdns)
      ),
    [providers]
  );

  const connectWallet = async (item: EIP6963ProviderDetail) => {
    console.log('connectWallet>>>>')
    const provider = new Web3(
      item.provider,
    );
    setCurrentProvider(provider)
    console.log('provider>>>',provider)

    await provider.eth.requestAccounts()
    // customToast.s((e as Error).message);
    console.log('连接成功', customToast)
    customToast.success('连接成功')

  }
  const deploy = async () => {
    const accounts = await currenProvider.eth.getAccounts()
    console.log('accounts>>', accounts)
    // // 0xC7514d84B96B4002D21a6F3Ad835311C555CFe6b

    const chainId  = await currenProvider.eth.getChainId()
    console.log('chainId>>', chainId)

    // 合约的ABI
    const abi = [
      {
        constant:true,
        inputs:[],
        name:"get",
        outputs:
          [
            {
              internalType:"uint256",
              name:"",
              type:"uint256"
            }
          ]
      }
    ]
    
    // // 合约的地址
    const contractAddress = '0xC7514d84B96B4002D21a6F3Ad835311C555CFe6b'
    
    // // 创建合约实例
    const contract = new currenProvider.eth.Contract(abi, contractAddress)
    contract.deploy()
    .send({ from: accounts[0], gas: 0.0001, gasPrice: '0.0001' })
    .on('receipt', function(receipt: any){
      console.log('合约部署成功，合约地址：', receipt.contractAddress);
      console.log('验证合约内容：https://etherscan.io/verifyContract');
    });
  }

  useEffect(() => {
    setInterval(() => {
      setCount((oldVal) => {
        return oldVal + 1
      })
    }, 3000)
  }, [])


  return (
    <div className=" flex flex-col h-screen w-full items-center justify-center gap-y-[20px] text-white bg-bgPrimaryColor ">
      <ToastContainer
        theme="dark"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        draggable={false}
        pauseOnHover={false}
        // className="toast-container"
        // toastClassName="dark-toast"
      />
      <div className="container w-[500px]  h-[160px] flex flex-col justify-between">
        <div className={`w-full ${pattern.flexbet}` }>
          <div className="w-[calc(100%_-_160px)]">
            <Search className="" onSearch={(val: string) => {
              setVal(val)
            }}/>
          </div>
          <ButtonCommon
          className='w-[150px]'
            type={EButtonType.SIMPLE} onClick={() => {
            deploy()
            console.log('存储数据>>>', val)
          }}>部署数据</ButtonCommon>

        </div>
        <div className={`w-full ${pattern.flexbet}`}>
          <div className="w-[calc(100%_-_160px)]">
              <Search className="" onSearch={(val: string) => {
                setVal(val)
              }}/>
          </div>
          <ButtonCommon
          className='w-[150px]'
          type={EButtonType.SIMPLE} onClick={() => {
            console.warn('查询数据>>>')
          }}>查询数据</ButtonCommon>
        </div>
        <div className={`w-full ${pattern.flexbet}`}>
          {evmSupportedWalletProviders.map((item) => (
            <div
              key={item.info.rdns}
            >
             <ButtonCommon type={EButtonType.PRIMARY} onClick={() => {
                connectWallet(item)
              }}>
                <span>Connect {item.info.name}</span>
            </ButtonCommon>
            </div>
          ))}


        </div>
      </div>
    </div>
  );
}

export default App;
