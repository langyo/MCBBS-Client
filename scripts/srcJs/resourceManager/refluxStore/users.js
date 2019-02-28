import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateUser'
]);

class Users extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            userGroups: db.get("users[" + id + "]").value()
        };
		this.listenToMany(Actions);
	}

	updateUserGroup(object){
        db.set("users[" + this.id + "]", object).write();

        this.setState({
            users: object
        });
    }
}

Users.id = 'users';

export default Users;