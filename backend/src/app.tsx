// import express, { Request, Response, NextFunction } from 'express';
// import Logger from './core/Logger';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import { corsUrl, environment, baseUrl} from './config';
// import './database';
// import cookieParser from 'cookie-parser';
// import { NotFoundError, ApiError, InternalError } from './core/ApiError';
// import swaggerUI from 'swagger-ui-express';
// import swaggerJsDoc from 'swagger-jsdoc';
// import passport from './middlewares/google0Auth'
// import session from 'express-session';
// import routesV1 from './routes/v1';
// import path from 'path';

// // Gestion des exceptions non capturées
// process.on('uncaughtException', (e) => {
//   Logger.error(e);
// });

// const app = express();

// app.use('/images/profile', express.static(path.join(__dirname, 'src/images/profile')));

// app.use(cookieParser());
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
// app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200, credentials: true, }));
// app.use(helmet());
// app.use(morgan('dev'));
// app.use((req: Request, res: Response, next: NextFunction) => {

//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });



// app.use(cors({
//   origin: 'http://localhost:3001', // Front-end origin
//   credentials: true,
// }));
// app.use(session({ secret: 'your-session-secret', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// const options = {
//   definition: {
//     openapi: '3.0.0', // Version de OpenAPI
//     info: {
//       title: 'OpenAPI documentation',
//       version: '1.0.0', // Version de l'API
//       description: 'Documentation Swagger',
//     },
//     servers: [
//       {
//         url: baseUrl,
//       },
//     ],
//   },
//   apis: ['./src/docs/*.tsx'],//Indique les fichiers à inclure dans la documentation Swagger
// };

// const specs = swaggerJsDoc(options);

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// // Routes
// app.use('/api/v1', routesV1);

// // catch 404 and forward to error handler
// app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));

// // Middleware Error Handler
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof ApiError) {
//     ApiError.handle(err, res);
//   } else {
//     if (environment === 'development') {
//       Logger.error(err);
      
//       return res.status(500).send({ status: 'fail', message: err.message });
//     }
//     ApiError.handle(new InternalError(), res);
//   }
// });


// export default app;
////////////////////////////
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import Logger from './core/Logger';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { corsUrl, environment, baseUrl } from './config';
import './database';
import cookieParser from 'cookie-parser';
import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import passport from './middlewares/google0Auth';
import session from 'express-session';
import routesV1 from './routes/v1';

// Gestion des exceptions non capturées
process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();
//const resolvedPath = path.join(__dirname, 'src/images/profile');
//console.log("Static directory:", resolvedPath);
//app.use('/images/profile', express.static(resolvedPath));

//const resolvedPath = path.join(__dirname, 'src/images/profile');
app.use('/images', express.static(path.join(__dirname, '/images')));

app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors({
  origin: 'http://localhost:3001', // Front-end origin
  credentials: true,
}));
app.use(session({ secret: 'your-session-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OpenAPI documentation',
      version: '1.0.0',
      description: 'Documentation Swagger',
    },
    servers: [
      {
        url: baseUrl,
      },
    ],
  },
  apis: ['./src/docs/*.tsx'],
};

const specs = swaggerJsDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Routes
app.use('/api/v1', routesV1);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));

// Middleware Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === 'development') {
      Logger.error(err);
      return res.status(500).send({ status: 'fail', message: err.message });
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
