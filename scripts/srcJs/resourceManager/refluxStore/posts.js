import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updatePost'
]);

class Posts extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            posts: db.get("posts").value()
        };
		this.listenToMany(Actions);
	}

	updatePosts(id, object){
        let t = this.state.posts;
        t[id] = object;
        db.set("posts[" + id + "]", object).write();

        this.setState({
            posts: t
        });
    }
}

Posts.id = 'posts';

export let actions = Actions;