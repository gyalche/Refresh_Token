import mongoose from 'mongoose';

const userTokenSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 30 * 86400,
  },
});

const UserToken = mongoose.model('UserToken', userTokenSchema);
export default UserToken;
