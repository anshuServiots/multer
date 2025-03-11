import { error } from "console";
import express from "express"
import multer from "multer"
import path from "path";
import cors from "cors"
import jwt , { JwtPayload } from "jsonwebtoken"

import { insertPhoto , getPhotos ,isUserExist , createAccount , loginUser , verifyRole , getAllPhotos} from "./app/repositories";

const app = express() 

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use("/uploads", express.static("uploads"));

const storage =  multer.diskStorage({
    destination : function(req , file ,cb){
        return cb(null , "./uploads")
    },
    filename: function (req , file , cb){
        return cb(null , `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf"];
    const fileExt = path.extname(file.originalname).toLowerCase();
  
    if (allowedExtensions.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, PNG, and PDF are allowed."));
    }
  };


const upload  = multer({storage , fileFilter})


app.post("/upload" ,  (req , res , next) =>{

    upload.single("profileImg")(req, res, async function (err) {
       
          if (err) {
            return res.status(400).end('wrong extention')
          }
        
          const token = req.body.token
          console.log('token----------' , token)
          let istokenValid 
          try{
             istokenValid = jwt.verify(token , "1234")
          }
          catch(err){
            return res.status(400).end('invalid token')
          }
         
          const payload = istokenValid as JwtPayload;

          if(!istokenValid){
            return res.status(400).end('invalid token')
          }
          
            await insertPhoto( req?.file?.filename || '', payload?.id )
            return res.status(200).end('photo saved successfully')
          })
  
})


app.post('/getPhotos' , async (req , res)=>{
  
  const token = req.body.token

  const istokenValid = jwt.verify(token , "1234")
  const payload = istokenValid as JwtPayload;

  if(!istokenValid){
     res.status(400).end('invalid token')
  }
          

  const photoUrls = await getPhotos(payload.id)

  console.log('photoUrls /////////////////' , photoUrls )

  res.json(photoUrls)


})

app.post('/createAccount' , async(req , res)=>{
  const {userName , email , password} = req.body;

  if(!userName  || !email || !password){
    res.status(400).json({msg :"pls send email name and password"})
  }

  const isUserExistRes = await isUserExist(email) 
  console.log(isUserExistRes)

  if(isUserExistRes.length == 0){
    await createAccount(userName, email , password)
    res.status(201).json({msg :"account created successfully"})
  }
  else{
    res.status(409).json({msg :"account with this email already exist"})
  }

})


app.post('/login' , async(req , res)=>{
  const {email , password} = req.body;

  if( !email || !password){
    res.status(400).json({msg :"pls send email and password"})
  }

  const isUserExistRes = await isUserExist(email) 
  console.log(isUserExistRes)

  if(isUserExistRes.length != 0 && isUserExistRes[0]?.password == password){

    const token = jwt.sign({id : isUserExistRes[0].id} , "1234")
    res.status(200).json({msg :"you are logged in" , token})

  }
  else{
    res.status(400).json({msg :"wrong email or password"})
  }

})

app.post('/getAllPhotos' , async (req , res)=>{
  
  const token = req.body.token

  const istokenValid = jwt.verify(token , "1234")
  const payload = istokenValid as JwtPayload;

  
  if(!istokenValid && payload.userRole != "ADMIN"){
     res.status(400).json('invalid token')
  }

 

  const photoUrls = await getAllPhotos()

  console.log('photoUrls /////////////////' , photoUrls )

  res.json(photoUrls)

})


app.listen(3000 , ()=>{
    console.log("port is running on port 3000")

})