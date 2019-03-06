const clientNLP = require('./baidu/npl');
const clientOCR = require('./baidu/ocr');
const fs = require('fs');

var text = '来了来了，树叶们高兴地喊着，忽然，下起了雨，人们拿出了五颜六色的雨伞，这雨伞像色彩斑斓的花朵绽放着笑脸。';

// 调用DNN语言模型
// clientNLP.dnnlmCn(text).then(function(result) {
//     console.log(JSON.stringify(result));
// }).catch(function(err) {
//     console.log(err);
// });

// 调用文本纠错
// clientNLP.ecnet(text).then(function(result) {
//     console.log(JSON.stringify(result));
// }).catch(function(err) {
//     console.log(err);
// });


var image = fs.readFileSync('./img/9ecc1334a9c2b201867599729.jpg').toString('base64');

clientOCR.handwriting(image).then(data => {
    const text = data.words_result.map(item => item.words).join('');
    console.log(text);
}).catch(e => {
    console.log(e);
});