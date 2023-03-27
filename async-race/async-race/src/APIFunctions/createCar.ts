/* eslint-disable no-param-reassign */
import { TCar } from '../types/types';

export default async function createCar(newCar: {name: string; color: string}):
Promise<TCar[]> {
  try {
    if (!newCar.color) newCar.color = '#000000';
    const url = 'http://127.0.0.1:3000/garage/';

    const getCar = await fetch(url, { method: 'POST',
      body:
JSON.stringify(newCar),
      headers: { 'Content-Type': 'application/json' } });
    const renderCar = await getCar.json();
    return renderCar;
  } catch (error) {
    throw new Error();
  }
}
