import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class RecentNews extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.recentNews);
	}
}

export default RecentNews;