import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Forum extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.forum);
	}
}

export default Forum;