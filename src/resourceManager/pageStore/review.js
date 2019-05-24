import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Review extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.review);
	}
}

export default Review;