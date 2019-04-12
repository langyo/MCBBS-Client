import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import Memory from 'lowdb/adapters/Memory';

import init from '../../../../scripts/srcJs/resourceManager/databaseInitializer';

let db = low(new LocalStorage('db'));

init(db);

export default db;
