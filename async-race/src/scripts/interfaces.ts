interface ICar {
  name: string;
  color: string;
  id?: number;
  // total?: string | null;
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

export {
  ICar, ICars, IEngine, IWinner, IWinners, Istate, Idrive,
};
