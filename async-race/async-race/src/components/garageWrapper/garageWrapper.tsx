/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './garageWrapper.scss';
import GarageCar from '../garageCar/garageCar';
import getCars from '../../APIFunctions/getCars';
import { IWinnersState, ICars, TCar, ICarsAPIWinners } from '../../types/types';

function GarageWrapper(prop: {cars: ICars, setCars: React.Dispatch<React.SetStateAction<ICars>>,
  page: number, winner: IWinnersState,
  setWinner: React.Dispatch<React.SetStateAction<IWinnersState>>, pageWinners: number,
  setWinnerTable: React.Dispatch<React.SetStateAction<ICarsAPIWinners>>,
  sort: string, order: string, setSort: React.Dispatch<React.SetStateAction<string>>,
  setOrder: React.Dispatch<React.SetStateAction<string>>})
: JSX.Element {
  const { cars, setCars, page, winner, setWinner, setWinnerTable,
    pageWinners, sort, order, setSort, setOrder } = prop;
  useEffect(() => {
    getCars(page).then((res) => setCars({ ...cars, allCars: res.renderCars, total: res.total }));
  }, [page]);
  return (
    <div className='garage__wrapper track'>
      {cars.allCars.map((item:TCar) => (
        <GarageCar
          key={item.id}
          car={item}
          setCars={setCars}
          cars={cars}
          page={page}
          total={cars.total as string}
          winner={winner}
          setWinner={setWinner}
          setWinnerTable={setWinnerTable}
          pageWinners={pageWinners}
          sort={sort}
          setSort={setSort}
          order={order}
          setOrder={setOrder}
        />
      ))}
    </div>
  );
}

export default GarageWrapper;
