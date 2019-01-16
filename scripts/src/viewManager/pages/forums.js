import React from "react";
import { withStyles } from "@material-ui/core/styles";

import ForumPanel from "../utils/forumPanel";

import TestData from "../testData";

const styles = theme => ({
  padding: {
    padding: "8px"
  }
});

class MainPage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
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
