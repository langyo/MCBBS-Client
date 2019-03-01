import Reflux from "reflux";

import db from "../../../../native/electron/localScripts/localDatabase/database";

import Actions from "../actions";

class MainPage extends Reflux.Store {
	constructor()
	{
		super();
		this.state = {
            mainPage: db.get("mainPage").value()
        };
		this.listenToMany(Actions.global.mainPage);
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

export default new MainPage();