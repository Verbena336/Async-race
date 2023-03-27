import { TCar } from '../types/types';

export default async function getCar(id: number):
Promise<TCar> {
  try {
    const url = `http://127.0.0.1:3000/garage/${id}`;

    const getCarItem = await fetch(url);
    const renderCar = await getCarItem.json();
    return renderCar;
  } catch (error) {
    throw new Error();
  }
}
