interface ICar {
  name: string;
  color: string;
  id?: number;
}

type ICars = {
  data: ICar[];
  total: string;
};
interface IEngine {
  velocity: number;
  distance: number;
}

interface IWinner {
  id: number;
  wins: number;
  time: number;
}

type IWinners = IWinner[];

interface Istate{
  state: string
}

interface Idrive{
  success:boolean
}

interface IwinRace {
  id: string
  speed: number
  name: string
}
interface IpropsOfCar {
  name: string
  color: string
}

export {
  ICar, ICars, IEngine, IWinner, IWinners, Istate, Idrive, IwinRace, IpropsOfCar,
};
