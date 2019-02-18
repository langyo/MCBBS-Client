import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

let conf = low(new LocalStorage('conf'));

export default conf;
