let databaseLinker = (path) =>{

};

let urlLinker = (url) =>{

};

let parser = {
    chatting:(document) =>{

    },
    chattingList:(documnet) =>{

    },
    forum:(document) =>{

    },
    login:(document) =>{

    },
    newThread:(document) =>{

    },
    notices:(document) =>{

    },
    recentNews:(document) =>{

    },
    register:(document) =>{

    },
    reply:(document) =>{

    },
    report:(document) =>{

    },
    review:(document) =>{

    },
    search:(document) =>{

    },
    userCenter:(document) =>{

    },
    userInfo:(document) =>{

    },
    watchThread:(document) =>{
        let thread = {};
        // 主题作者，第一页时为一楼作者，其它页时楼主在主题头部位置
        /* document.querySelectorAll('#tath > a:nth-child(2)')[0].innerHTML */
        // 查看量
        thread.watchCount = document.querySelectorAll('#postlist > table:nth-child(1) > tbody > tr > td.pls.ptn.pbn > div > span:nth-child(2)')[0].innerHTML;
        // 回复量
        thread.replyCount = document.querySelectorAll('#postlist > table:nth-child(1) > tbody > tr > td.pls.ptn.pbn > div > span:nth-child(5)')[0].innerHTML;
    }
};