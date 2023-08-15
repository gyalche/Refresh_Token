import express from 'express';
import User from '../modle/User.js';
import bcrypt from 'bcrypt';
import joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const router = express.Router();

//signup
router.post('/signup', async (req, res) => {});
