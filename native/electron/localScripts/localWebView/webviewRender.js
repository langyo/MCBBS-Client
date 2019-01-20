import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";

import WebView from "./webview";

import pageBindScript from "../../scripts/forumWorker/pageBindScript";
import db from "../localDatabase/database";

const styles = theme => ({
    hide: {
        width: 0,
        height: 0,
        margin: 0,
        padding: 0,
        display: "none"
    }
});

let virtualBrowsers = [];
let renderingVirtualBrowsers = [];
let virtualBrowserCount = db.get("local.browserSettings.maxVirtalBrowserCount").value();

let timeStamp = [];
let taskStack = [];

let timeoutObject;

class VirtualBrowser extends React.Component {
    state = {};

    hasLoad = false;

    handleCallBack = function (id) {
        return (n) => {
            switch (n.state) {
                case 'newTask':
                    // 清除此 webview 在 renderingVirtualBrowsers 中的标识，使 React 卸载这个页面
                    renderingVirtualBrowsers.splice(renderingVirtualBrowsers.indexOf(id), 1);
                    this.setState({});

                    console.log('%cMainThread ', 'color: blue;', 'Done!');
                    
                    for (let i of n.newTask) {
                        console.log('%cMainThread ', 'color: blue;', 'Loading: ' + i);
                        this.newBrowser("http://www.mcbbs.net/" + i);
                    }
                    this.checkBrowserStack();
                    break;
                case 'success':
                    // 清除此 webview 在 renderingVirtualBrowsers 中的标识，使 React 卸载这个页面
                    renderingVirtualBrowsers.splice(renderingVirtualBrowsers.indexOf(id), 1);
                    this.setState({});

                    console.log('%cMainThread ', 'color: blue;', 'Done!');
                    
                    this.checkBrowserStack();
                    break;
                case 'error':
                    console.log('%cMainThread ', 'color: blue;', 'There\'s someting wrong at this url :' + this.url)
                    // virtualBrowserState[id] = 'error';
                    this.checkBrowserStack();
                    break;
                case 'log':
                    console.log('%cMainThread ', 'color: blue;', 'Log data:');
                    console.log(n.data);
                    break;
                default:
            }
        }
    }

    checkBrowserStack = () => {
        while(taskStack.length > 0 && renderingVirtualBrowsers.length <= virtualBrowserCount){
            renderingVirtualBrowsers.push(virtualBrowsers.length);
            virtualBrowsers.push(<WebView callBack={this.handleCallBack(virtualBrowsers.length)} key={shortid.generate()} url={taskStack.pop()} />);
        }
    }

    newBrowser = (url) => {
        for (let i of Object.keys(pageBindScript)) {
            for (let exprString of pageBindScript[i].url) {
                // 如果匹配对应正则表达式，则凭此项对应的 preload 列表对 <webview /> 进行初始化
                let expr = new RegExp(exprString);
                if (expr.test(url)) {
                    console.log('%cMainThread ', 'color: blue;', "成功匹配 " + url);
                    taskStack.push(url);
                    console.log(taskStack);
                    this.checkBrowserStack();
                    this.hasLoad && this.setState({});
                    console.log(virtualBrowsers);
                    return;
                }
            }
        }
        // 没有任何匹配时，当然就要报错了
        throw Error("URL 解析错误：已阅，狗屁不通！");
    }

    render() {
        const { classes } = this.props;

        console.log('%cMainThread ', 'color: blue;', "Props:");
        console.log(this.props);

        return (
            <div className={classes.hide}>
                {renderingVirtualBrowsers.map(n => virtualBrowsers[n])}
            </div>
        );
    }

    componentWillMount() {
        this.hasLoad = true;
    }

    componentWillUnmount() {
        this.hasLoad = false;
    }

    constructor() {
        super();

        // 以下为调试代码
        this.newBrowser("http://www.mcbbs.net/forum.php?mod=guide&view=new");
    }
}

VirtualBrowser.propTypes = {
    refreshFunction: PropTypes.func,
    setProgressOpenFunction: PropTypes.func,
    setProgressCloseFunction: PropTypes.func
};

export default withStyles(styles)(VirtualBrowser);