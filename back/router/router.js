const express = require("express");
const Route = express.Router();
const user = require("./user");
const auth = require("./auth");
const category = require("./category");
const elastic = require("./elastic");




Route.route('/users/favorites')
    .post(auth.tokenVerify, user.CreateUserFavorite)
    .get(auth.tokenVerify, user.ReadUserFavorite)
    .delete(auth.tokenVerify, user.DeleteUserFavorite)

// user.js
Route.route('/users')
    .get(auth.tokenVerify, user.ReadUser)   
    .put(auth.tokenVerify, user.UpdateUser)  // UpdateUSer 수정해야댐
Route.post('/user/opinion', user.userOpinion);



// auth.js
//Route.post('/auth/login', auth.login, auth.CreateToken);
Route.post('/oauth/logout', auth.OauthLogout);
Route.post('/oauth', auth.OauthLogin);
Route.get('/state', auth.creatState);
Route.get('/newtoken',auth.getNewToken);


// category.js 
Route.get('/l-categories/:l/m-categories/:m/stores/:name/information', category.getStoreInformation);
Route.get('/l-categories/:l/m-categories/:m/stores/:name/menu', category.getStoreMenu);
Route.route('/l-categories/:l/m-categories/:m/stores/:name/review')
    .post(auth.tokenVerify, category.createReview)
    .get(auth.tokenVerify, category.getReview)
    .delete(auth.tokenVerify, category.deleteReview);
Route.get('/l-categories/:l/m-categories/:m/stores/location', category.getStoreLocation);
Route.get('/l-categories/:l/m-categories/:m/stores/:count', category.getStoreList);
Route.get('/l-categories/:l/m-categories/:m/stores', category.getStoreAll);
Route.get('/l-categories/:l/m-categories', category.getMiddleCategory);
Route.get('/l-categories', category.getLargeCategory);
Route.post('/categories/random', category.getRandom);

//elastic
//Route.get('/search/status', elastic.getElasticsearchStatus);
Route.post('/search/stores/:count',elastic.getElasticsearchStoreList)
Route.post('/search/store',elastic.pushElasticsearchStore);

//Route.get('/setting', elastic.setNoriTokenizer);
//Route.get('/test/test',elastic.deleteelastic);
//Route.get('/test/update', elastic.updateElasticsearch);
Route.get('/log',elastic.logging);


module.exports = Route