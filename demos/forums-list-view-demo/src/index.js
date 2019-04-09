import React from "react";
import ReactDOM from "react-dom";
import ForumPanel from "./forumPanel";
import TestData from "./testData";
import HeadImages from "./headImages";

ReactDOM.render(
  <div>
    <HeadImages headImages={TestData.mainPage.headImages} />
    {Object.keys(TestData.mainPage.forumGroups).map(n => (
      <ForumPanel
        forumGroupName={TestData.mainPage.forumGroups[n].forumGroupName}
        key={TestData.mainPage.forumGroups[n].forumGroupId}
        forums={TestData.mainPage.forumGroups[n].forums}
      />
    ))}
  </div>,
  document.querySelector("#root")
);
