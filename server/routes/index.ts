import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { ErrorInt, Db } from '../inteface';
import service from '../service';
import { User, Admin } from '../user';
import { hash, compare } from 'bcryptjs';
import { createAccessToken, createRefreshToken } from '../middleware/token';
import fs from 'fs';
import path from 'path';
import { auth } from '../middleware/auth';

const router = express.Router();

const ResponseHandler = (
  status: number,
  message: string,
  data: object
): ErrorInt => {
  return { status, message, data, success: true };
};

/* GET home page. */

const welcome = (req: Request, res: Response, next: NextFunction) =>
  res.render('welcome');

const addCustomer = (req: Request, res: Response, next: NextFunction) => {
  let body = req.body;
  const user = service.addUser(new User(body));
  const response = ResponseHandler(201, 'successful', user);
  res.send(response);
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  let body = req.body;
  const user = service.updateUser(new User(body));
  const response = ResponseHandler(201, 'successful', user);
  res.send(response);
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  let email: string = req.params.email;
  const user = service.deleteUser(email);
  const response = ResponseHandler(200, 'successful', user);
  res.send(response);
};

const dashboard = (req: Request, res: Response, next: NextFunction) => {
  const users = service.getUsers();
  res.render('index', { users });
};

const getOneUser = (req: Request, res: Response, next: NextFunction) => {
  let email: string = req.params.email;
  const user = service.getUser(email);
  res.send(user);
};

const register = (req: Request, res: Response, next: NextFunction) =>
  res.render('register', { error: '' });

const login = (req: Request, res: Response, next: NextFunction) =>
  res.render('login', { error: '' });

const adminPage = (req: Request, res: Response, next: NextFunction) =>
  res.render('admin', {});

const logout = (_req: Request, res: Response) => {
  res.clearCookie('refreshtoken');
  res.clearCookie('accessToken');
  res.redirect('/');
};

const registerUser = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, email, password, password2 } = req.body;
  try {
    if (!username || !email || !password || !password2) {
      return res.render('register', {
        error: 'Please Input all fields',
      });
    }

    if (password !== password2) {
      return res.render('register', {
        error: 'Password do not Match',
      });
    }

    if (password.length < 6) {
      return res.render('register', {
        error: 'Password must be greater than 6 characters',
      });
    }

    const hashedPassword = await hash(password, 10);

    fs.readFile(
      path.join(__dirname, '../../auth.json'),
      { encoding: 'utf-8' },
      function (error, data) {
        if (error) throw new Error(JSON.stringify(error));
        const valueData = JSON.parse(data) as Admin[];
        const findUser = valueData.find((user) => user.email === email);
        if (findUser) {
          return res.render('register', {
            error: 'User Already Exist',
          });
        }
        valueData.push({
          id: valueData.length,
          email,
          password: hashedPassword,
        });
        fs.writeFile(
          path.join(__dirname, '../../auth.json'),
          JSON.stringify(valueData, null, 4),
          (error) => {
            if (error) throw new Error(JSON.stringify(error));
            return (
              res
                .status(201)
                // .json({ message: 'Successfully registered' })
                .redirect('/users/login')
            );
          }
        );
      }
    );
  } catch (err) {
    res.status(400).send({
      error: `${err}`,
    });
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    fs.readFile(
      path.join(__dirname, '../../auth.json'),
      { encoding: 'utf-8' },
      async function (error, data) {
        if (error) throw new Error(JSON.stringify(error));
        const valueData = JSON.parse(data) as Admin[];
        const findUser = valueData.find((user) => user.email === email);
        if (!findUser) {
          return res.render('login', {
            error: 'Username or Password incorrect',
          });
        }
        const valid = await compare(password, findUser.password);
        if (!valid) {
          return res.render('login', {
            error: 'Username or Password incorrect',
          });
        }
        const accessToken = createAccessToken(findUser.id);
        const refreshToken = createRefreshToken(findUser.id);
        res.cookie('refreshToken', refreshToken);
        res.cookie('accessToken', accessToken);
        return res.redirect('/users/dashboard');
      }
    );
  } catch (err) {
    res.send({ error: `${err}` });
  }
};

router.route('/').get(welcome).post(auth, addCustomer);

router.route('/users/register').get(register).post(registerUser);

router.get('/users/dashboard', auth, dashboard);

router.route('/users/login').get(login).post(loginUser);

router.get('/users/admin', auth, adminPage);

router.get('/users/logout', auth, logout);

router
  .route('/:email')
  .get(auth, getOneUser)
  .put(auth, updateUser)
  .delete(auth, deleteUser);

export default router;
