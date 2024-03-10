import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

// upload in local

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

export const multerErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({
      success: false,
      message: err.message,
      payload: null,
    });
  }
  next();
};

export const mulderUpload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5mb file size
  },
});

// function to sanitize files and send error for unsupported files
export function sanitizeFile(file, cb) {
  // Define the allowed extension
  const fileExts = ['.png', '.jpg', '.jpeg', '.gif', '.pdf'];

  // Check allowed extensions
  const isAllowedExt = fileExts.includes(path.extname(file.originalname.toLowerCase()));

  if (isAllowedExt) {
    return cb(null, true); // no errors
  } else {
    // pass error msg to callback, which can be displaye in frontend
    cb('Error: File type not allowed!');
  }
}
