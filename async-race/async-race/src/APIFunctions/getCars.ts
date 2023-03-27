/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ICarsAPI } from '../types/types';

export default async function getCars(page: number): Promise<ICarsAPI> {
  try {
    const url = `http://127.0.0.1:3000/garage/?_page=${page}&_limit=7`;

    const getCar = await fetch(url);
    const total = getCar.headers.get('X-Total-Count');
    const renderCars = await getCar.json();
    return {
      renderCars,
      total,
    };
  } catch (error) {
    throw new Error();
  }
}
