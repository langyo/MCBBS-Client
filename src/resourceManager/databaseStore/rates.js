import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Rate extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            rates: db.get("rates["+ id + "]").value()
        };
		this.listenToMany(Actions.database.single.rate(id));
	}

	updateRate(object){
        db.set("rates[" + this.id + "]", object).write();

        this.setState({
            rates: object
        });
    }
}

export default Rate;