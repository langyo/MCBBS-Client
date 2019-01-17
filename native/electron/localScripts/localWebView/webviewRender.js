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

class VirtualBrowser extends React.Component {
    state = {};
    virtualBrowsers = [];
    hasLoad = false;

    timeStamp = [];
    taskStack = [];

    handleCallBack = (n) => {
        console.log(n);
        switch (n.state) {
            case 'newTask':
                console.log('Done!');
                for (let i of n.newTask) {
                    console.log('Loading: ' + i);
                    this.newBrowser("http://www.mcbbs.net/" + i);
                    this.props.refreshFunction && this.refreshFunction();
                }
                break;
            case 'success':
                console.log('Done!');
                break;
            case 'error':
                console.error('There\'s someting wrong at this url :' + this.url)
                break;
            case 'log':
                console.log(n.data);
            default:
        }
    }

    newBrowser = (url) => {
        for (let i of Object.keys(pageBindScript)) {
            for (let exprString of pageBindScript[i].url) {
                // 如果匹配对应正则表达式，则凭此项对应的 preload 列表对 <webview /> 进行初始化
                let expr = new RegExp(exprString);
                if (expr.test(url)) {
                    console.log("成功匹配 " + url);
                    this.virtualBrowsers.push(<WebView url={url} callBack={this.handleCallBack} key={shortid.generate()} />);
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
        const { classes, theme } = this.props;

        return (
            <div className={classes.hide}>
                {this.virtualBrowsers.map(n => n)}
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
        let virtualBrowserCount = db.get("local.browserSettings.maxVirtalBrowserCount").value();
        for(let i = 0; i < virtualBrowserCount; ++i){
            
        }
        console.log("已加载 Virtual Browser");

        // 以下为调试代码
        this.newBrowser("http://www.mcbbs.net/forum\.php\?mod=guide&view=new");
    }
}

VirtualBrowser.propTypes = {
    refreshFunction: PropTypes.func,
    setProgressOpenFunction: PropTypes.func,
    setProgressCloseFunction : PropTypes.func
};

export default withStyles(styles)(VirtualBrowser);