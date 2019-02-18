// 解析的页面：
// home\.php\?mod=space&do=notice&view=(mypost(&type=(post|reward|at))?|interactive(&type=(poke|friend))?|system)

let notifications = {
    mypost: {
        post: {}
    },
    manage: {}
};

// 待修改

// 适用于 mod=space&do=notice&view=mypost&type=post
for (let i of document.querySelectorAll('#ct > div.mn > div.bm.bw0 > div.xld.xlda > div.nts > dl.cl')) {
    notifications.mypost.post[i.getAttribute('notice')] = (
        {
            noticer: /uid=([0-9]+)/.exec(i.querySelectorAll('dd.ntc_body > a')[0].getAttribute('href'))[1],
            fromHref: i.querySelectorAll('dd.ntc_body > a')[1].getAttribute('href'),
            toHref: i.querySelectorAll('dd.ntc_body > a')[2].getAttribute('href'),
            time: i.querySelector('dt > span > span') != undefined ? i.querySelector('dt > span > span').getAttribute('title') : i.querySelector('dt > span').innerText,
            id: i.getAttribute('notice')
        }
    );
}

// 适用于 mod=space&do=notice&view=manage
for (let i of document.querySelectorAll('#ct > div.mn > div.bm.bw0 > div.xld.xlda > div.nts > dl.cl')) {
    notifications.manage[i.getAttribute('notice')] = (
        {
            noticer: /uid=([0-9]+)/.exec(i.querySelectorAll('dd.ntc_body > a')[0].getAttribute('href'))[1],
            time: i.querySelector('dt > span > span') != undefined ? i.querySelector('dt > span > span').getAttribute('title') : i.querySelector('dt > span').innerText,
            id: i.getAttribute('notice'),
            content: i.querySelector('dd.ntc_body').innerText
        }
    );
}