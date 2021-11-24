"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const seeder_1 = __importDefault(require("./seeder"));
beforeAll(() => {
    seeder_1.default.init();
});
afterAll(() => {
    seeder_1.default.pullDown();
});
describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const data = {
            email: "oladapoi@gmail.com",
            fullname: "johnson Ayo",
            gender: "Male",
            phone: "08064661324",
            address: "ajah lagos",
            notes: "good work",
        };
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/')
            .send(data);
        console.log(res.body);
        expect(res.statusCode).toEqual(200);
    });
    it('should fetch a single user', async () => {
        const email = "danny@gmail.com";
        const res = await (0, supertest_1.default)(app_1.default).get(`/${email}`);
        expect(res.statusCode).toEqual(200);
    });
    it('should update user', async () => {
        const data = {
            "fullname": "M. J",
            "email": "emjay@gmail.com",
            "gender": "Male",
            "phone": "08188441180",
            "address": "sango ota, ogun state nigeria",
            "notes": "Ceo of Emjaydesignagency"
        };
        const res = await (0, supertest_1.default)(app_1.default)
            .put('/')
            .send(data);
        console.log(res.body);
        expect(res.statusCode).toEqual(200);
    });
});
