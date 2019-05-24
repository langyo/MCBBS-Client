import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Settings extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.settings);
	}
}

export default Settings;