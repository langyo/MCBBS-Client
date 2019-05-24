import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class ChooseAccount extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.chooseAccount);
	}
}

export default ChooseAccount;