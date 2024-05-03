import fs from 'fs';
import path from 'path';
import express from 'express';
import multer from 'multer';
import { create, getAll, remove } from '../controllers/photoController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { buildPathWithBase, PHOTO_PATHS } from './paths.js';

const router = express.Router({ mergeParams: true });

const photoPathBase = buildPathWithBase(PHOTO_PATHS);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'media/dogs';
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post(photoPathBase.create, authenticate, upload.single('photo'), create);
router.get(photoPathBase.getAll, authenticate, getAll);
router.delete(photoPathBase.remove, authenticate, remove);

export default router;
