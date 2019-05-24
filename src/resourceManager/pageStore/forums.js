import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Forums extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.forums);
	}
}

export default Forums;