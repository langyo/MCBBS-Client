import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class UserGroups extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            userGroups: db.get("userGroups").value()
        };
		this.listenToMany(Actions.database.userGroups);
	}

	updateUserGroup(id, object){
        let t = this.state.userGroups;
        t[id] = object;
        db.set("userGroups[" + id + "]", object).write();

        this.setState({
            userGroups: t
        });
    }
}

export default new UserGroups();