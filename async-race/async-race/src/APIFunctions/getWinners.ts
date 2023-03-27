import { ICarsAPIWinners } from '../types/types';

export default async function getWinners(page: number, sort: string, order: string)
: Promise<ICarsAPIWinners> {
  try {
    const url = `http://127.0.0.1:3000/winners/?_page=${page}&_limit=10&_sort=${sort}&_order=${order}`;

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
