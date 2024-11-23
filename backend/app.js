import express from "express";
import {config} from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const router = express.Router();

config({path:"./config.env"});

app.use
    (cors({
        origin:[process.env.FRONTEND_URL],
        methods:["POST"],
        credentials:true,
    })
)

app.use(express.json());
app.use(express.urlencoded({extended:true}));

router.post("/send/mail", async(req,res,next)=>{
    const{name, email,message} = req.body;
    if(!name||!email ||!message){
        return next(
            res.status(400).json({
                success:false,
                message:"Please Provide all details",
            })
        )
    }
    try{
        await sendEmail({
        email:"ebramassaad216@gmail.com",
        subject:"Gym Website Contact",
        message,
        userEmail:email,
    })
    res.status(200).json({
        success:true,
        message:"Message Sent Successfully",
    })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
})


app.use(router);

app.listen(process.env.PORT,()=>{
    console.log(`Server Listening at port ${process.env.PORT}`);
})



