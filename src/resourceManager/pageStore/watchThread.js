import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class WatchThread extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.watchThread);
	}
}

export default WatchThread;