import fs from 'fs';

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
    fs.writeFileSync(__dirname+'/../../'+db, JSON.stringify(testUsers));
}

function pullDown() {
    fs.unlinkSync(__dirname+'/../../'+db);
}

export = {init, pullDown}
