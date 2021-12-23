const express = require("express");
const Route = express.Router();
const user = require("./user");
const auth = require("./auth");
const category = require("./category");




Route.route('/users/favorites')
    .post(auth.tokenVerify, user.CreateUserFavorite)
    .get(auth.tokenVerify, user.ReadUserFavorite)
    .delete(auth.tokenVerify, user.DeleteUserFavorite)

// user.js
Route.route('/users')
    .post(user.CreateUser)                  // 체크
    .get(auth.tokenVerify, user.ReadUser)   
    .delete(auth.userIdentification, user.DeleteUser)
    .put(auth.tokenVerify, user.UpdateUser)  // UpdateUSer 수정해야댐



// auth.js
Route.post('/auth/login', auth.login, auth.CreateToken);
Route.post('/oauth/logout', auth.OauthLogout);
Route.post('/oauth', auth.OauthLogin);
Route.get('/state', auth.creatState);


// category.js 
Route.get('/l-categories/:l/m-categories/:m/stores/:name/information', category.getStoreInformation);
Route.get('/l-categories/:l/m-categories/:m/stores/:name/menu', category.getStoreMenu);
Route.route('/l-categories/:l/m-categories/:m/stores/:name/review')
    .post(auth.tokenVerify, category.createReview)
    .get(category.getReview)
Route.get('/l-categories/:l/m-categories/:m/stores/location', category.getStoreLocation);
Route.get('/l-categories/:l/m-categories/:m/stores/:count', category.getStoreList);
Route.get('/l-categories/:l/m-categories/:m/stores', category.getStoreAll);
Route.get('/l-categories/:l/m-categories', category.getMiddleCategory);
Route.get('/l-categories', category.getLargeCategory);
Route.get('/categories/:food_category/random', category.getRandom);





module.exports = Route