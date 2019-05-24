import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Users extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {
            userGroups: db.get("users").value()
        };
		this.listenToMany(Actions.database.user);
	}

	updateUserGroup(object){

    }
}

export default Users;