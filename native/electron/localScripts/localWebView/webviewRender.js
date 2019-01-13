import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

class VirtualBrowser extends React.Component {
    virtualBrowsers = [];

    handleCallBack = (n) => {
        console.log(n);
        switch (n.state) {
            case 'newTask':
                console.log('Done! ' + this.url);
                for (let i of n.newTask) {
                    console.log('Loading: ' + i);
                    console.log(this);
                    this.newBrowser(i);
                    this.props.refreshFunction && this.refreshFunction();
                }
                break;
            case 'success':
                console.log('Done! ' + this.url);
                break;
            case 'error':
                console.error('There\'s someting wrong at this url :' + this.url)
                console.error(n.data);
                break;
            case 'log':
                console.log(n.data);
            default:
        }
    }

    newBrowser = (url) => {
        for (let i of Object.keys(pageBindScript)) {
            for (let exprString of Object.keys(pageBindScript[i].url)) {
                // 如果匹配对应正则表达式，则凭此项对应的 preload 列表对 <webview /> 进行初始化
                let expr = new RegExp(exprString);
                if (expr.test(url)) {
                    this.virtualBrowsers.push(<WebView url={url} callBack={this.handleCallBack} key={shortid.generate()} />);
                    return;
                }
            }
        }
        // 没有任何匹配时，当然就要报错了
        throw Error("URL 解析错误：已阅，狗屁不通！");
    }

    render() {
        return (<div>
            {this.virtualBrowsers.map(n => n)}
        </div>)
    }
}

VirtualBrowser.PropTypes = {
    parentRefresh: PropTypes.func
};

export default VirtualBrowser;