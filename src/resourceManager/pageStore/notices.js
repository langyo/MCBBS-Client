import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Notices extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.notices);
	}
}

export default Notices;