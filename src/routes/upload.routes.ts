import express from 'express';
import { verifyToken } from '../lib/utils/authorization';
import { mulderUpload } from '../lib/utils/multer';
import uploadController from '../modules/upload/upload.controller';
import { responseData } from '../lib/utils/responseData';

const uploadRouter = express.Router();

// uploadRouter.post('/', verifyToken, mulderUpload.single('file'), async (req, res) => {
//   try {
//     const fileUrl = await uploadController.uploadToSpace({ file: req.file, folder: 'assets' });
//     return responseData({ req, res, data: { fileUrl }, paginate: false });
//   } catch (error) {
//     return responseData({ req, res, error, paginate: false });
//   }
// });

export default uploadRouter;
