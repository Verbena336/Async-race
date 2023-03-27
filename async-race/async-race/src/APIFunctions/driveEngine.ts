export default async function driveEngine(id: number): Promise<boolean | void> {
  try {
    const url = `http://127.0.0.1:3000/engine/?id=${id}&status=drive`;

    const getCar = await fetch(url, { method: 'PATCH' });
    const renderCars = getCar.ok;
    return renderCars;
  } catch (error) {
    throw new Error();
  }
}
