import { startData } from '../types/types';

export default async function startEngine(id: number): Promise<startData> {
  try {
    const url = `http://127.0.0.1:3000/engine/?id=${id}&status=started`;

    const getCar = await fetch(url, { method: 'PATCH' });
    const renderCars = await getCar.json();
    return renderCars;
  } catch (error) {
    throw new Error();
  }
}
