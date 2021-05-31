import './score.scss';
import { BaseComponent } from '../../shared/baseComponent';
import { Entry } from './entry/entry';
import { IUser } from '../../helpers/bd';

export class Score extends BaseComponent {
  constructor(users: IUser[]) {
    super('div', ['score']);
    this.render(users);
  }

  render(users: IUser[]) {
    const header = new BaseComponent('h2', ['score-header']);
    const wrapper = new BaseComponent('div', ['table-wrapper']);
    const table = new BaseComponent('table', ['table']);
    const tbody = new BaseComponent('tbody');
    // const entry = new Entry('Nicci Troiani', 'nicci@gmail.com', 300);
    header.element.innerHTML = 'Best players';
    table.element.innerHTML = `
    <col style="width: 10%">
    <col style="width: 60%">
    <col style="width: 30%">`;
    // tbody.element.appendChild(entry.element);
    if (users.length > 0) {
      users.forEach((user) => {
        const entry = new Entry(`${user.firstName} ${user.lastName}`, `${user.email}`, user.score, `${user.photo}`);
        tbody.element.appendChild(entry.element);
      });
    }
    table.element.appendChild(tbody.element);
    wrapper.element.appendChild(table.element);
    this.element.appendChild(header.element);
    this.element.appendChild(wrapper.element);
  }

  static renderScoreTable = async (): Promise<IUser[]> => new Promise<IUser[]>((resolve) => {
    const dbReq = indexedDB.open('userDB', 1);
    let db: IDBDatabase;

    (<IDBOpenDBRequest>dbReq).onupgradeneeded = (event) => {
      db = (<IDBOpenDBRequest>event.target).result;
      const users = db.createObjectStore('users', { keyPath: 'id' });
    };

    (<IDBOpenDBRequest>dbReq).onsuccess = (event) => {
      db = (<IDBOpenDBRequest>event.target).result;
      const tx = db.transaction('users');
      const userStore = tx.objectStore('users');

      // Запрашиваем всех пользователей
      const userReq = userStore.getAll();

      userReq.onsuccess = (event: Event) => {
        const users: IUser[] = (<IDBRequest>event.target).result
          .filter((item: IUser) => item.score !== undefined)
          .sort((a: IUser, b: IUser) => (a.score! < b.score! ? 1 : -1))
          .slice(0, 10);
        resolve(users);
      };
      userReq.onerror = () => {
        console.log('error getting all users');
      };
    };
    (<IDBOpenDBRequest>dbReq).onerror = (event) => {
      alert('error opening database');
    };
  });
}
