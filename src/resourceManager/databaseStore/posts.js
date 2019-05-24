import Reflux from "reflux";

import db from "../database";

import Actions from "../actions";

class Posts extends Reflux.Store {
	constructor()
	{
        super();
		this.state = {
            posts: db.get("posts").value()
        };
		this.listenToMany(Actions.database.posts);
	}

	updatePosts(object){

    }
}

export default Posts;