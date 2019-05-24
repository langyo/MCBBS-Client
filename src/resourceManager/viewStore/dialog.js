import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Dialog extends Reflux.Store {
	constructor() {
		super();
		this.state = {
			show: ''
		};
		this.listenToMany(Actions.view.dialog);
	}

	toggleTo(name) {
		this.setState({ show: name });
	}

	reset() {
		this.setState({ show: '' })
	}
}

export default new Dialog();