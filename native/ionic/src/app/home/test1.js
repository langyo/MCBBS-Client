var temp = {};
$('.ntsimg.cl>.img_l >a> img').each(
    function (i,j) {
        temp[i]={};
        temp[i]['img']=$(this).attr('src');
    }
);
$('.ntsimg.cl> .img_r > .atime').each(
    function (i,j) {
        temp[i]['time']=$(this).text();
    }
);
$('.ntsimg.cl> .img_r > .ntc_body').each(
    function (i,j) {
        $(this).children('a').each(function (i1, j1) {
            if(i1===0){
                temp[i]['name']=$(this).text();
                temp[i]['name_url']=$(this).attr('href');
            }
            else if(i1===1){
                temp[i]['title']=$(this).text();
                temp[i]['title_url']=$(this).attr('href');
            }
        })
    }
);
temp;
