import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Report extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.report);
	}
}

export default Report;