import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class MainPage extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.mainPage);
	}
}

export default MainPage;