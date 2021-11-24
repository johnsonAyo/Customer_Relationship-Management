"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_1 = __importDefault(require("../service"));
const user_1 = __importDefault(require("../user"));
const router = express_1.default.Router();
const ResponseHandler = (status, message, data) => {
    return { status, message, data, success: true };
};
/* GET home page. */
router.get('/', function (req, res, next) {
    const users = service_1.default.getUsers();
    res.render('index', { users });
});
/* GET home page. */
router.get('/admin', function (req, res, next) {
    // const users = service.getUsers();
    res.render('admin', {});
});
/* GET one user. */
router.get('/:email', function (req, res, next) {
    let email = req.params.email;
    const user = service_1.default.getUser(email);
    res.send(user);
});
/* POST add user. */
router.post('/', function (req, res, next) {
    let body = req.body;
    const user = service_1.default.addUser(new user_1.default(body));
    const response = ResponseHandler(200, "successful", user);
    res.send(response);
});
/* Put update user. */
router.put('/', function (req, res, next) {
    let body = req.body;
    const user = service_1.default.updateUser(new user_1.default(body));
    const response = ResponseHandler(200, "successful", user);
    res.send(response);
});
/* DELETE delete user. */
router.delete('/:email', function (req, res, next) {
    let email = req.params.email;
    const user = service_1.default.deleteUser(email);
    const response = ResponseHandler(200, "successful", user);
    res.send(response);
});
exports.default = router;
