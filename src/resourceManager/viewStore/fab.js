import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Fab extends Reflux.Store {
    constructor() {
        super();
        this.state = {
            toggleTo: ''
        };
        this.listenToMany(Actions.view.fab);
    }

    toggleTo(id) {

    }

    reset() {

    }
}

export default new Fab();