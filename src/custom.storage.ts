import { diskStorage } from 'multer';

export const CustomStorage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const filename = Date.now() + file.originalname.replace(/\s/g, ''); // Modify the destination filename
      callback(null, filename);
    },
  }),
};
