import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Rates extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {
            rates: db.get("rates").value()
        };
		this.listenToMany(Actions.database.rate);
	}

	updateRate(object){

    }
}

export default Rates;