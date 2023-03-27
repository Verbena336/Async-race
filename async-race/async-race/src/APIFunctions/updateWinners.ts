export default async function updateWinner(newCar: {time: number, wins: number, id: number}):
Promise<void> {
  try {
    const { time, wins, id } = newCar;
    const url = `http://127.0.0.1:3000/winners/${id}`;
    const getCar = await fetch(url, { method: 'PUT',
      body:
    JSON.stringify(newCar),
      headers: { 'Content-Type': 'application/json' } });
    const renderCars = await getCar.json();
    // getCars();
    return renderCars;
    // const deleteCar = await fetch(`${url}1`, { method: 'DELETE' });
    // console.log(await deleteCar.json());
  } catch (error) {
    throw new Error();
  }
}
