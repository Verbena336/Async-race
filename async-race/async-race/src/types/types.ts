export interface IWinnersState {
  id: number,
  time: number,
  name: string,
  color: string,
  race: boolean
}

export type TProp = {
  amount: string;
  page: number
}

export type TCar = {
  name?: string,
  id?: number,
  color?: string,
}

export interface ICars {
  allCars: TCar[],
  currentCar: TCar,
  total: string | null,
}

export interface ICarsAPI {
  renderCars: TCar[],
  total: string | null,
}

export type TCarWin = {
  id: number,
  wins: number,
  time: number
}

export type startData = {
  velocity: number,
  distance: number,
}

export interface ICarsAPIWinners {
  renderCars: TCarWin[],
  total: string | null,
}
