import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class UserCenter extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.userCenter);
	}
}

export default UserCenter;