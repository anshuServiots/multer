import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

async function insertPhoto(photoName : string , userName : string){
    return await  prisma.photos.create({
       data : {
        photoName , 
        userName
       }
    })
}


async function getPhotos(userName : string){
    return await  prisma.photos.findMany({
       where:{ 
        userName
       }
    })
}

export {insertPhoto , getPhotos}