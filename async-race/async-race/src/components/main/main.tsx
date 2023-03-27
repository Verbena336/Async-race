/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import CreateForm from '../createCars/createForm';
import GarageWrapper from '../garageWrapper/garageWrapper';
import GarageTitle from '../garageTitle/garageTitle';
import Pagination from '../pagination/pagination';
import getCars from '../../APIFunctions/getCars';
import { IWinnersState, ICars, ICarsAPIWinners } from '../../types/types';

function Main({ winner, setWinner, pageWinners, setWinnerTable,
  sort, order, setSort, setOrder, setWinDis } : { winner: IWinnersState,
  setWinner: React.Dispatch<React.SetStateAction<IWinnersState>>,
  pageWinners: number,
  setWinnerTable: React.Dispatch<React.SetStateAction<ICarsAPIWinners>>,
  sort: string, order: string, setSort: React.Dispatch<React.SetStateAction<string>>,
  setOrder: React.Dispatch<React.SetStateAction<string>>,
  setWinDis: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element {
  const [cars, setCars] = useState<ICars>({ allCars: [], currentCar: {}, total: '' });
  const [page, setPage] = useState(1);
  const [raceDis, setRaceDis] = useState(false);
  const [raceResetDis, setRaceResetDis] = useState(true);
  useEffect(() => {
    getCars(page).then((res) => setCars({ ...cars, allCars: res.renderCars, total: res.total }));
  }, []);
  useEffect(() => setPage(page), []);
  return (
    <main className='main'>
      <CreateForm
        cars={cars}
        setCars={setCars}
        page={page}
        winner={winner}
        setWinner={setWinner}
        setWinnerTable={setWinnerTable}
        pageWinners={pageWinners}
        sort={sort}
        order={order}
        setWinDis={setWinDis}
        setRaceResetDis={setRaceResetDis}
        setRaceDis={setRaceDis}
        raceResetDis={raceResetDis}
        raceDis={raceDis}
      />
      <GarageTitle amount={cars.total as string} page={page} />
      <GarageWrapper
        cars={cars}
        setCars={setCars}
        page={page}
        winner={winner}
        setWinner={setWinner}
        setWinnerTable={setWinnerTable}
        pageWinners={pageWinners}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
      />
      <Pagination
        page={page}
        setPage={setPage}
        total={cars.total as string}
      />
    </main>
  );
}

export default Main;
