import { error } from "console";
import express from "express"
import multer from "multer"
import path from "path";
import cors from "cors"
import { insertPhoto , getPhotos } from "./app/repositories";

const app = express() 

app.use(cors())
//app.use(express.json())
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
        
          const userName = req.body.userName
          console.log('userName----------' , userName)
        
          await insertPhoto( req?.file?.filename || '', userName )
            return res.status(200).end('photo saved successfully')
          })

   
})


app.post('/getPhotos' , async (req , res)=>{
  // const filePath = path.join(__dirname, "uploads", "hi.png");

  // res.sendFile(filePath);
  const userName = req.body.userName

  const photoUrls = await getPhotos(userName)

  res.json(photoUrls)


})
app.listen(3000 , ()=>{
    console.log("port is running on port 3000")
})