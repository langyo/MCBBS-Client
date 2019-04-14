import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Post extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            posts: db.get("posts[" + id + "]").value()
        };
		this.listenToMany(Actions.database.single.post(id));
	}

	updatePosts(object){
        db.set("posts[" + this.id + "]", object).write();

        this.setState({
            posts: object
        });
    }
}

export default Post;