/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { ICarsAPIWinners, TCarWin } from '../../types/types';
import TableCarItem from '../tableCarItem/tableCarItem';
import './winners.scss';
import getWinners from '../../APIFunctions/getWinners';
import PaginationWinners from '../paginationWinners/paginationWinners';

function Winners({ winner, pageWinners, setPageWinners, winnerTable, setWinnerTable,
  sort, order, setSort, setOrder, orderTime, setOrderTime }:
  { winner: { id: number, time: number, name: string,
    color: string, race: boolean }, pageWinners: number,
  setPageWinners: React.Dispatch<React.SetStateAction<number>>,
  winnerTable: ICarsAPIWinners,
  setWinnerTable: React.Dispatch<React.SetStateAction<ICarsAPIWinners>>,
sort: string, order: string, setSort: React.Dispatch<React.SetStateAction<string>>,
setOrder: React.Dispatch<React.SetStateAction<string>>,
orderTime: string, setOrderTime: React.Dispatch<React.SetStateAction<string>>}): JSX.Element {
  function sortWins(): void {
    document.querySelector('.winners__time-btn')?.classList.remove('sorted');
    document.querySelector('.winners__time-btn')?.classList.remove('second-sorted');
    const element = document.querySelector('.winners__wins-btn');
    if (order === 'ASC') {
      setOrder('DESC');
      element?.classList.add('second-sorted');
      element?.classList.remove('sorted');
    } else {
      setOrder('ASC');
      element?.classList.add('sorted');
      element?.classList.remove('second-sorted');
    }
    setSort('wins');
    setToServer();
  }

  function sortTime(): void {
    document.querySelector('.winners__wins-btn')?.classList.remove('sorted');
    document.querySelector('.winners__wins-btn')?.classList.remove('second-sorted');
    const element = document.querySelector('.winners__time-btn');
    if (order === 'ASC') {
      setOrder('DESC');
      element?.classList.add('second-sorted');
      element?.classList.remove('sorted');
    } else {
      setOrder('ASC');
      element?.classList.add('sorted');
      element?.classList.remove('second-sorted');
    }
    setSort('time');
    setToServer();
  }

  async function setToServer(): Promise<void> {
    await getWinners(pageWinners, sort, order).then((res) => setWinnerTable(res));
  }

  useEffect(() => {
    getWinners(pageWinners, sort, order)
      .then((res) => setWinnerTable(res));
  }, [sort, order]);
  useEffect(() => setPageWinners(pageWinners), []);
  return (
    <section className='main__winners winners'>
      <h2 className='winners__title'>Winners ({winnerTable.total})</h2>
      <h3 className='winners__page'>Page #{pageWinners}</h3>
      <table className='winners__wrapper table-row'>
        <tbody>
          <tr>
            <th>Number</th>
            <th>Car</th>
            <th>Name</th>
            <th className='winners__wins-btn' onClick={sortWins}>Wins</th>
            <th className='winners__time-btn' onClick={sortTime}>Best time (seconds)</th>
          </tr>
          {winnerTable.renderCars.map((item:TCarWin) => (
            <TableCarItem
              key={item.id}
              item={item}
              index={pageWinners > 1 ? +`${pageWinners - 1}${winnerTable.renderCars.indexOf(item)}` : winnerTable.renderCars.indexOf(item)}
            />
          ))}
        </tbody>
      </table>
      <PaginationWinners
        pageWinners={pageWinners}
        setPageWinners={setPageWinners}
        total={winnerTable.total as string}
        setWinnerTable={setWinnerTable}
        sort={sort}
        order={order}
      />
    </section>
  );
}

export default Winners;
