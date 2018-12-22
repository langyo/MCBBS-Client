import React from "react";
import ReactDOM from "react-dom";
import ForumPanel from "../utils/forumPanel";
import TestData from "../testData";
import HeadImages from "../utils/headImages";

class MainPage extends React.Component {
    render() {
        return (
            <div>
                <HeadImages headImages={TestData.mainPage.headImages} />
                {Object.keys(TestData.mainPage.forumGroups).map(n => (
                    <ForumPanel
                        forumGroupName={TestData.mainPage.forumGroups[n].forumGroupName}
                        key={TestData.mainPage.forumGroups[n].forumGroupId}
                        forums={TestData.mainPage.forumGroups[n].forums}
                    />
                ))}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(MainPage);
