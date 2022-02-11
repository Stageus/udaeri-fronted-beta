const express = require("express");
const Route = express.Router();
const user = require("./user");
const auth = require("./auth");
const category = require("./category");
const elastic = require("./elastic");



// user.js
Route.post('/support', auth.tokenVerify, user.payment);
Route.route('/users/favorites')
    .post(auth.tokenVerify, user.CreateUserFavorite)
    .get(auth.tokenVerify, user.ReadUserFavorite)
    .delete(auth.tokenVerify, user.DeleteUserFavorite)
Route.route('/users')
    .get(auth.tokenVerify, user.ReadUser)   
    .put(auth.tokenVerify, user.UpdateUser)
Route.post('/user/opinion', user.userOpinion);



// auth.js
//Route.post('/oauth/logout', auth.OauthLogout);
Route.post('/oauth', auth.OauthLogin)
Route.get('/state', auth.creatState)
Route.get('/newtoken',auth.getNewToken)

// category.js 
Route.get('/l-categories/:l/m-categories/:m/stores/:name/information', category.getStoreInformation);
Route.get('/l-categories/:l/m-categories/:m/stores/:name/menu', category.getStoreMenu);
Route.route('/l-categories/:l/m-categories/:m/stores/:name/review')
    .post(auth.tokenVerify, category.createReview)
    .get(auth.tokenVerify, category.getReview)
    .delete(auth.tokenVerify, category.deleteReview)
    .put(auth.tokenVerify, category.putReview)
Route.get('/l-categories/:l/m-categories/:m/stores/location', category.getStoreLocation);
Route.get('/l-categories/:l/m-categories/:m/stores/:count', category.getStoreList);
Route.get('/l-categories/:l/m-categories/:m/stores', category.getStoreAll);
Route.get('/l-categories/:l/m-categories', category.getMiddleCategory);
Route.get('/l-categories', category.getLargeCategory);
Route.post('/categories/random', category.getRandom);

//elastic
Route.get('/search/status', elastic.getElasticsearchStatus);
Route.post('/search/stores/:count',elastic.getElasticsearchStoreList)
Route.post('/search/store',elastic.pushElasticsearchStore);
Route.delete('/search/log',elastic.deleteelastic);
Route.get('/setting', elastic.setNoriTokenizer);
//Route.get('/test',elastic.apiLogging);


Route.post('/test',category.insertStore);
Route.post('/test/test',category.insertMenu);


module.exports = Route
