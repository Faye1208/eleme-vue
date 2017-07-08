/**
 * Created by linying on 2017/7/8.
 */
var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var opn = require('opn');
var app = express();

var router = express.Router();

router.get('/', function(req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

//编写路由
var apiRoutes = express.Router();

//开发规范都会在返回一个接口的时候会有一个字段叫errno,errno是根据业务方设定用于标识出现错误原因的，下方所用的errno为0标识没有错误
apiRoutes.get('/seller', function(request, response) {
  response.json({
    errno: 0,
    data: seller
  })
});

apiRoutes.get('/goods', function(request, response) {
  response.json({
    errno: 0,
    data: goods
  })
});

apiRoutes.get('/ratings', function(request, response) {
  response.json({
    errno: 0,
    data: ratings
  })
});

// 在express中使用，需要调用express的对象app
// 然后使用use方法，通常带两个参数，路径和路由对象，其中与api相关的路径使用'/api'，如本地服务器localhost:8080/api/seller
app.use('/api', apiRoutes);

app.use(express.static('./dist'));

var uri = 'http://localhost:' + port;

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return
  }

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }
});
