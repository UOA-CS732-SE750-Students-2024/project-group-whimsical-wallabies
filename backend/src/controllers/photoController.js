import { createPhoto, getPhotos, deletePhoto } from '../services/photoService.js';

export const create = async (req, res) => {
  try {
    const photo = await createPhoto(req.params.id, req.file.path);
    res.status(201).json(photo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const photos = await getPhotos(req.params.id);
    res.status(200).json(photos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await deletePhoto(req.params.id, req.params.photoId);
    res.status(204).json({ message: 'Photo deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
