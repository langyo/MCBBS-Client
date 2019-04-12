import Reflux from "reflux";

import db from "../database";

let ActionManager = require("../actionManager");

class Thread extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            threads: db.get("threads["+ id + "]").value()
        };
        
		this.listenToMany(ActionManager.database.single.createActions("thread", id));
	}
	
	updateThread(object){
        db.set("threads[" + this.id + "]", object).write();

        this.setState({
            threads: object
        });
    }
}

export default Thread;