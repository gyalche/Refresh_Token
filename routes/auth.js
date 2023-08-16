import express from 'express';
import User from '../modle/User.js';
import bcrypt from 'bcrypt';

import singUpBodyValidation from '../validation/signUpValidation.js';

const router = new express.Router();

//signup
router.post('/signup', async (req, res) => {
  try {
    const { error } = singUpBodyValidation(req.body);
    if (error) {
      res.status(400).send({ error: true, message: error.detail[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .send({ error: true, message: 'User with email already exists' });
    }
    const salt = bcrypt.genSalt(10);
    const hashPassword = bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ error: false, message: 'user created sucessfully' });
  } catch (error) {
    return res
      .status(400)
      .send({ error: true, message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ error: true, message: 'no user found' });
    }
    const comparePassword = bcrypt.compare(req.body.password, user.password);
    if (comparePassword) {
      const { accessToken, refreshToken } = generateToken(user);
      return res.status(200).send({
        error: false,
        accessToken,
        refreshToken,
        message: 'Logged in sucessfully',
      });
    }
  } catch (error) {
    return res.status(400).send({ error: true });
  }
});
export default router;
