import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateMedal'
]);

class Medals extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            medals: db.get("medals").value()
        };
		this.listenToMany(Actions);
	}

	updateMedal(id, object){
        let t = this.state.medals;
        t[id] = object;
        db.set("medals[" + id + "]", object).write();

        this.setState({
            medals: t
        });
    }
}

Medals.id = 'medals';

export let actions = Actions;