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
        // 主题头部解析
        if(document.querySelectorAll('#tath > a:nth-child(2)')[0].innerHTML){
            // 其它页时为一楼作者
            thread.author = document.querySelectorAll('#tath > a:nth-child(2)')[0].innerHTML
        }else{
            // 第一页时为查看量与回复量信息
            // 查看量
            thread.watchCount = document.querySelectorAll('#postlist > table:nth-child(1) > tbody > tr > td.pls.ptn.pbn > div > span:nth-child(2)')[0].innerHTML;
            // 回复量
            thread.replyCount = document.querySelectorAll('#postlist > table:nth-child(1) > tbody > tr > td.pls.ptn.pbn > div > span:nth-child(5)')[0].innerHTML;
        }
    }
};