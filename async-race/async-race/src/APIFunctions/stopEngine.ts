export default async function stopEngine(id: number): Promise<void> {
  try {
    const url = `http://127.0.0.1:3000/engine/?id=${id}&status=stopped`;

    const getCar = await fetch(url, { method: 'PATCH' });
    const renderCars = await getCar.json();
    return renderCars;
    // console.log(renderCars);
  } catch (error) {
    throw new Error();
  }
}
