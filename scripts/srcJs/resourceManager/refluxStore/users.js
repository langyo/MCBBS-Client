import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateUser'
]);

class Users extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            userGroups: db.get("users").value()
        };
		this.listenToMany(Actions);
	}

	updateUserGroup(id, object){
        let t = this.state.users;
        t[id] = object;
        db.set("users[" + id + "]", object).write();

        this.setState({
            users: t
        });
    }
}

Users.id = 'users';

export let actions = Actions;