import { TCarWin } from '../types/types';

export default async function createWinner(newWin: {
  id: number,
  wins: number,
  time: number
}):
Promise<TCarWin> {
  try {
    const url = 'http://127.0.0.1:3000/winners/';

    const getCar = await fetch(url, { method: 'POST',
      body:
JSON.stringify(newWin),
      headers: { 'Content-Type': 'application/json' } });
    const renderCar = await getCar.json();
    return renderCar;
  } catch (error) {
    throw new Error();
  }
}
