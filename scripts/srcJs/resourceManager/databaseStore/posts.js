import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

import ActionManager from "../actionManager";

class Post extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            posts: db.get("posts[" + id + "]").value()
        };
		this.listenToMany(ActionManager.createActions("post", id));
	}

	updatePosts(object){
        db.set("posts[" + this.id + "]", object).write();

        this.setState({
            posts: object
        });
    }
}

export default Post;