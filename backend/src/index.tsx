
  import Logger from "./core/Logger";
  import { port } from "./config";
  import app from "./app";
  import { createServer } from "http";
  import { Socket } from "socket.io";
  const cors = require("cors");
  app.use(cors());
  const { Server } = require("socket.io");
  
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001", 
      methods: ["GET", "POST"],
    },
  });
  interface Notification {
    id: string;
    type: string;
    message: string;
    targetId?: string;
    postId?: string;
  }
  
  
  io.on("connection", (socket: Socket) => {
    console.log("New client connected", socket.id);
  
    socket.on("join_room", (data: { room: string }) => {
      socket.join(data.room);
      console.log(`User ${socket.id} joined room ${data.room}`);
    });
  
    socket.on("send_message", (data: { room: string; message: any }) => {
      io.to(data.room).emit("receive_message", data.message);
      console.log(`Message sent to room ${data.room}: `, data.message);
    });

    socket.on('notification', (notification: Notification) => {
      console.log(`New notification created: ${notification.message}`);
      // Broadcast notification to all users (you could also target specific users or rooms)
      io.emit('notification', notification);
    });
  
  
    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });
 
  server.listen(port, () => {
      Logger.info(`server running on port : ${port}`);
    })
    .on("error", (e: any) => Logger.error(e));
    
    

/*import Logger from './core/Logger';
import { port } from './config';
import app from './app';
//const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
//const server = http.createServer(app);
  
  const io = new Server(app, {
    cors: {
      origin: "http://localhost:3001",
     
    },
  });
  
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
  
app.listen(port, () => {
    Logger.info(`server running on port : ${port}`);
  }).on('error', (e: any) => Logger.error(e));  */ 
  /*import Logger from './core/Logger';
  import { port } from './config';
  import app from './app';
  import http from "http"; 
  import { Socket } from "socket.io"; 
  

  const server = http.createServer(app);
  const cors = require("cors");
  const { Server } = require("socket.io");
  app.use(cors());
  
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",
    },
  });
  
  io.on("connection", (socket: Socket) => { 
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data: { room: string }) => { 
      socket.join(data.room);
      console.log(`User with ID: ${socket.id} joined room: ${data.room}`);
    });
  
    socket.on("send_message", (data: { room: string, message: string }) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
  
server.listen(port, () => {
    Logger.info(`server running on port : ${port}`);
  }).on('error', (e: any) => Logger.error(e)); */  
 
  /*import express from 'express';
  import { createServer } from 'http';

  import Logger from './core/Logger';
  import { port } from './config';
  
  import { Socket, } from "socket.io";
  const cors = require("cors");

  const { Server } = require("socket.io");
  
  const app = express();
  const server = createServer(app);

  app.use(cors());
  
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001", // Adjust as needed for your front-end
      methods: ["GET", "POST"],
    },
  });
  
  interface Notification {
    id: string;
    type: string;
    message: string;
    targetId?: string;
    postId?: string;
  }
  
  io.on('connection', (socket: Socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on('join_room', (room: string) => {
      socket.join(room);
      console.log(`User with ID: ${socket.id} joined room: ${room}`);
    });
  
    // Handle sending messages in rooms
    socket.on('send_message', (data: { room: string, message: string }) => {
      io.to(data.room).emit('receive_message', data.message);
    });
  
    // Handling notifications
    socket.on('create_notification', (notification: Notification) => {
      console.log(`New notification created: ${notification.message}`);
      // Broadcast notification to all users (you could also target specific users or rooms)
      io.emit('notification', notification);
    });
  
    socket.on('disconnect', () => {
      console.log("User Disconnected", socket.id);
    });
  });
  
  server.listen(port, () => {
    Logger.info(`Server running on port: ${port}`);
  }).on('error', (e: any) => Logger.error(e));  */