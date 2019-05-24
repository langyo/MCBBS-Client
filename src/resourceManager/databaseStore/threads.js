import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Threads extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {
            threads: db.get("threads").value()
        };
        
		this.listenToMany(Actions.database.thread);
	}
	
	updateThread(object){
        
    }
}

export default Threads;