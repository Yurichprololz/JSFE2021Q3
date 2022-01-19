import {
  ICar, ICars, //* ICars, IEngine, IWinner, IWinners, */ /* Istate */
} from './interfaces';
import { genRandonElemOfArray } from './utils';
import brandCar from './brand-car';
import modelCar from './model-car';
import colors from './colors';
// import state from './state';

const LIMIT = 7;
const BASE_URL = 'http://127.0.0.1:3000';
const GARAGE_PATH = `${BASE_URL}/garage`;
// const WINNERS_PATH = `${BASE_URL}/winners`;
// const ENGINE_PATH = `${BASE_URL}/engine`;

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

const getArrayCars = () => {
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

const genCars = async () => {
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

const createCustomCar = async () => {
  const nameInput = document.getElementById('create-name') as HTMLButtonElement;
  const colorInput = document.getElementById('create-clr') as HTMLButtonElement;
  if (!nameInput.value) {
    alert('Enter name of your car');
    return;
  }
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

const deleteCar = async (id:string) => {
  await fetch(`${GARAGE_PATH}/${id}`, {
    method: 'DELETE',
  });
};

const updateCar = async (id:string) => {
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

export {
  getCars, getCar, genCars, createCustomCar, deleteCar, updateCar,
};
