import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class User extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            userGroups: db.get("users[" + this.id + "]").value()
        };
		this.listenToMany(Actions.database.single.user(id));
	}

	updateUserGroup(object){
        db.set("users[" + this.id + "]", object).write();

        this.setState({
            users: object
        });
    }
}

export default User;