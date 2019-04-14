import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Forum extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.store = Store.database.single.forum(id);
		this.listenToMany(Actions.database.single.forum(id));
	}

	updateUserGroup(object){
        db.set("forums[" + this.id + "]", object).write();

        this.setState({
            users: object
        });
    }
}

export default Forum;