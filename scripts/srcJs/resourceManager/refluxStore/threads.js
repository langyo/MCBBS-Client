import Reflux from "reflux";

import db from "../../../localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateThread'
]);

class Threads extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            threads: {
                // [map:帖子 id]
            }
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