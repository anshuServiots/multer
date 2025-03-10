import { useState } from "react"

function GetPhotosPage(){
    
    const [parsedRes ,changeParsedRes ] = useState([])
    const [isPhotoUploaded , changeIsPhotoUploaded] = useState('')
    const [value , changeValue] = useState<{ userName: string; image: File | null }>({
        userName : '', 
        image : null
    })

     function handelInputChange(e : React.ChangeEvent<HTMLInputElement>){

        const { name, value, files } = e.target;

        changeValue(prev => ({
            ...prev , 
            [name]: files ? files[0] : value,
        }))

    }

    async function formSubmitted(e: React.FormEvent){
        e.preventDefault()
        console.log(value)

        changeIsPhotoUploaded("")

        const formData = new FormData();

        formData.append("userName", value.userName);
        if (value.image) {
            formData.append("profileImg", value.image);
          }

        const res = await fetch('http://localhost:3000/getPhotos' , {
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                userName : value.userName
            }),
            method : "POST"
        })
        console.log('res.status-----',res.status)

        // if(res.status == 200){
        //     changeIsPhotoUploaded("photo uploaded successfully")
        // }
        // else{
        //     changeIsPhotoUploaded("error in uploading photo")
        // }
        const hi = await res.json()
        changeParsedRes(hi)
        console.log(parsedRes)
    
    }
    return(
        <>
        <h1>Upload photos</h1>
        
        <form onSubmit={formSubmitted}>
            <input type="text" name="userName" onChange={handelInputChange}/>
            <input type="file" name="image" onChange={handelInputChange}/>

            <button >send</button>

            
            

           {    parsedRes.length ?           
                parsedRes.forEach(element => {
                
                <img src={`http://localhost:3000/uploads/${element.photoName}`} /> }
                ) : (
                    <>ffffff</>
                ) 
                }
                
        </form>
        
        </>
    )
}

export {GetPhotosPage}