import React, { useState, useEffect } from 'react';
import createCar from '../../APIFunctions/createCar';
import './createForm.scss';
import getCars from '../../APIFunctions/getCars';
import { ICars, IWinnersState, ICarsAPIWinners } from '../../types/types';
import updateCar from '../../APIFunctions/updateCar';
import generateRandomCars from '../../APIFunctions/generateCars';
import getWinners from '../../APIFunctions/getWinners';

// eslint-disable-next-line react/require-default-props
function CreateForm(prop: {cars: ICars, setCars: React.Dispatch<React.SetStateAction<ICars>>,
  page: number, winner: IWinnersState,
  setWinner: React.Dispatch<React.SetStateAction<IWinnersState>>,
  setWinnerTable: React.Dispatch<React.SetStateAction<ICarsAPIWinners>>,
  sort: string, order: string, pageWinners: number,
  setWinDis: React.Dispatch<React.SetStateAction<boolean>>,
  setRaceResetDis: React.Dispatch<React.SetStateAction<boolean>>,
  setRaceDis: React.Dispatch<React.SetStateAction<boolean>>, raceResetDis: boolean,
raceDis: boolean})
: JSX.Element {
  const { setCars, cars, page, winner, setWinner, setWinnerTable,
    sort, order, pageWinners, setWinDis, setRaceDis,
    setRaceResetDis, raceDis, raceResetDis } = prop;
  const [carName, setCarName] = useState('');
  const [carColor, setColor] = useState('#000000');
  const [carNameUpd, updateCarName] = useState('');
  const [carColorUpd, updateCarColor] = useState('#000000');
  const [inputState, setInputState] = useState(true);

  async function onSubmit(): Promise<void> {
    await createCar({ name: carName, color: carColor });
    await getCars(page)
      .then((res) => setCars({ ...cars, allCars: res.renderCars, total: res.total }));
  }
  async function onUpdate(): Promise<void> {
    await updateCar({ name: carNameUpd, color: carColorUpd, id: cars.currentCar.id as number });
    await getWinners(pageWinners, sort, order).then((res) => setWinnerTable(res));
    await getCars(page)
      .then((res) => setCars({ ...cars, allCars: res.renderCars }));
    setInputState(true);
    cars.currentCar.name = '';
  }

  async function generateCars(): Promise<void> {
    const promiseArr = Array.from(Array(100)).map((item) => createCar(generateRandomCars()));
    await Promise.all(promiseArr);
    await getCars(page).then((res) => setCars({ ...cars,
      allCars: res.renderCars,
      total: res.total }));
  }
  function startAllRace(): void {
    setRaceDis(true);
    setRaceResetDis(false);
    setWinDis(true);
    document.querySelectorAll('.car__B').forEach((item) => (item as HTMLButtonElement).click());
    document.querySelectorAll('.car__A').forEach((item) => (item as HTMLButtonElement).click());
    setWinner({ ...winner, race: true });
  }

  function resetAllRace(): void {
    setRaceDis(false);
    setRaceResetDis(true);
    setWinDis(false);
    document.querySelectorAll('.car__B').forEach((item) => (item as HTMLButtonElement).click());
    setWinner({ id: 0, time: 0, name: '', color: '', race: false });
  }

  useEffect(() => {
    updateCarName(cars.currentCar.name as string);
    updateCarColor(cars.currentCar.color as string);
    setInputState(!cars.currentCar.name);
  }, [cars.currentCar]);
  return (
    <div className='main__createForm form'>
      <div className='form__create create'>
        <input type='text' onChange={(e):void => setCarName(e.target.value)} value={carName} className='create__input' />
        <input type='color' value={carColor} onChange={(e):void => setColor(e.target.value)} className='create__color' />
        <button type='submit' onClick={onSubmit} className='create__btn'>Create</button>
      </div>
      <div className='form__update update'>
        <input type='text' disabled={inputState} defaultValue={cars.currentCar.name} value={carNameUpd} onChange={(e):void => updateCarName(e.target.value)} className='update__input' />
        <input type='color' disabled={inputState} value={carColorUpd} onChange={(e):void => updateCarColor(e.target.value)} className='update__color' />
        <button type='button' disabled={inputState} onClick={onUpdate} className='update__btn'>Update</button>
      </div>
      <div className='form__controls controls'>
        <button type='button' disabled={raceDis} onClick={startAllRace} className='controls__race'>Race</button>
        <button type='button' disabled={raceResetDis} onClick={resetAllRace} className='controls__reset'>Reset</button>
        <button type='button' onClick={generateCars} className='controls__generate'>Generate Cars</button>
      </div>
    </div>
  );
}

export default CreateForm;
