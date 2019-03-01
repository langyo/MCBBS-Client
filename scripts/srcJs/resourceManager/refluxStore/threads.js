import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

import Actions from "../actions";

class Thread extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            threads: db.get("threads["+ id + "]").value()
        };
		this.listenToMany(Actions.single.thread);
	}
	
	updateThread(object){
        db.set("threads[" + this.id + "]", object).write();

        this.setState({
            threads: object
        });
    }
}

export default Thread;