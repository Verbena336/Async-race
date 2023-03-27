/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import deleteCar from '../../APIFunctions/deleteCar';
import './garageCar.scss';
import getCars from '../../APIFunctions/getCars';
import startEngine from '../../APIFunctions/startEngine';
import driveEngine from '../../APIFunctions/driveEngine';
import stopEngine from '../../APIFunctions/stopEngine';
import getWinners from '../../APIFunctions/getWinners';
import getWinner from '../../APIFunctions/getWinner';
import { IWinnersState, TCar, ICars, ICarsAPIWinners } from '../../types/types';
import deleteWinner from '../../APIFunctions/deleteWinner';

function GarageCar({ car, setCars, cars, page, total, winner,
  setWinner, pageWinners, setWinnerTable, sort, setSort, order, setOrder }:
   {car: TCar, setCars:
  React.Dispatch<React.SetStateAction<ICars>>, cars: ICars, page: number,
  total: string, winner: IWinnersState,
  setWinner: React.Dispatch<React.SetStateAction<IWinnersState>>, pageWinners: number,
  setWinnerTable: React.Dispatch<React.SetStateAction<ICarsAPIWinners>>,
  sort: string, order: string, setSort: React.Dispatch<React.SetStateAction<string>>,
  setOrder: React.Dispatch<React.SetStateAction<string>>})
: JSX.Element {
  const [isDisabled, toggleDis] = useState(false);
  const [isDisabledFinish, toggleDisFinish] = useState(true);
  const [carAnimation, setCarAnimation] = useState('');
  const [timeAnimation, setTimeAnimation] = useState('');
  const [isFinished, setisFinished] = useState(true);
  const [isPlay, setisPlay] = useState('running');
  const [leftPosition, setLeftPosition] = useState('');
  let duration: number;

  async function deleteCarFn(): Promise<void> {
    await deleteCar(car.id);
    const testWin = await getWinner(car.id as number).then((res) => res);
    if (testWin.id) {
      await deleteWinner(testWin.id).then((res) => res);
    }
    await getWinners(pageWinners, sort, order).then((res) => setWinnerTable(res));
    await getCars(page).then((res) => setCars({
      ...cars,
      allCars: res.renderCars,
      total: res.total }));
  }
  function updateCarFn(): void {
    setCars({ ...cars, currentCar: car });
  }
  async function startCar(): Promise<void> {
    toggleDis(true);
    toggleDisFinish(false);
    const startData = await startEngine(car.id as number).then((res) => res);
    animate(startData);
    await drive();
  }
  async function drive(): Promise<void> {
    const driveData = await driveEngine(car.id as number).then((res) => res);
    if (!driveData) {
      setisFinished(false);
    } else {
      setisFinished(true);
    }
  }
  async function stopCar(): Promise<void> {
    await stopEngine(car.id as number).then((res) => res);
    setCarAnimation('unset');
    setTimeAnimation('unset');
    toggleDis(false);
    toggleDisFinish(true);
    setLeftPosition('unset');
  }
  function animate(startData:{distance: number, velocity: number}): void {
    duration = startData.distance / (startData.velocity * 1000);
    setLeftPosition('unset');
    setTimeAnimation(`${duration}s`);
    setCarAnimation('driveCar');
  }

  function savePosition(): void {
    setCarAnimation('unset');
    setLeftPosition(`${document.body.clientWidth - 80}px`);
    if (winner.race && !winner.id) {
      setWinner({ ...winner,
        id: car.id as number,
        time: +(+(timeAnimation
          .slice(0, timeAnimation.length - 1))).toFixed(2),
        name: car.name as string,
        color: car.color as string });
    }
  }

  useEffect(() => {
    if (isFinished) {
      setisPlay('running');
    } else {
      setisPlay('paused');
      setCarAnimation('unset');
      setLeftPosition(`${(document.getElementById(`${car.id}`) as HTMLElement).getBoundingClientRect().left + window.scrollX}px`);
    }
  }, [isFinished]);

  return (
    <div className='track__wrapper car'>
      <div className='car__controls'>
        <button type='button' onClick={updateCarFn} className='car__select'>Select</button>
        <button type='button' onClick={deleteCarFn} className='car__remove'>Remove</button>
        <h3 className='car__name'>{car.name}</h3>
      </div>
      <div>
        <div className='car__race-control'>
          <button type='button' disabled={isDisabled} onClick={startCar} className='car__A'>A</button>
          <button type='button' disabled={isDisabledFinish} onClick={stopCar} className='car__B'>B</button>
        </div>
      </div>
      <div className='car__track'>
        <svg id={`${car.id}`} onAnimationEnd={savePosition} className='car__svg' style={{ left: leftPosition, fill: car.color, animationDuration: timeAnimation, animationName: carAnimation, animationFillMode: 'forwards', animationTimingFunction: 'linear', animationPlayState: isPlay }} version='1.1' width='75px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 470 470' xmlnsXlink='http://www.w3.org/1999/xlink' enableBackground='new 0 0 470 470'>
          <g>
            <path d='m126.184,358.951c19.299,0 35-15.701 35-35s-15.701-35-35-35-35,15.701-35,35 15.701,35 35,35zm0-55c11.028,0 20,8.972 20,20s-8.972,20-20,20-20-8.972-20-20 8.971-20 20-20z' />
            <path d='m343.816,288.951c-19.299,0-35,15.701-35,35s15.701,35 35,35 35-15.701 35-35-15.701-35-35-35zm0,55c-11.028,0-20-8.972-20-20s8.972-20 20-20 20,8.972 20,20-8.971,20-20,20z' />
            <path d='m137.5,116.049h23.779c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-23.779c-10.423,0-27.031,7.176-34.177,14.767l-60.088,63.845c-2.051,2.179-2.609,5.368-1.423,8.115 1.187,2.747 3.893,4.525 6.885,4.525h290.271c2.562,0 4.945-1.307 6.323-3.467 1.377-2.159 1.558-4.873 0.478-7.195l-30.854-66.365c-3.315-7.046-14.628-14.225-22.415-14.225h-101.221c-4.143,0-7.5,3.358-7.5,7.5l-.001,68.752h-117.722l48.19-51.204c4.243-4.508 17.066-10.048 23.254-10.048zm61.279,0h93.7c2.203,0.103 7.842,3.681 8.849,5.581l25.883,55.671h-128.433l.001-61.252z' />
            <path d='m470,257.692c0-26.631-20.555-55.149-45.819-63.57-0.017-0.006-35.078-11.693-35.078-11.693-5.854-1.951-13.576-8.812-16.203-14.394l-30.84-65.535c-8.299-17.636-30.068-31.451-49.56-31.451h-155c-18.639,0-43.247,10.632-56.022,24.206l-69.158,73.482c-6.909,7.34-12.32,20.984-12.32,31.064v94.15c0,20.678 16.822,37.5 37.5,37.5h14.06c3.775,37.846 35.8,67.5 74.624,67.5s70.849-29.654 74.624-67.5h45.509c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-45.509c-3.775-37.846-35.8-67.5-74.624-67.5s-70.849,29.654-74.624,67.5h-14.06c-12.406,0-22.5-10.093-22.5-22.5v-94.15c0-6.294 3.929-16.2 8.242-20.783l69.159-73.483c9.941-10.563 30.594-19.486 45.099-19.486h155c13.682,0 30.162,10.458 35.987,22.838l30.84,65.535c4.421,9.395 15.182,18.955 25.031,22.238l28.498,9.499c-0.492,2.841-0.748,5.729-0.748,8.642 0,25.238 18.65,46.198 42.892,49.831v29.32c0,12.407-8.357,22.5-18.631,22.5h-17.929c-3.775-37.846-35.8-67.5-74.624-67.5-41.355,0-75,33.645-75,75s33.645,75 75,75c38.824,0 70.849-29.654 74.624-67.5h17.929c18.544,0 33.631-16.822 33.631-37.5v-36.26zm-343.816,6.259c33.084,0 60,26.916 60,60s-26.916,60-60,60-60-26.916-60-60 26.916-60 60-60zm217.632,120c-33.084,0-60-26.916-60-60s26.916-60 60-60 60,26.916 60,60-26.916,60-60,60zm83.292-169.15c0-0.969 0.04-1.934 0.117-2.893 13.16,7.627 23.787,22.37 26.864,37.266-15.466-3.785-26.981-17.756-26.981-34.373z' />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default GarageCar;
