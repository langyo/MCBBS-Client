import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";

import LinearProgress from '@material-ui/core/LinearProgress';

import WebView from "./webview";

import pageBindScript from "../../../../scripts/srcJs/forumWorker/pageBindScript";
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

class VirtualBrowser extends Reflux.Component {
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
            this.renderingVirtualBrowsers.push(this.virtualBrowsers.length);
            this.virtualBrowsers.push(<WebView callBack={this.handleCallBack(this.virtualBrowsers.length)} key={shortid.generate()} data={this.taskStack.pop()} />);
        }
    };

    /**
     * @description 用于根据一个具体的 url 或标识对象，创建一个新的 webview
     * @example 下面是传入对象的基本数据结构；这种数据结构不仅仅用于创建浏览器，也用于所虚拟浏览器对象的相关说明信息存储
     * {
     *   type: "thread",  // 要查看有哪些类型，请查阅 scripts/src/forumWorker/pageBindScript
     *   url: "http://www.mcbbs.net/thread-811478-1-1.html",  // 可以没有
     *   args: {
     *     // 这里生成的供读取的链接参数，依赖于 scripts/src/forumWorker/pageBindScript
     *     threadID: 811478,
     *     threadPageIndex: 1
     *   }
     * }
     * @param n 传入的url 或标识对象
     */
    newBrowser = (n) => {
        if(typeof n === 'object'){
            // 给定参数为对象时，直接解析
            if(n.type === undefined) throw Error("[参数错误] 你没有指定解析的页面类型！");
        }else if(typeof n === 'string'){
            // 给定参数为字符串时，当作 URL 进行解析
            for (let i of Object.keys(pageBindScript)) {
                for (let exprString of pageBindScript[i].urlReg) {
                    // 如果匹配对应正则表达式，则凭此项对应的 preload 列表对 <webview /> 进行初始化
                    let expr = new RegExp(exprString);
                    let match;
                    if (match = expr.test(n)) {
                        console.log('%cMainThread ', 'color: blue;', "成功匹配 " + n);
                        // 初始化欲压入的对象
                        let obj = {
                            type: i,
                            args: {},
                            url: n
                        };
                        // 生成 args
                        for(let k = 0; k < match.length - 1; ++k){
                            obj.args[pageBindScript[i].urlRegArgsIndex[k]] = match[k + 1];
                        }
                        this.taskStack.push(obj);
                        console.log(this.taskStack);
                        this.checkBrowserStack();
                        this.hasLoad && this.setState({});
                        console.log(this.virtualBrowsers);
                        return;
                    }
                }
            }
            // 没有任何匹配时，当然就要报错了
            throw Error("[参数错误] URL 解析错误：已阅，狗屁不通！");
        }else throw Error("[参数错误] 你到底传进来个啥玩意嘛……")
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
