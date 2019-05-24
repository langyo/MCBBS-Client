import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class NewThread extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.newThread);
	}
}

export default NewThread;