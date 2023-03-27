/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

function WinnerModal({ setWinDis }:
  {setWinDis: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element {
  function closeModal(): void {
    setWinDis(false);
    document.querySelector('.modal-winner')?.classList.remove('modal-winner--open');
  }
  return (
    <div onClick={closeModal} className='modal-winner' />
  );
}

export default WinnerModal;
