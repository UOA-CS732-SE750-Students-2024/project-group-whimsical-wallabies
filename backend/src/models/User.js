import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: false },
  dogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' }],
  photoProfile: { type: String, required: false }
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
