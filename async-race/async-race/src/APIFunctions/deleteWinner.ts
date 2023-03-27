export default async function deleteWinner(id: number): Promise<void> {
  try {
    const url = `http://127.0.0.1:3000/winners/${id}`;
    const getCar = await fetch(url, { method: 'DELETE' });
    await getCar.json();
    // getCars();
    // return renderCars;
    // const deleteCar = await fetch(`${url}1`, { method: 'DELETE' });
    // console.log(await deleteCar.json());
  } catch (error) {
    throw new Error();
  }
}
