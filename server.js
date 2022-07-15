const fs = require("fs");
const MysKeyTranslate = require("./utils/MysKeyTranslate.js"); // 引入刚才保存的文件
const data = require("./files/zh"); // 引入要翻译的文件

const translate = new MysKeyTranslate({
  appid: "", // 你的appid  去百度开发者平台查看 http://api.fanyi.baidu.com/doc/21
  secret: "", // 你的密钥
});

const language = ["en"]; // 需要翻译的语言

language.forEach((item) => {
  translate(data, { from: "zh", to: item }).then((res) => {
    createFile(item, res);
  });
});

function createFile(fileName, fileContent) {
  fs.writeFileSync(
    `${fileName}.js`,
    `const ${fileName} = ${JSON.stringify(
      fileContent
    )}; export default ${fileName}`
  );
}
