import React from 'react';
import './header.scss';

export default function Header({ pageWinners, setPageWinners, winDis }:
  { pageWinners: number,
  setPageWinners: React.Dispatch<React.SetStateAction<number>>,
  winDis: boolean }): JSX.Element {
  function setMain(): void {
    (document.querySelector('.main') as HTMLElement).style.display = 'block';
    (document.querySelector('.winners') as HTMLElement).style.display = 'none';
  }
  async function setWinners(): Promise<void> {
    (document.querySelector('.main') as HTMLElement).style.display = 'none';
    (document.querySelector('.winners') as HTMLElement).style.display = 'block';
  }
  return (
    <header className='header'>
      <button onClick={setMain} type='button' className='header__btnGarage header__btn'>
        To Garage
      </button>
      <button disabled={winDis} onClick={setWinners} type='button' className='header__btnWin header__btn'>
        To Winners
      </button>
    </header>
  );
}
