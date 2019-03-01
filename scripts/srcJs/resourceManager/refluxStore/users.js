import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

import Actions from "../actions";

class User extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            userGroups: db.get("users[" + id + "]").value()
        };
		this.listenToMany(Actions.single.user);
	}

	updateUserGroup(object){
        db.set("users[" + this.id + "]", object).write();

        this.setState({
            users: object
        });
    }
}

export default User;