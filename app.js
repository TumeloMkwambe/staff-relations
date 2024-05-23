/** IMPORTS AND VARIABES */
const express = require('express');
const { auth } = require('express-openid-connect');
const { ManagementClient, ResponseError } = require('auth0');
const path = require('path');
var request = require("request");
const axios = require('axios');
const { headers } = require('next/headers');
require('dotenv').config();
const app = express();
const staticPath = path.join(__dirname, "views");
require('dotenv').config();

/** ******************************************************************************************************************* */
/** USER INFORMATION */
let id;
let email;
let name;
let token;
/** ******************************************************************************************************************* */


/** ******************************************************************************************************************* */
/** AUTHENTICATION */

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
};



/** ******************************************************************************************************************** */
/** AUTHORIZATION */

const management = new ManagementClient({
    domain: process.env.DOMAIN,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET
});

const getUserRoles = async (ID) => {
    return await management.users.getRoles({ id:  ID });
}
const getUserPermissions = async (ID) => {
    return await management.users.getPermissions({ id: ID });
}
const getRoles = async (array) => {
    for(let i = 0; i < array.length; ++i){
        id = array[i].id;
        let roles = await getUserRoles(id);
        let permissions = await getUserPermissions(id);
        array[i].roles = roles.data;
        array[i].permissions = permissions.data
    }
    return array;
}
const getUsers = async () => {
    return await management.users.getAll();
}




/** *********************************************************************************************************************** */
/** MIDDLEWARE */
app.set('view engine', 'ejs');
app.use(express.static(staticPath));
app.use(auth(config));
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.oidc.isAuthenticated();
    res.locals.user = req.oidc.user;
    next();
});




/** ************************************************************************************************************************ */
/** ROUTING */
app.get('/', (req, res) => {
    res.render('./homepage/home.ejs');
});

app.get('/signin', function (req, res, next) {
    if(req.oidc.isAuthenticated()){
        const id = req.oidc.user.sub;
        getUserRoles(id).then((result) => {
            if(result.data.length == 0){ // User with no role
                res.redirect('/unassigned');
            }
            else if(result.data[0].id == 'rol_cXmp5WZeCYfL0JWm'){ // Admin Route
                res.redirect('/admin');
            }
            else if(result.data[0].id == 'rol_TtV8H0R8XuKJJxVq'){ // Manager Route
                res.redirect('/manager');
            }
            else if(result.data[0].id == 'rol_Ymj8mgv2HKBLuXor'){ // Employee Route
                res.redirect('/employee');
            }
        })
    }
    else{
        res.oidc.login({
            returnTo: `${process.env.BASEURL}/signin`
        });
    }
});




/** ************************************************************************************************************************* */
/** STAFF ROUTES */
app.get('/admin', (req, res) => {
    if(req.oidc.isAuthenticated()){
        console.log(token);
        email = req.oidc.user.email;
        name = req.oidc.user.name;
        res.render('./admin/Admin.ejs');
    }
    else{
        res.redirect('/signin');
    }
});
app.get('/manager', (req, res) => {
    if(req.oidc.isAuthenticated()){
        email = req.oidc.user.email;
        name = req.oidc.user.name;
        res.render('./manager/Manager.ejs');
    }
    else{
        res.redirect('/signin');
    }
});
app.get('/employee', (req, res) => {
    if(req.oidc.isAuthenticated()){
        email = req.oidc.user.email;
        name = req.oidc.user.name;
        res.render('./employee/Employee.ejs');
    }
    else{
        res.redirect('/signin');
    }
});
app.get('/unassigned', (req, res) => {
    if(req.oidc.isAuthenticated()){
        res.render('./homepage/unassigned.ejs');
    }
    else{
        res.redirect('/signin');
    }
});




/** ************************************************************************************************************************* */
/** ADMIN ROUTES */

app.get('/admin/createmeals', (req, res) => {
    const id = req.oidc.user.sub;
    getUserRoles(id).then((result) => {
        if(result.data[0].id == 'rol_cXmp5WZeCYfL0JWm'){
            res.render('./admin/aCreateMeal.ejs');
        }
        else{
            res.send('Access Denied.');
        }
    });
});

app.get('/admin/timesheet', (req, res) => {
    id = req.oidc.user.sub;
    getUserRoles(id).then((result) => {
        if(result.data[0].id == 'rol_cXmp5WZeCYfL0JWm'){
            res.render('./admin/aTimesheet.ejs');
        }
        else{
            res.send('Access Denied.');
        }
    });
});

app.get('/admin/employees', (req, res) => {
    id = req.oidc.user.sub;
    getUserRoles(id).then((result) => {
        if(result.data[0].id == 'rol_cXmp5WZeCYfL0JWm'){
            removeUserRole("auth0|66305ff998acd9be4cb207f1", "rol_Ymj8mgv2HKBLuXor");
            res.render('./admin/eSection.ejs');
        }
        else{
            res.send('Access Denied.');
        }
    });
});

app.get('/admin/bookings', (req, res) => {
    id = req.oidc.user.sub;
    getUserRoles(id).then((result) => {
        if(result.data[0].id == 'rol_cXmp5WZeCYfL0JWm'){
            res.render('./admin/viewBookings.ejs');
        }
        else{
            res.send('Access Denied.');
        }
    });
});


/** ************************************************************************************************************************ */
/** EMPLOYEE ROUTES */
app.get('/employee/eTimesheet', (req, res) => {
    id = req.oidc.user.sub;
    getUserRoles(id).then((result) => {
        if(result.data[0].id == 'rol_Ymj8mgv2HKBLuXor'){
            res.render('./employee/eTimesheet.ejs');
        }
        else{
            res.send('Access Denied.');
        }
    });
});

app.get('/employee/eBooking', (req, res) => {
    id = req.oidc.user.sub;
    getUserRoles(id).then((result) => {
        if(result.data[0].id == 'rol_Ymj8mgv2HKBLuXor'){
            res.render('./employee/eBooking.ejs')
        }
        else{
            res.send('Access Denied.');
        }
    });
});

app.get('/employee/eBookMeal', (req, res) => {
    id = req.oidc.user.sub;
    getUserRoles(id).then((result) => {
        if(result.data[0].id == 'rol_Ymj8mgv2HKBLuXor'){
            res.render('./employee/eBookMeal.ejs')
        }
        else{
            res.send('Access Denied.');
        }
    });
});




/** ************************************************************************************************************************ */
/** API FOR USER INFORMATION */
app.get('/userinformation', (req, res) => {
    res.json({ 
        "email": email,
        "name": name,
    });
});

app.get('/users', (req, res) => {
    console.log(token);
    axios.request(body).then((response) => {
        console.log(JSON.stringify(response.data));
        }).catch((error) => {
            console.log(error);
        });

    let userIdArr = [];
    getUsers().then((response) => {
        data = response.data;
        for(let i = 0; i < data.length; ++i){
            userIdArr.push({
                "name": data[i].name,
                "email": data[i].email,
                "id": data[i].user_id,
            });
        }
        return userIdArr;
    }).then((users) => {
        getRoles(users).then((response) => {
            res.json(response);
        });
    });
});


/** TOKENS AND STUFF */

var options = { method: 'POST',
  url: 'https://boogeraids.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: `{"client_id":"${process.env.M2MAPPCLIENTID}","client_secret":"${process.env.M2MAPPCLIENTSECRET}","audience":"${process.env.AUDIENCE}","grant_type":"client_credentials"}` };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  token = body;
});

/** ADD, REMOVE AND UPDATE  */
let data = JSON.stringify({
  "roles": [
    "rol_TtV8H0R8XuKJJxVq"
  ]
});

const userId = "auth0|662212096589c98ee4812929";
let body = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `https://boogeraids.eu.auth0.com/api/v2/users/${userId}/roles`,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  data : data
};



/** ************************************************************************************************************************ */
/** PORT */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});