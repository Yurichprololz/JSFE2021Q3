interface ICar {
  name: string;
  color: string;
  id: number;
}

type ICars = ICar[];

interface IEngine {
  velocity: Number;
  distance: Number;
}

interface IWinner {
  id: Number;
  wins: Number;
  time: Number;
}

type IWinners = IWinner[];

interface Istate{
  state: string
}
export {
  ICar, ICars, IEngine, IWinner, IWinners, Istate,
};
