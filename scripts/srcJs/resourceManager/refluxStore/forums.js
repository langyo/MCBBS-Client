import Reflux from "reflux";

import db from "../../../localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateForum'
]);

class Forums extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            forums: {
                // [map:版块特征码，特征码由对应板块在 URL 上体现的名称决定]
            }
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