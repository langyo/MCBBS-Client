import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateRate'
]);

class Rates extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            rates: db.get("rates").value()
        };
		this.listenToMany(Actions);
	}

	updateRate(id, object){
        let t = this.state.rates;
        t[id] = object;
        db.set("rates[" + id + "]", object).write();

        this.setState({
            rates: t
        });
    }
}

Rates.id = 'rates';

export let actions = Actions;