import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updatePost'
]);

class Posts extends Reflux.Store {
	constructor(id)
	{
        super();
        this.id = id;
		this.state = {
            posts: db.get("posts[" + id + "]").value()
        };
		this.listenToMany(Actions);
	}

	updatePosts(object){
        db.set("posts[" + this.id + "]", object).write();

        this.setState({
            posts: object
        });
    }
}

Posts.id = 'posts';

export let out = Posts;