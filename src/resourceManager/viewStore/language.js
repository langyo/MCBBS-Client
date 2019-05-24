import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Language extends Reflux.Store {
	constructor() {
		super();
		this.state = {
            language: 'zh-chs',
            pack: {}
		};
		this.listenToMany(Actions.view.language);
	}

	toggleTo(name) {
		this.setState({ language: name });
	}
}

export default new Language();