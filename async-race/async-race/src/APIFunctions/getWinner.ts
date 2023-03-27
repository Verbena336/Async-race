import { TCarWin } from '../types/types';

export default async function getWinner(id: number):
Promise<TCarWin> {
  try {
    const url = `http://127.0.0.1:3000/winners/${id}`;

    const getCar = await fetch(url);
    const renderCar = await getCar.json();
    return renderCar;
  } catch (error) {
    throw new Error();
  }
}
