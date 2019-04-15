const request = require('request');
const fs = require('fs');

const options = {
  url: 'http://www.mcbbs.net/forum-the_end-1.html',
  headers: {
    'Host': 'www.mcbbs.net',
    'Proxy-Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Referer': 'http://www.mcbbs.net/forum.php',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    // 'Cookie': 请所有调试者注意，千万别把自己登录账户的 Cookie 传到 Github 上，不然传上去要消除掉特别特别费事！！！
  },
  gzip: true
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log("准备写入文件");
    fs.writeFile('input.txt', body, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  }
}

request(options, callback);