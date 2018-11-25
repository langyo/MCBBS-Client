export default (document) =>{
    let thread = {};
    // 帖子回复列表解析
    let postList = document.querySelectorAll('#postlist > div');
    if(!Array.isArray(thread.posts)) thread.posts = [];
    for(let i = 0; i < postList.length; ++i){
        let match;
        if(match = /^post_([0-9]+)$/.exec(postList[i].id) ){
            thread.posts.push(match[1]);
        }
    }

    // 主题头部解析
    if(document.querySelectorAll('#tath > a:nth-child(2)') > 0){
        // 其它页时为一楼作者
        thread.author = document.querySelectorAll('#tath > a:nth-child(2)')[0].innerHTML
    }else{
        // 第一页时为查看量与回复量信息
        // 查看量
        thread.watchCount = document.querySelectorAll('#postlist > table:nth-child(1) > tbody > tr > td.pls.ptn.pbn > div > span:nth-child(2)')[0].innerHTML;
        // 回复量
        thread.replyCount = document.querySelectorAll('#postlist > table:nth-child(1) > tbody > tr > td.pls.ptn.pbn > div > span:nth-child(5)')[0].innerHTML;
        // 楼主检测
        thread.author = document.querySelectorAll('#postlist > div')[0]; // 待修改
    }

};