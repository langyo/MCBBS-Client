import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Register extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.register);
	}
}

export default Register;