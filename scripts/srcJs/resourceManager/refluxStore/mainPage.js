import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

let Actions = Reflux.createActions([
    'updateForumGroup',
    'updateHeadImages',
    'updateHeadThreads',
    'pushNewPublishedThread',
    'pushNewPublishedReply',
    'pushNewPublishedStarThread',
    'pushNewPublishedHotThread'
]);

class MainPage extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            mainPage: db.get("mainPage").value()
        };
		this.listenToMany(Actions);
	}
	
	updateForumGroup(name, id, forums){
        let t = this.state.mainPage.forumGroups;
        t.push(
            {
                forumGroupName: name,
                forumGroupId: id,
                forums: forums
            }
        );

        db.set("mainPage.forumGroups", t).write();

        this.setState({
            mainPage: {
                forumGroups: t
            }
        });
    }

    updateHeadImages(){

    }

    updateHeadThreads(){

    }

    pushNewPublishedThread(){

    }

    pushNewPublishedReply(){

    }

    pushNewPublishedStarThread(){

    }

    pushNewPublishedHotThread(){

    }
}

MainPage.id = 'mainPage';

export let actions = Actions;