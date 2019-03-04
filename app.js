const express = require('express');
const cookieSession = require('cookie-session');

const app = express();

app.set('port',process.env.PORT || 7000);

app.use(cookieSession({
    name: 'token',
    keys: ['aaaaa'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use('/ai', require('./router/ai'));

app.listen(app.get('port'));  
console.log("listen on port:" + app.get('port'));  
