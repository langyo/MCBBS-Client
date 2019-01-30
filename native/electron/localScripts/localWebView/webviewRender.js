import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";

import LinearProgress from '@material-ui/core/LinearProgress';

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

let virtualBrowserCount = db.get("local.browserSettings.maxVirtalBrowserCount").value();

// let urlTimeStamp = []; // 此部分将直接与数据库对接

class VirtualBrowser extends React.Component {
    state = {};

    hasLoad = false;
    taskStack = [];
    virtualBrowsers = [];
    renderingVirtualBrowsers = [];

    handleCallBack = function (id) {
        return (n) => {
            switch (n.state) {
                case 'newTask':
                    // 清除此 webview 在 renderingVirtualBrowsers 中的标识，使 React 卸载这个页面
                    this.renderingVirtualBrowsers.splice(this.renderingVirtualBrowsers.indexOf(id), 1);
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
                    this.renderingVirtualBrowsers.splice(this.renderingVirtualBrowsers.indexOf(id), 1);
                    this.setState({});

                    console.log('%cMainThread ', 'color: blue;', 'Done!');

                    this.checkBrowserStack();
                    break;
                case 'error':
                    console.log('%cMainThread ', 'color: blue;', 'There\'s someting wrong at this url :' + this.url)
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
        while (this.taskStack.length > 0 && this.renderingVirtualBrowsers.length <= virtualBrowserCount) {
            this.renderingVirtualBrowsers.push(virtualBrowsers.length);
            this.virtualBrowsers.push(<WebView callBack={this.handleCallBack(this.virtualBrowsers.length)} key={shortid.generate()} url={this.taskStack.pop()} />);
        }
    }

    /**
     * @description 用于根据一个具体的 url 或标识对象，创建一个新的 webview
     * @param {string|object} URL 或 一个包含了一些标识信息的对象
     * @todo 准备支持传入对象（不过 URL 形式也保留）
     * @todo 另外额外提一句，这个包含了额外标识信息的对象，其中必定有 type 与 url 两个键（也就是说不论你以哪种方式传入参数，此子程序总会自动帮你补全 url）
     */
    newBrowser = (n) => {
        for (let i of Object.keys(pageBindScript)) {
            for (let exprString of pageBindScript[i].url) {
                // 如果匹配对应正则表达式，则凭此项对应的 preload 列表对 <webview /> 进行初始化
                let expr = new RegExp(exprString);
                if (expr.test(n)) {
                    console.log('%cMainThread ', 'color: blue;', "成功匹配 " + n);
                    this.taskStack.push(n);
                    console.log(this.taskStack);
                    this.checkBrowserStack();
                    this.hasLoad && this.setState({});
                    console.log(this.virtualBrowsers);
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
            <div>
                {(!this.hasLoad) && (<LinearProgress />)}
                <div className={classes.hide}>
                    {this.renderingVirtualBrowsers.map(n => this.virtualBrowsers[n])}
                </div>
            </div>
        );
    }

    componentWillMount() {
        console.log('%cMainThread ', 'color: blue;', "Loading URL: " + this.props.url)
        this.newBrowser(this.props.url);
        this.hasLoad = true;
    }

    componentWillUnmount() {
        this.hasLoad = false;
    }
}

VirtualBrowser.propTypes = {
    url: PropTypes.string
};

export default withStyles(styles)(VirtualBrowser);