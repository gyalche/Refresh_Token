import jwt from 'jsonwebtoken';
import userToken from 'jsonwebtoken';

const verifyRefreshToken = (refreshToken) => {
  const privateKey = 'dawadon';
  return new Promise((resolve, reject) => {
    UserToken.findOne({ token: refreshToken }, (err, doc) => {
      if (!doc) {
        return reject({ error: true, message: 'Invalid refresh token' });
      }
      jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
        if (err) {
          return reject({ error: true, message: 'Invalid refresh token' });
        }
        return resolve({
          tokenDetails,
          error: false,
          message: 'Valid refresh token',
        });
      });
    });
  });
};

export default verifyRefreshToken;
