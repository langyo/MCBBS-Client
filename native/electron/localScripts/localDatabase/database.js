import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import Memory from 'lowdb/adapters/Memory';

let db = low(
    process.env.NODE_ENV === 'test'
    ? new Memory()
    : new LocalStorage('db')
);

db.defaults({
    // 默认数据
}).write();

export default db;