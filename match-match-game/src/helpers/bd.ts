import { Entry } from '../pages/score/entry/entry';
import { imageSrc } from '../classes/app';
import { Score } from '../pages/score/score';
import { BaseComponent } from '../shared/baseComponent';
import { routes } from '../router/routes';

export interface IUser {
  // [key: string]: string;
  firstName: string,
  lastName: string,
  email: string,
  photo: string,
  hash: string,
  score: number
}

let db: IDBDatabase;
let dbReq: IDBOpenDBRequest;
let users;

export function bdInit() {
  dbReq = indexedDB.open('userDB', 1);

  (<IDBOpenDBRequest>dbReq).onupgradeneeded = (event) => {
    db = (<IDBOpenDBRequest>event.target).result;
    const users = db.createObjectStore('users', { keyPath: 'id' });
  };

  (<IDBOpenDBRequest>dbReq).onsuccess = (event) => {
    db = (<IDBOpenDBRequest>event.target).result;
    // console.log(db);
  };
  (<IDBOpenDBRequest>dbReq).onerror = (event) => {
    alert('error opening database');
  };
}

function hashCode(string: string) {
  let hash = 0; let i; let
    chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function saveIdInLS(id: string) {
  localStorage.setItem('id', id);
}

export function getIdFromLS() {
  return localStorage.getItem('id');
}

export function addUser() {
  const firstName = (<HTMLInputElement>document.getElementById('first-name')).value;
  const lastName = (<HTMLInputElement>document.getElementById('last-name')).value;
  const email = (<HTMLInputElement>document.getElementById('email')).value;
  const hash = hashCode(`${firstName}${lastName}${lastName}`).toString();
  const photo = imageSrc;

  saveIdInLS(hash);

  // Запускаем транзакцию базы данных
  const tx = db.transaction(['users'], 'readwrite');
  // Получаем хранилище объектов "users"
  const userStore = tx.objectStore('users');
  // Добаляем пользователя в хранилище объектов
  const user = {
    firstName,
    lastName,
    email,
    photo,
    id: hash,
  };
  userStore.add(user);
  // Ожидаем завершения транзакции базы данных
  tx.oncomplete = () => {
    console.log('user added');
    // При завершении транзакции по добавлению пользователя вызовем функцию по отображению списка пользователей
    // getScoreTable();
  };
  tx.onerror = () => {
    saveIdInLS(hash);
  };
}

// export function getScoreTable() {
//   let tx = db.transaction('users');
//   let userStore = tx.objectStore('users');

//   // Запрашиваем всех пользователей
//   let userReq = userStore.getAll();

//   userReq.onsuccess = (event: Event) => {
//     let users: IUser[] = (<IDBRequest>event.target).result.filter((item: IUser) => item.score).sort((a: IUser, b: IUser) => a.score! < b.score! ? 1 : -1);
//     const tbody = document.querySelector('tbody');
//     const table = document.querySelector('table');

//     if (users.length > 0) {
//       users.forEach(user => {
//         const entry = new Entry(`${user.firstName} ${user.lastName}`, `${user.email}`, user.score);
//         tbody?.appendChild(entry.element);
//       });
//     }
//     table?.appendChild(tbody!);
//   }
//   userReq.onerror = () => {
//     console.log('error getting all users');
//   }
// }

export function updateUser(user: IUser, score: number) {
  const tx = db.transaction('users', 'readwrite');
  const userStore = tx.objectStore('users');

  user.score = score;
  const request = userStore.put(user);

  request.onerror = function (e) {
    console.log('error updating user');
  };

  request.onsuccess = function (e) {
    console.log('user updated');
  };
  tx.oncomplete = () => {
    console.log('user added');
    // При завершении транзакции по добавлению пользователя вызовем функцию по отображению списка пользователей
    // getScoreTable();
  };
}
export function saveScore(key: string, score: number) {
  const tx = db.transaction('users');
  const userStore = tx.objectStore('users');

  // Запрашиваем пользователя
  const userReq = userStore.get(key);

  userReq.onsuccess = function (event) {
    const user = (<IDBRequest>event.target).result;
    updateUser(user, score);
  };

  userReq.onerror = function () {
    console.log('error getting user');
  };
}
