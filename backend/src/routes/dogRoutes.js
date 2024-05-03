import fs from 'fs';
import path from 'path';
import express from 'express';
import multer from 'multer';
import { create, getAll, getOne, update, remove } from '../controllers/dogController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import schemaValidator from '../middlewares/schemaValidator.js';
import { buildPathWithBase, DOG_PATHS } from './paths.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'media/dogs';
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the date and the original extension to the filename
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

const dogPathBase = buildPathWithBase(DOG_PATHS);

router.post(DOG_PATHS.create, authenticate, schemaValidator(dogPathBase.create), create);
router.get(DOG_PATHS.getAll, authenticate, getAll);
router.get(DOG_PATHS.getOne, authenticate, getOne);
router.put(
  DOG_PATHS.update,
  authenticate,
  schemaValidator(dogPathBase.update),
  upload.single('profilePicture'),
  update
);
router.delete(DOG_PATHS.remove, authenticate, remove);

export default router;
