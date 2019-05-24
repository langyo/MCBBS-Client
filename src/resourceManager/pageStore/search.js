import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Search extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {

        };
		this.listenToMany(Actions.page.search);
	}
}

export default Search;