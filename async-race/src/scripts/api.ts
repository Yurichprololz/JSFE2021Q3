import {
  ICar, ICars, IEngine, IWinner, IWinners,
} from './interfaces';

const BASE_URL = 'http://127.0.0.1:3000';
const GARAGE_PATH = `${BASE_URL}/garage`;
const WINNERS_PATH = `${BASE_URL}/garage`;
const ENGINE_PATH = `${BASE_URL}/garage`;

const getCars = async (): Promise<ICar[]> => {
  const response = await fetch(GARAGE_PATH);
  const data = await response.json();
  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { getCars };
