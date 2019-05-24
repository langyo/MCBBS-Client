import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Theme extends Reflux.Store {
	constructor() {
		super();
		this.state = {
            primaryColor: '#39C5BB',
            secondaryColor: '#66CCFF'
		};
		this.listenToMany(Actions.view.theme);
	}

	togglePrimary(color) {
		this.setState({ primaryColor: color });
	}

	toggleSecondary(color) {
		this.setState({ secondaryColor: color })
	}
}

export default new Theme();