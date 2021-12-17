const express = require("express");
const Route = express.Router();
const user = require("./user");
const auth = require("./auth");
const category = require("./category");


// user.js
Route.route('/users')
    .post(user.CreateUser)                  // 체크
    .get(auth.tokenVerify, user.ReadUser)   
    .delete(auth.userIdentification, user.DeleteUser)
    .put(auth.tokenVerify, user.UpdateUser)  // UpdateUSer 수정해야댐

Route.route('/users/favorites')
    .post(auth.tokenVerify, user.CreateUserFavorite)
    .get(auth.tokenVerify, user.ReadUserFavorite)
    .delete(auth.tokenVerify, user.DeleteUserFavorite)



// auth.js
Route.post('/auth/login', auth.login, auth.CreateToken);


// category.js 
Route.get('/l-categories', category.getLargeCategory);
Route.get('/l-categories/:l/m-categories', category.getMiddleCategory);
Route.get('/l-categories/:l/m-categories/:m/stores', category.getStoreList);
Route.get('/l-categories/:l/m-categories/:m/stores/location', category.getStoreLocation);
Route.get('/l-categories/:l/m-categories/:m/stores/:name/information', category.getStoreInformation)
Route.get('/l-categories/:l/m-categories/:m/stores/:name/menu', category.getStoreMenu)
Route.route('/l-categories/:l/m-categories/:m/stores/:name/review')
    .post(auth.tokenVerify, category.createReview)
    .get(category.getReview)
Route.get('/categories/:food_category/random', category.getRandom);





module.exports = Route