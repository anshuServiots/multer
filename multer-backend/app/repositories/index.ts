import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

async function insertPhoto(photoName : string , userId : string ){
    return await  prisma.photos.create({
       data : {
        photoName , 
        userId
       }
    })
}


async function getPhotos(userId : string){
    return await  prisma.photos.findMany({
       where:{ 
        userId
       }
    })
}

async function getAllPhotos(){
    return await  prisma.photos.findMany({
      
    })
}

async function isUserExist(email : string){
    return await  prisma.user.findMany({
       where:{ 
        email
       }
    })
}

async function createAccount(userName : string , email : string , password : string){
    return await  prisma.user.create({
       data:{ 
        userName,
        email,
        password,
       }
    })
}

async function loginUser(email : string , password : string){
    return await  prisma.user.findMany({
       where:{ 
        email,
        password
       }
    })
}

async function verifyRole(id : string){
    return await  prisma.user.findUnique({
       where:{ 
       id
       }
    })
}

export {insertPhoto , getPhotos , isUserExist , createAccount, loginUser , verifyRole , getAllPhotos}