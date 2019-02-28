import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateThread'
]);

class Thread extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            threads: db.get("threads["+ id + "]").value()
        };
		this.listenToMany(Actions);
	}
	
	updateThread(object){
        db.set("threads[" + this.id + "]", object).write();

        this.setState({
            threads: object
        });
    }
}

Thread.id = 'threads';

export let ret = Thread;