import { imageSrc } from '../classes/app';

export interface IUser {
  firstName: string,
  lastName: string,
  email: string,
  photo: string,
  hash: string,
  score: number
}

let db: IDBDatabase;
let dbReq: IDBOpenDBRequest;

export function bdInit() {
  dbReq = indexedDB.open('userDB', 1);

  (<IDBOpenDBRequest>dbReq).onupgradeneeded = (event) => {
    db = (<IDBOpenDBRequest>event.target).result;
  };

  (<IDBOpenDBRequest>dbReq).onsuccess = (event) => {
    db = (<IDBOpenDBRequest>event.target).result;
  };
  (<IDBOpenDBRequest>dbReq).onerror = () => {
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
    hash |= 0;
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

  const tx = db.transaction(['users'], 'readwrite');
  const userStore = tx.objectStore('users');
  const user = {
    firstName,
    lastName,
    email,
    photo,
    id: hash,
  };
  userStore.add(user);
  tx.oncomplete = () => {
    console.log('user added');
  };
  tx.onerror = () => {
    saveIdInLS(hash);
  };
}

export function updateUser(user: IUser, score: number) {
  const tx = db.transaction('users', 'readwrite');
  const userStore = tx.objectStore('users');

  user.score = score;
  const request = userStore.put(user);

  request.onerror = function () {
    console.log('error updating user');
  };

  request.onsuccess = function () {
    console.log('user updated');
  };
  tx.oncomplete = () => {
    console.log('user added');
  };
}

export function saveScore(key: string, score: number) {
  const tx = db.transaction('users');
  const userStore = tx.objectStore('users');
  const userReq = userStore.get(key);

  userReq.onsuccess = function (event) {
    const user = (<IDBRequest>event.target).result;
    updateUser(user, score);
  };

  userReq.onerror = function () {
    console.log('error getting user');
  };
}
