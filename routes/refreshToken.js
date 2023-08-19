import express from 'express';
import UserToken from '../modle/UserToken';
import jwt from 'jsonwebtoken';
import verifyRefreshToken from './verifyRefreshToken.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { error } = ValidateRefreshToken();
  verifyRefreshToken(req.body.refreshToken).then(({ tokenDetails }) => {
    const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
    const accessToken = jwt.sign(payload, 'dawadon', { expiresIn: '14m' });
    res.status(200).json({
      error: false,
      accessToken,
      message: 'Access token created sucessfully',
    });
  });
});
