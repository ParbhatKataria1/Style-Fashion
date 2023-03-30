const express = require('express');
const { register, login } = require('../controller/auth.controller');
const auth = express.Router();

auth.post('/register', register)


module.exports = {auth}