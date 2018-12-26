import React from "react";
import { withStyles } from "@material-ui/core/styles";

import ForumPanel from "../utils/forumPanel";
import HeadImages from "../utils/headImages";

import TestData from "../testData";

const styles = theme => ({
});

class MainPage extends React.Component {
    render() {
        return (
            <div>
                <HeadImages headImages={TestData.mainPage.headImages} />
                {
                    Object.keys(TestData.mainPage.forumGroups).map(n => (
                        <ForumPanel
                            key={TestData.mainPage.forumGroups[n].forumGroupId}
                            forumGroupName={TestData.mainPage.forumGroups[n].forumGroupName}                 
                            forums={TestData.mainPage.forumGroups[n].forums}
                        />
                    ))
                }
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(MainPage);
