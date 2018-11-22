# monkey

## 示例

    import { Monkey } from 'plugin/langyo/monkey/main.js';
    let monkey = new Monkey(mainPage.webContent.hostContent);
    monkey.bind("#/post[0-9]+/", "onClick", fn);
    monkey.watch("#/post[0-9]+/", fn2);