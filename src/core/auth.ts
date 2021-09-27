import jwt from 'jsonwebtoken';
import UserEntity from '../modules/user/user.entity';
import { getRepository } from 'typeorm';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRE = process.env.JWT_EXPIRE;

export const generateToken = (userID: string): string =>
  jwt.sign({ userID }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

const verifyToken = (authToken: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (!authToken || !authToken.startsWith('Bearer ')) return reject();

    const token = authToken.replace('Bearer ', '');

    return jwt.verify(token, JWT_SECRET, (error, payload) => {
      if (error) return reject(error);
      return resolve(payload?.userID);
    });
  });
};

export const getUserFromAuthToken = async (token: string) => {
  const userID = await verifyToken(token);
  return await getRepository(UserEntity).findOne(userID);
};
