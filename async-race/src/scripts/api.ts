import {
  ICar, ICars, Idrive, IEngine, IpropsOfCar, IWinner, IwinRace,
} from './interfaces';
import { genRandonElemOfArray, msConvertToSec } from './utils';
import brandCar from './brand-car';
import modelCar from './model-car';
import colors from './colors';

const LIMIT = 7;
const WINNERS_LIMIT = 10;
const BASE_URL = 'http://127.0.0.1:3000';
const GARAGE_PATH = `${BASE_URL}/garage`;
const WINNERS_PATH = `${BASE_URL}/winners`;
const ENGINE_PATH = `${BASE_URL}/engine`;

const getCars = async (page:number): Promise<ICars> => {
  const response = await fetch(`${GARAGE_PATH}?_page=${page}&_limit=${LIMIT}`);
  const data:ICar[] = await response.json();
  const total = response.headers.get('X-Total-Count') || '0';
  return {
    data,
    total,
  };
};
const getCar = async (id:number): Promise<ICar> => {
  const response = await fetch(`${GARAGE_PATH}/${id}`);
  const data = await response.json();
  return data;
};

const getArrayCars = ():IpropsOfCar[] => {
  const data = [];
  while (data.length < 100) {
    const model = genRandonElemOfArray(modelCar);
    const brand = genRandonElemOfArray(brandCar);
    data.push({
      name: `${brand} ${model}`,
      color: `${genRandonElemOfArray(colors)}`,
    });
  }
  return data;
};

const genCars = async ():Promise<void> => {
  const data = getArrayCars();
  data.forEach((obj) => {
    fetch(GARAGE_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
  });
};

const createCustomCar = async ():Promise<void> => {
  const nameInput = document.getElementById('create-name') as HTMLButtonElement;
  const colorInput = document.getElementById('create-clr') as HTMLButtonElement;

  const carData = {
    name: `${nameInput.value}`,
    color: `${colorInput.value}`,
  };
  fetch(GARAGE_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carData),
  });
};

const deleteCar = (id:string):void => {
  fetch(`${GARAGE_PATH}/${id}`, {
    method: 'DELETE',
  });
  fetch(`${WINNERS_PATH}/${id}`, {
    method: 'DELETE',
  });
};

const updateCar = async (id:string):Promise<void> => {
  const nameInput = document.getElementById('update-name') as HTMLButtonElement;
  const colorInput = document.getElementById('update-clr') as HTMLButtonElement;
  const oldProp = await getCar(Number(id));
  const obj = {
    id: oldProp.id,
    color: `${colorInput.value ? colorInput.value : oldProp.color}`,
    name: `${nameInput.value ? nameInput.value : oldProp.name}`,
  };
  fetch(`${GARAGE_PATH}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
};

const startAndStopEngine = async (id:string, status:string):Promise<IEngine> => {
  const response = await fetch(
    `${ENGINE_PATH}?id=${id}&status=${status}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data:IEngine = await response.json();
  return data;
};

const requestDrive = async (id:string):Promise<Idrive> => {
  const response = await fetch(
    `${ENGINE_PATH}?id=${id}&status=drive`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data:Idrive = await response.json();
  return data;
};

const updateWinner = async (winner:IwinRace, oldData:IWinner):Promise<void> => {
  const { id, wins } = oldData;
  const data = {
    id,
    wins: wins + 1,
    time: Math.min(msConvertToSec(winner.speed), oldData.time),
  };
  fetch(`${WINNERS_PATH}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const createWinner = async (winner:IwinRace):Promise<void> => {
  const { id, speed } = winner;
  const obj:IWinner = {
    id: Number(id),
    wins: 1,
    time: msConvertToSec(speed),
  };

  fetch(WINNERS_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
};

const checkWinner = async (winner:IwinRace):Promise<void> => {
  const { id } = winner;
  const responce = await fetch(`${WINNERS_PATH}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const oldWinner:IWinner = await responce.json();

  if (!oldWinner.id) {
    createWinner(winner);
  } else {
    updateWinner(winner, oldWinner);
  }
};

const getWinners = async (page:number, sortBy:string = 'id', orderBy:string = 'ASC'):Promise<IWinner[]> => {
  const response = await fetch(`${WINNERS_PATH}?_page=${page}&_limit=${WINNERS_LIMIT}&_sort=${sortBy}&_order=${orderBy}`);
  const data = await response.json();
  return data;
};

export {
  getCars, getCar, genCars, createCustomCar, deleteCar, updateCar,
  startAndStopEngine as startEngine, requestDrive, checkWinner, getWinners,
};
