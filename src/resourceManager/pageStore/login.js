import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Login extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.login);
	}
}

export default Login;