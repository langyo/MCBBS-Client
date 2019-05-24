import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Reply extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.reply);
	}
}

export default Reply;