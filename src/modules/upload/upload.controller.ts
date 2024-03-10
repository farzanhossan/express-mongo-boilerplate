import { S3Client } from '@aws-sdk/client-s3';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { join } from 'path';
import config from '../../lib/config/config';
import { sanitizeFile } from '../../lib/utils/multer';

const s3 = new S3Client({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  region: config.S3.region, // this is the region that you select in AWS account
  endpoint: config.S3.endpoint,
  credentials: {
    accessKeyId: config.S3.accessKey,
    secretAccessKey: config.S3.secretKey,
  },
});

// s3.send(new CreateBucketCommand(bucketParams));

const uploadController = {
  upload: multer({
    storage: multerS3({
      s3: s3,
      bucket: `${config.S3.bucket}`,
      acl: 'public-read', // storage access type
      key: (req, file, cb) => {
        cb(null, Date.now().toString()); // Use a unique key for each uploaded file
      },
    }),
    fileFilter: (req, file, callback) => {
      sanitizeFile(file, callback);
    },
    limits: {
      fileSize: 1024 * 1024 * 5, // 5mb file size
    },
  }),

  async uploadToSpace(data: { file?: IFileMeta; folder?: string }): Promise<string> {
    try {
      let { file, folder } = data;
      if (!folder) folder = 'others';
      if (!file) return null;

      const filePath = file.path;

      if (!filePath) return null;

      const extension = filePath.split('.').pop();

      let fileUrl = null;

      const binaryFile = await fs.createReadStream(filePath);

      const s3 = new AWS.S3({
        secretAccessKey: config.S3.secretKey,
        accessKeyId: config.S3.accessKey,
        endpoint: config.S3.endpoint,
      });

      const uploaded = await s3
        .upload({
          ACL: 'public-read',
          Bucket: `${config.S3.bucket}/${folder}`,
          Body: binaryFile,
          Key: `${Date.now()}.${extension}`,
          ContentType: data?.file?.mimetype,
        })
        .promise();

      if (uploaded && uploaded?.Location) {
        fileUrl = uploaded?.Location;
      }

      try {
        await fs.unlinkSync(join(process.cwd(), filePath));
      } catch (error) {
        console.log('Error in file unlink');
      }

      return fileUrl;
    } catch (error) {
      console.log('Error in upload to space', error);

      return null;
    }
  },
};

export default uploadController;

export interface IFileMeta {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
