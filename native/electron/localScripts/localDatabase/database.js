import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import Memory from 'lowdb/adapters/Memory';

import init from '../../scripts/resourceManager/initializer';

let db = low(
    process.env.NODE_ENV === 'test'
    ? new Memory()
    : new LocalStorage('db')
);

init(db);

export default db;