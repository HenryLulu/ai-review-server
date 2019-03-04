const AipOcrClient = require("baidu-aip-sdk").ocr;

const {APP_ID, API_KEY, SECRET_KEY} = require('../conf/auth_ocr');

var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

module.exports = client;