import React from 'react';
import './garageTitle.scss';
import { TProp } from '../../types/types';

function GarageTitle(prop: TProp): JSX.Element {
  const { amount, page } = prop;
  return (
    <div className='main__title garage'>
      <h2 className='garage__title'>Garage ({amount})</h2>
      <h3 className='garage__page'>Page #{page}</h3>
    </div>
  );
}

export default GarageTitle;
