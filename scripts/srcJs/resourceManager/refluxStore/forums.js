import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateForum'
]);

class Forums extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            forums: db.get("forums[" + id + "]").value()
        };
		this.listenToMany(Actions);
	}

	updateForum(object){
        db.set("forums[" + this.id + "]", object).write();

        this.setState({
            forums: object
        });
    }
}

export default new Forums;