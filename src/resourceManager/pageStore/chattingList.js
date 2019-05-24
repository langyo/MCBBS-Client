import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class ChattingList extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.chattingList);
	}
}

export default ChattingList;