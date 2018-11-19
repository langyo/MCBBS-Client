let sliceByChar = (char, str) => {
    let arr = [], pos = 0;
    let getOuterPos = (char, pos, str) =>{
        let left = str.indexOf(char, 0);
        let right = str.indexOf(char, pos);
        if(left < pos && pos < right) return right;
        return 0;
    };
    let getSearchBeginPos = (pos, str) => ['"', "'", "/"].map(n, getOuterPos(n, pos, str)).reduce((past, present) => past > present ? past : present);
    while(pos = str.indexOf(char, getSearchBeginPos(str.indexOf(char), str)), pos >= 0){
        arr.push(str.slice(0, pos));
        str = str.slice(pos);
        pos = 0;
    }
    arr.push(str);
    return arr;
};

let sliceByNewLine = str => sliceByChar("\n", str);
let sliceBySpace = str => sliceByChar(" ", str);

let parseCommandLine = (commands, doms) =>{
    // 待编辑
};

let parse = (str, dom) => sliceByNewLine(str).forEach(n => {
    // 待编辑
});