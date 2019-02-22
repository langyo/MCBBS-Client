import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateThread',
]);

class Threads extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            threads: {
                // [map:帖子 id]
            }
        };
		this.listenToMany(Actions);
	}
	
	// updateForumGroup(name, id, forums){
    //     let t = this.state.mainPage.forumGroups;
    //     t.push(
    //         {
    //             forumGroupName: name,
    //             forumGroupId: id,
    //             forums: forums
    //         }
    //     );

    //     db.set("mainPage.forumGroups", t).write();

    //     this.setState({
    //         mainPage: {
    //             forumGroups: t
    //         }
    //     });
    // }
}

Threads.id = 'threads';

export let out = {
    store: Reflux.GlobalState['threads'],
    actions: Actions
};