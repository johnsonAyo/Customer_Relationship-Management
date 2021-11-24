import  express from 'express';
import { NextFunction, Request, Response } from "express";
import { ErrorInt } from '../inteface';
import service from '../service';
import User from '../user';


const router = express.Router();

const ResponseHandler = (status:number, message:string, data:object):ErrorInt =>{
  return { status, message, data, success: true }
}

/* GET home page. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  const users = service.getUsers();
  res.render('index', { users});
});

/* GET home page. */
router.get('/admin', function(req:Request, res:Response, next:NextFunction) {
  // const users = service.getUsers();
  res.render('admin', { });
});


/* GET one user. */
router.get('/:email', function(req:Request, res:Response, next:NextFunction) {
  let email: string = req.params.email;
  const user = service.getUser(email);
  res.send(user)
});


/* POST add user. */
router.post('/', function(req:Request, res:Response, next:NextFunction) {
  let body = req.body;
  const user = service.addUser(new User(body));
  const response = ResponseHandler(200, "successful", user)
  res.send(response)
})


/* Put update user. */
router.put('/', function(req:Request, res:Response, next:NextFunction) {
  let body = req.body;
  const user = service.updateUser(new User(body));
  const response = ResponseHandler(200, "successful", user)
  res.send(response)
})



/* DELETE delete user. */
router.delete('/:email', function(req:Request, res:Response, next:NextFunction) {
  let email: string = req.params.email;
  const user = service.deleteUser(email);
  const response = ResponseHandler(200, "successful", user)
  res.send(response)
});


export default  router;


