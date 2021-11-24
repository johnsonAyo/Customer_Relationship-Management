"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const db = "testdb.json";
const testUsers = [
    {
        "fullname": "Danny Of Lagos",
        "email": "danny@gmail.com",
        "gender": "Male",
        "phone": "08162143041",
        "address": "37, mende maryland, lagos",
        "notes": "This user got hot legs 🔥🔥🔥"
    },
    {
        "fullname": "M. J",
        "email": "emjay@gmail.com",
        "gender": "Male",
        "phone": "08188441180",
        "address": "sango ota, ogun state nigeria",
        "notes": "Ceo of Emjaydesignagency"
    }
];
function init() {
    fs_1.default.writeFileSync(__dirname + '/../../' + db, JSON.stringify(testUsers));
}
function pullDown() {
    fs_1.default.unlinkSync(__dirname + '/../../' + db);
}
module.exports = { init, pullDown };
