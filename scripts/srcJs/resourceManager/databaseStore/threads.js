import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let ActionManager = require("../actionManager");

class Thread extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            threads: db.get("threads["+ id + "]").value()
        };
        
		this.listenToMany(ActionManager.createActions("thread", id));
	}
	
	updateThread(object){
        db.set("threads[" + this.id + "]", object).write();

        this.setState({
            threads: object
        });
    }
}

export default Thread;