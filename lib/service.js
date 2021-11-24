"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const db = process.env.NODE_ENV == "test" ? "testdb.json" : "database.json";
const ErrorHandler = (status, message, data) => {
    return { status, message, data, success: false };
};
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function getUsers() {
    const users = fs_1.default.readFileSync(__dirname + '/../' + db, { encoding: 'utf8', flag: 'r' });
    return JSON.parse(users);
}
function getUser(email) {
    if (!email)
        throw (ErrorHandler(400, "User mail is required", {}));
    const users = getUsers();
    const user = users.find((user) => user.email == email);
    if (!user) {
        throw (ErrorHandler(404, "user Not Found", {}));
    }
    return user;
}
function addUser(newUser) {
    if (!newUser.fullname)
        throw (ErrorHandler(400, "User  full Name is required", {}));
    if (newUser.fullname.split(" ").length < 2)
        throw (ErrorHandler(400, "first name and last name required in full name", {}));
    if (!newUser.email)
        throw (ErrorHandler(400, "User mail is required", {}));
    if (!validateEmail(newUser.email))
        throw (ErrorHandler(400, "invalid email", {}));
    if (!newUser.gender)
        throw (ErrorHandler(400, "User gender is required", {}));
    if (!newUser.phone)
        throw (ErrorHandler(400, "User phone number is required", {}));
    if (newUser.phone.length < 11 || newUser.phone.length > 14)
        throw (ErrorHandler(400, "phone number can not be less than 11 or greater than 14", {}));
    if (!newUser.address)
        throw (ErrorHandler(400, "User Address is required", {}));
    newUser.email = newUser.email.toLowerCase();
    let isExistUser = false;
    try {
        let u = getUser(newUser.email);
        isExistUser = true;
    }
    catch (error) {
    }
    if (isExistUser)
        throw (ErrorHandler(400, "user with email already exist", {}));
    const data = fs_1.default.readFileSync(__dirname + '/../' + db, { encoding: 'utf8', flag: 'r' });
    const users = JSON.parse(data);
    users.push(newUser);
    fs_1.default.writeFileSync(__dirname + '/../' + db, JSON.stringify(users));
    return newUser;
}
function updateUser(newUser) {
    if (!newUser.email)
        throw (ErrorHandler(400, "User mail is required", {}));
    const data = fs_1.default.readFileSync(__dirname + '/../' + db, { encoding: 'utf8', flag: 'r' });
    const users = JSON.parse(data);
    let updateUser = users.find((user) => user.email == newUser.email);
    if (!updateUser) {
        throw (ErrorHandler(404, "user Not Found", {}));
    }
    users.map((user) => {
        if (user.email == newUser.email) {
            if (newUser.fullname)
                user.fullname = newUser.fullname;
            if (newUser.gender)
                user.gender = newUser.gender;
            if (newUser.phone)
                user.phone = newUser.phone;
            if (newUser.phone.length < 11 || newUser.phone.length > 14)
                throw (ErrorHandler(400, "number can not be less than 11 or greater than 14", {}));
            if (newUser.address)
                user.address = newUser.address;
            if (newUser.notes)
                user.notes = newUser.notes;
            updateUser = user;
        }
        return user;
    });
    fs_1.default.writeFileSync(__dirname + '/../' + db, JSON.stringify(users));
    return updateUser;
}
function deleteUser(email) {
    if (!email)
        throw (ErrorHandler(400, "User mail is required", {}));
    const data = fs_1.default.readFileSync(__dirname + '/../' + db, { encoding: 'utf8', flag: 'r' });
    const users = JSON.parse(data);
    const deleteUser = users.find((user) => user.email == email);
    if (!deleteUser) {
        throw (ErrorHandler(404, "user Not Found", {}));
    }
    var newUsers = users.filter((user) => user.email != email);
    fs_1.default.writeFileSync(__dirname + '/../' + db, JSON.stringify(newUsers));
    return deleteUser;
}
module.exports = { getUsers, getUser, addUser, updateUser, deleteUser };
