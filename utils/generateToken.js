import jwt from 'jsonwebtoken';
import UserToken from '../modle/UserToken';

const generateToken = async (user) => {
  try {
    const payload = { _id: user.id, roles: user.roles };
    const accessToken = jwt.sign(payload, 'dawadon', { expiresIn: '14m' });
    const refreshToken = jwt.sign(payload, 'dawadon', { expiresIn: '30d' });

    const userToken = await UserToken.find({ userId: user.id });
    if (userToken) await UserToken.remove();
    await new UserToken({ userId: user.id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {}
};

export default generateToken;
