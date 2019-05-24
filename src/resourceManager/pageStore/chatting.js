import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Chatting extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.chatting);
	}
}

export default Chatting;