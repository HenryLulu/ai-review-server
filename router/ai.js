const express = require('express');  
const router = express.Router();
const formidable = require('formidable');
const util = require('util');
const path = require('path');

const clientNLP = require('../baidu/npl');
const clientOCR = require('../baidu/ocr');
const fs = require('fs');
const gm = require('gm');

router.get('/set', (req, res) => {
    req.session.id = 111;
    res.end('suc');
})

router.get('/get', (req, res) => {
    res.end(JSON.stringify(req.session));
})

router.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm();
    // form.uploadDir = imagePath;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(JSON.stringify(err));
            res.json({
                code: 3,
                msg: '上传错误'
            });
        }
        gm(files['image'].path)
        .modulate(100, 150)
        .channel('Red')
        .write(files['image'].path + 'bk', e => {
            console.log(e);
            var image = fs.readFileSync(files['image'].path).toString('base64');
            var imagebk = fs.readFileSync(files['image'].path + 'bk').toString('base64');
            clientOCR.handwriting(imagebk).then(data => {
                const textbk = data.words_result.map(item => item.words).join('').slice(0, 100);
                console.log(textbk);
                Promise.all([clientNLP.dnnlmCn(textbk).then(function(result) {
                    return result;
                }), clientNLP.ecnet(textbk).then(function(result) {
                    return result;
                }), clientOCR.handwriting(image).then(data => {
                    return data.words_result.map(item => item.words).join('').slice(0, 100);
                })]).then(([dnn, cor, text]) => {
                    res.json({textbk, dnn, cor, text})
                }).catch(function(err) {
                    res.json({
                        code: 1,
                        msg: '评分接口错误'
                    });
                });
            }).catch(e => {
                console.log(e);
                res.json({
                    code: 2,
                    msg: 'OCR接口错误'
                });
            });
        })
    });
});

router.post('/base64', (req, res) => {
        var image = req.body;
        clientOCR.handwriting(image).then(data => {
            const text = data.words_result.map(item => item.words).join('').slice(0, 100);
            console.log(text);
            Promise.all([clientNLP.dnnlmCn(text).then(function(result) {
                return result;
            }), clientNLP.ecnet(text).then(function(result) {
                return result;
            })]).then(([dnn, cor]) => {
                res.json({text, dnn, cor})
            }).catch(function(err) {
                res.json({
                    code: 1,
                    msg: '评分接口错误'
                });
            });
        }).catch(e => {
            res.json({
                code: 2,
                msg: 'OCR接口错误'
            });
        });
});

module.exports = router;