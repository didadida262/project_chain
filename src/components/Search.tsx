/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-08-01 10:19:31
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-01 10:46:10
 */
import cn from 'classnames';
import { useState } from 'react';
import { useDebounce } from 'react-use';

interface SearchProps {
  className?: string;
  onSearch: (val: string) => void;
}


export function Search(props: SearchProps) {
  const { className, onSearch } = props;
  const [value, setValue] = useState('');

  useDebounce(
    () => {
      onSearch(value);
    },
    200,
    [value],
  );

  return (
    <div
      className={
        (cn(className),
        ` h-[36px] w-full rounded-common border-[1px] border-solid border-[#262B33]`)
      }>
      <div
        className={cn(
          className,
          'sm:placeholder:text-base flex w-full items-center justify-between gap-x-[10px] bg-bgInputColor px-[14px]  focus:outline-none sm:h-full',
        )}>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={'Input...'}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch(value);
            }
          }}
          className='flex h-10 min-w-0 flex-1 border-0 bg-transparent  text-textFifthSize outline-none placeholder:text-[#959DA5]'
        />
        {value && (
          <svg
            width='20'
            height='20'
            viewBox='0 0 26 26'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <rect width='26' height='26' rx='4' fill='text-transparent' />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M18.3636 18.3655C18.0956 18.6336 17.6611 18.6336 17.3931 18.3655L8.19547 9.16794C7.92746 8.89993 7.92745 8.46539 8.19547 8.19737C8.46349 7.92935 8.89803 7.92935 9.16604 8.19737L18.3636 17.395C18.6317 17.663 18.6317 18.0975 18.3636 18.3655Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M18.3647 8.19709C18.6327 8.4651 18.6327 8.89964 18.3647 9.16766L9.16709 18.3653C8.89907 18.6333 8.46453 18.6333 8.19652 18.3653C7.9285 18.0972 7.9285 17.6627 8.19652 17.3947L17.3941 8.19709C17.6621 7.92907 18.0967 7.92907 18.3647 8.19709Z'
              fill='currentColor'
            />
          </svg>
        )}
      </div>
    </div>
  );
}
