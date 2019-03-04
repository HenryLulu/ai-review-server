const AipNlpClient = require("baidu-aip-sdk").nlp;

const {APP_ID, API_KEY, SECRET_KEY} = require('../conf/auth_npl');

const client = new AipNlpClient(APP_ID, API_KEY, SECRET_KEY);

module.exports = client;