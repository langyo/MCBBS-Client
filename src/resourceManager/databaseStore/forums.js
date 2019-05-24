import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Forums extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            forums: db.get("forums[" + id + "]").value()
        };
		this.listenToMany(Actions.database.forums);
	}

	updateForum(object){
        db.set("forums[" + this.id + "]", object).write();

        this.setState({
            forums: object
        });
    }
}

export default new Forums;