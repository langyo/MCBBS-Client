import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class UserInfo extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.userInfo);
	}
}

export default UserInfo;