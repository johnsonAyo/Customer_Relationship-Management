import { Secret ,verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

function auth(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.redirect('/users/login');
  }
  // Based on 'Bearer ksfljrewori384328289398432'
  try {
    verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret);
    return next();
  } catch (error) {
    // console.log('auth error', error);
    res.redirect('/users/login');
  }
}
export { auth };
