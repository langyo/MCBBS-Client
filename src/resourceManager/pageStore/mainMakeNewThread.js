import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class MainMakeNewThread extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.mainMakeNewThread);
	}
}

export default MainMakeNewThread;