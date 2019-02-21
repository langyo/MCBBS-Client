import Reflux from "reflux";

import db from "../../../localScripts/localDatabase/database";

const Actions = Reflux.createActions([
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
            mainPage: {
                // 版块
                forumGroups: [],
                // 头图
                headImages: [],
                // 主页上轮播的帖子
                headThreads: {
                    latestThread: [],
                    // 主页上的最新被回复的帖子
                    latestReply: [],
                    // 主页上的最新精华帖
                    latestStarThread: []
                }
            }
        };
		this.listenToMany(Actions);
	}
	
	increment()
	{
		var newCount = this.state.count + 1;
		this.setState({count: newCount});
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
        this.setState({
            mainPage: {
                forumGroups: t
            }
        });
        // TODO: 同时也要去操作 db
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