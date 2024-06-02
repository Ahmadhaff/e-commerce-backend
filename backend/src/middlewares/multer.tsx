import  express, { Request, Response, NextFunction } from 'express';
import multer, { Multer } from 'multer';
import { pathToFileURL } from 'url';
import path from 'path';

const app= express(); 
app.use(/*'/images/profile',*/ express.static(path.join(__dirname, 'src/images/profile')));
//app.use(express.static('images'));
const MIME_TYPES: Record<string, string> = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/gif': 'gif',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
    
      let destinationFolder = 'src/images'; 
      if (req.path === '/uploadPicture') {
        destinationFolder += '/profile'; 
      } else {
        destinationFolder += '/posts'; 
      }
      callback(null, destinationFolder);
  },
  filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
    //const name = file.originalname.split(' ').join('_');
    //const extension = MIME_TYPES[file.mimetype];
    //callback(null, name + '_' + Date.now() );
    //const name = file.originalname.split(' ').join('_');
    const name = file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    callback(null, name );
  },
});

const upload = multer({ storage: storage });

//export const uploadMiddleware = upload.single('images');

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/uploadPicture') {
    console.log("route1");
    upload.single('images')(req, res, next); 
  } else {
    upload.array('images', 15)(req, res, next); 
  }
};
