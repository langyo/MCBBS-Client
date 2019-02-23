import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateThread'
]);

class Threads extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            threads: db.get("threads").value()
        };
		this.listenToMany(Actions);
	}
	
	updateThread(id, object){
        let t = this.state.threads;
        t[id] = object;
        db.set("threads[" + id + "]", object).write();

        this.setState({
            threads: t
        });
    }
}

Threads.id = 'threads';

export let actions = Actions;