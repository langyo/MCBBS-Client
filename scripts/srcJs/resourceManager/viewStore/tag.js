import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class UserGroups extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            
        };
		this.listenToMany(Actions.view.global.tag);
	}

	create(){

    }

    delete(){

    }

    toggleTo(){

    }
}

export default new UserGroups();