import express from "express";
import bodyParser from "body-parser";
import mongoose  from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/post.js"
import { register } from "./controller/auth.js";
import {createPost} from "./controller/post.js"
import User from "./model/User.js"
import Post  from "./model/Post.js";
import {users,posts} from "./data/index.js"
import { verifyToken } from "./middlewares/verifyToken.js";


// Configuration
const __filename= fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy :"cross-origin"}))
app.use(bodyParser.json({limit:"30mb",extended :true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended: true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,'public/assets')));

// FILE STOREAGE

const storage = multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,"public/assets")
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage});

//Routes With Files
app.post("/auth/register",upload.single("picture"),register)
app.post("/posts",verifyToken,upload.single("picture"),createPost)

//Routes
app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.use("/posts",postRoutes)

const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
.then(()=>{
    // User.insertMany(users);
    // Post.insertMany(posts);
    app.listen(PORT,()=> console.log(`Server PORT :${PORT}`));
})
.catch((error)=>{
    console.log(error)
})

