import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  dog: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog', required: true },
  url: { type: String, required: true }
});

const PhotoModel = mongoose.model('Photo', PhotoSchema);
export default PhotoModel;
