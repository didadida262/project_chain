/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-07-25 01:16:22
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-01 11:05:00
 */
import { useState } from "react";

// import { useTranslation } from '@/i18n';
// import ButtonTheme from '@/components/Theme/ButtonTheme'

import { ButtonCommon, EButtonType} from './components/ButtonCommon';
import { Search } from "./components/Search";
import pattern from "./styles/pattern";

function App() {
  // const { t } = useTranslation();
  const [data, setData] = useState('')

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-y-[20px] text-white bg-bgPrimaryColor ">
      <span className="">Chain</span>
      <div className="container w-[400px] ">
        <div className={`w-full ${pattern.flexbet}` }>
          <ButtonCommon type={EButtonType.SIMPLE} onClick={() => {
            
          }}>部署储存数据</ButtonCommon>
          <div className="w-[200px]">
            <Search className="" onSearch={(val: string) => {
              console.log('search>>>', val)
            }}/>
          </div>
        </div>
        <div className={`w-full ${pattern.flexbet} mt-[20px]` }>
          <ButtonCommon type={EButtonType.SIMPLE}>查询数据</ButtonCommon>
          <span className="w-[200px]">{data}</span>
        </div>
      </div>


      {/* <ButtonCommon 
        type={EButtonType.SIMPLE}
        onClick={() => {
          const lan = localStorage.getItem('language')
          switchLanguage(lan === 'zh'? 'en-US': 'zh')
        }}
        >
          <span>切换语言</span>
        </ButtonCommon>
      <ButtonTheme/> */}
    </div>
  );
}

export default App;
