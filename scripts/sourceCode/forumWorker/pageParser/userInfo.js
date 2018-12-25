let users = {};

users[/[0-9]+/.exec(document.querySelectorAll('#ct > div > div.bm.bw0 > div > div.bm_c.u_profile > div:nth-child(1) > h2 > span')[0].innerText.trim())[0]] = {
    name: document.querySelectorAll('#uhd > div.h.cl > h2')[0].innerText.trim(),
}

for(let i of document.querySelectorAll('div.pbm.mbm.bbda.cl > ul > li')){
	switch(i.querySelector('em').innerText.trim()){
        case '邮箱状态':
        case '视频认证':
        case '自定义头衔':
        case '个人签名':
        case '统计信息':
        case '星座':
        case '个人主页':
        case 'Java版ID':
        case '基岩版ID':
        case '管理组':
        case '用户组':
        case '扩展用户组':
        case '在线时间':
        case '注册时间':
        case '最后访问':
        case '上次活动时间':
        case '上次发表时间':
        case '所在时区':
    }
}