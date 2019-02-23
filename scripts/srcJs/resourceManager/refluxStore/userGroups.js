import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateUserGroup'
]);

class UserGroups extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            userGroups: db.get("userGroups").value()
        };
		this.listenToMany(Actions);
	}

	updateUserGroup(id, object){
        let t = this.state.userGroups;
        t[id] = object;
        db.set("userGroups[" + id + "]", object).write();

        this.setState({
            userGroups: t
        });
    }
}

UserGroups.id = 'userGroups';

export let actions = Actions;