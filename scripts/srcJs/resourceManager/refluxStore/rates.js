import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateRate'
]);

class Rates extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            rates: db.get("rates["+ id + "]").value()
        };
		this.listenToMany(Actions);
	}

	updateRate(object){
        db.set("rates[" + this.id + "]", object).write();

        this.setState({
            rates: object
        });
    }
}

Rates.id = 'rates';

export let ret = Rates;