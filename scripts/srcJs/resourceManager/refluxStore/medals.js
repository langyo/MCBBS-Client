import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

import Actions from "../actions";

class Medals extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            medals: db.get("medals").value()
        };
		this.listenToMany(Actions.global.medals);
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

export default new Medals();