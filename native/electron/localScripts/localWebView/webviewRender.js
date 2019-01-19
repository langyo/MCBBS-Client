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
let virtualBrowserCount = db.get("local.browserSettings.maxVirtalBrowserCount").value();
let virtualBrowserState = [];
/*
    virtualBrowserState 的每一个元素为下述的其中一种值：
        - free : 空闲
        - loading : 正在加载页面
        - waiting : 正在等待主进程提供数据
        - error : 出错
*/

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
                    console.log('%cMainThread ', 'color: blue;', 'Done!');
                    virtualBrowserState[id] = 'free';
                    console.log('%cMainThread ', 'color: blue;', "当前的 virtualBrowserState 列表：");
                    console.log(virtualBrowserState);
                    for (let i of n.newTask) {
                        console.log('%cMainThread ', 'color: blue;', 'Loading: ' + i);
                        this.newBrowser("http://www.mcbbs.net/" + i);
                    }
                    this.checkBrowserStack();
                    break;
                case 'success':
                    console.log('%cMainThread ', 'color: blue;', 'Done!');
                    virtualBrowserState[id] = 'free';
                    console.log('%cMainThread ', 'color: blue;', "当前的 virtualBrowserState 列表：");
                    console.log(virtualBrowserState);
                    this.checkBrowserStack();
                    break;
                case 'error':
                    console.log('%cMainThread ', 'color: blue;', 'There\'s someting wrong at this url :' + this.url)
                    virtualBrowserState[id] = 'error';
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
        for (let i = 0; i < virtualBrowserCount; ++i) {
            // 检查哪个虚拟浏览器能用的，能就依次提取 taskStack 里的 URL
            if (virtualBrowserState[i] === 'free' && taskStack.length > 0) {
                // 查出错误了，下面这句压根就没成功修改 virtualBrowsers[i]
                // （我真的很懵……这都什么鬼畜问题……）
                virtualBrowsers[i] = <WebView id={i} callBack={this.handleCallBack(i)} key={shortid.generate()} url={taskStack.pop()} />;
                virtualBrowserState[i] = 'loading';
            }
            if (virtualBrowserState[i] === 'error') {
                console.log('%cMainThread ', 'color: blue;', "重新加载：" + virtualBrowsers[i].props.url)
                virtualBrowsers[i] = (<WebView id={i} callBack={this.handleCallBack(i)} key={shortid.generate()} url={virtualBrowsers[i].props.url} />)
            }
        }
        console.log('%cMainThread ', 'color: blue;', "当前的 taskStack 列表：");
        console.log(taskStack);
        console.log('%cMainThread ', 'color: blue;', "当前的 virtualBrowsers 列表：");
        console.log(virtualBrowsers);
        console.log('%cMainThread ', 'color: blue;', "当前的 virtualBrowserState 列表：");
        console.log(virtualBrowserState);
        // this.props.refreshFunction();
    }

    newBrowser = (url) => {
        for (let i of Object.keys(pageBindScript)) {
            for (let exprString of pageBindScript[i].url) {
                // 如果匹配对应正则表达式，则凭此项对应的 preload 列表对 <webview /> 进行初始化
                let expr = new RegExp(exprString);
                if (expr.test(url)) {
                    console.log('%cMainThread ', 'color: blue;', "成功匹配 " + url);
                    taskStack.push(url)
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
        const { classes, theme } = this.props;

        console.log('%cMainThread ', 'color: blue;', "Props:");
        console.log(this.props);

        return (
            <div className={classes.hide}>
                {virtualBrowsers.map(n => n)}
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
        for (let i = 0; i < virtualBrowserCount; ++i) {
            virtualBrowsers.push(<WebView id={i} callBack={this.handleCallBack(i)} key={shortid.generate()} />);
            virtualBrowserState.push('free');
        }
        console.log('%cMainThread ', 'color: blue;', "已加载 Virtual Browser");
        console.log(virtualBrowsers);
        console.log(virtualBrowserState);

        timeoutObject = setTimeout(() => {
            console.log('%cMainThread ', 'color: blue;', "定时事件：检查虚拟浏览器栈");
            this.checkBrowserStack();
        }, 5000);

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