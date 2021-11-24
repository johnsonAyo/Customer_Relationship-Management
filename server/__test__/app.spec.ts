import request from 'supertest';
import app from '../app';
import seeder from './seeder';
import service from "../service"

beforeAll(() => {
  seeder.init();
});

afterAll(() => {
  seeder.pullDown();
});


//Post Endpoint
describe('Post Endpoints', () => {
 it('should create a new User', async () => {
    const data = {
      email: "oladapoi@gmail.com",
      fullname: "johnson Ayo",
      gender: "Male",
      phone: "08064661324",
      address: "ajah lagos",
      notes: "good work",
    }
    const res = await request(app)
      .post('/')
      .send(data);
      expect(res.body.data.email).toBe(data.email)
      expect(res.statusCode).toEqual(200);
  });

  it('should fetch the created new user', async () => {
    const email = "oladapoi@gmail.com";
    const res = await request(app).get(`/${email}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should return bad request if a compulsory data is misssing in a new post', async () => {
    const data = {
      email: "oladapoi@gmail.com",
      fullname: "",
      gender: "Male",
      phone: "08064661324",
      address: "ajah lagos",
      notes: "good work",
    }
    const res = await request(app)
      .post('/')
      .send(data);

    expect(res.statusCode).toEqual(400);
   });
  
   it('should return success if a non compulsory data is misssing in a new post. e.g notes', async () => {
    const data = {
      email: "mercy@gmail.com",
      fullname: "johnson Afuye",
      gender: "Male",
      phone: "08064661324",
      address: "ajah lagos",
      notes: "",
    }
    const res = await request(app)
      .post('/')
      .send(data);

    expect(res.statusCode).toEqual(200);
   });
})

// Get Endpoint

  describe('Get Endpoints', () => {
  it('should get all users', async () => {
    const res = await request(app).get('/');
     expect(res.statusCode).toEqual(200);
   });

  it('should fetch a single user', async () => {
    const email = "danny@gmail.com";
    const res = await request(app).get(`/${email}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should return not found if user mail passed is not in the database', async () => {
    const email = "ayo@gmail.com";
    const res = await request(app).delete(`/${email}`);
    expect(res.statusCode).toEqual(404);
  });

});


  //Update Endpoint
  describe('Update Endpoints', () => {
  it('should update user', async () => {
    const data = {
      "fullname": "M. J",
      "email": "emjay@gmail.com",
      "gender": "Male",
      "phone": "08188441180",
      "address": "sango ota, ogun state nigeria",
      "notes": "Ceo of Emjaydesignagency"
    }
    const res = await request(app)
      .put('/')
      .send(data);

    console.log(res.body);
    expect(res.statusCode).toEqual(200);

  });
})


// Delete Endpoint
 describe('Delete Endpoints', () => {

  it('should delete a single user', async () => {
    const email = "danny@gmail.com";
    const res = await request(app).delete(`/${email}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should return not found if a get request is padded on  the deleted user', async () => {
    const email = "danny@gmail.com";
    const res = await request(app).get(`/${email}`);
    expect(res.statusCode).toEqual(404);
  });

  it('should return not found if user mail passed in to be deleted is not in the database', async () => {
  const email = "ayo@gmail.com";
    const res = await request(app).delete(`/${email}`);
    expect(res.statusCode).toEqual(404);
  });


})

