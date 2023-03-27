/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/header/header';
import Main from './components/main/main';
import Winners from './components/winners/winners';
import createWinner from './APIFunctions/createWinner';
import getWinner from './APIFunctions/getWinner';
import getWinners from './APIFunctions/getWinners';
import updateWinner from './APIFunctions/updateWinners';
import WinnerModal from './components/winnerModal/winnerModal';
import { ICarsAPIWinners } from './types/types';

function App(): JSX.Element {
  const [pageWinners, setPageWinners] = useState(1);
  const [winner, setWinner] = useState({ id: 0, time: 0, name: '', color: '', race: false });
  const [winnerTable, setWinnerTable] = useState<ICarsAPIWinners>({ renderCars: [], total: null });
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [winDis, setWinDis] = useState(false);

  async function setWinnerToServer(id:number): Promise<void> {
    const testWin = await getWinner(id).then((res) => res);
    if (!testWin.id) {
      await createWinner({ id: winner.id as number, wins: 1, time: winner.time });
    } else {
      let bestTime;
      (winner.time < testWin.time) ? bestTime = winner.time : bestTime = testWin.time;
      await updateWinner({ time: bestTime, wins: testWin.wins + 1, id: winner.id });
    }
    await getWinners(pageWinners, sort, order).then((res) => setWinnerTable(res));
    setWinner({ id: 0, time: 0, name: '', color: '', race: false });
  }
  useEffect(() => setPageWinners(pageWinners), []);

  useEffect(() => {
    if (winner.id !== 0) {
      const modal = document.querySelector('.modal-winner')!;
      modal.innerHTML = `${winner.name} won in [${winner.time}]`;
      modal.classList.add('modal-winner--open');
      setWinnerToServer(winner.id);
    }
  }, [winner.id]);
  return (
    <div className='App'>
      <WinnerModal setWinDis={setWinDis} />
      <Header
        pageWinners={pageWinners}
        setPageWinners={setPageWinners}
        winDis={winDis}
      />
      <Main
        winner={winner}
        setWinner={setWinner}
        setWinnerTable={setWinnerTable}
        pageWinners={pageWinners}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        setWinDis={setWinDis}
      />
      <Winners
        pageWinners={pageWinners}
        setPageWinners={setPageWinners}
        winnerTable={winnerTable}
        setWinnerTable={setWinnerTable}
        winner={winner}
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
        orderTime={orderTime}
        setOrderTime={setOrderTime}
      />
    </div>
  );
}

export default App;
