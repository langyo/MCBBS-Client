import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateForum'
]);

class Forums extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            forums: db.get("forums").value()
        };
		this.listenToMany(Actions);
	}

	updateForum(id, object){
        let t = this.state.forums;
        t[id] = object;
        db.set("forums[" + id + "]", object).write();

        this.setState({
            forums: t
        });
    }
}

Forums.id = 'forums';

export let actions = Actions;