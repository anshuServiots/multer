import { useState } from "react"

function UploadPhotoPage(){

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
        const token = window.localStorage.getItem("token")
        formData.append("token", token );
        if (value.image) {
            formData.append("profileImg", value.image);
          }

        const res = await fetch('http://localhost:3000/upload' , {
            
            body : formData,
            method : "POST"
        })
        console.log('res.status-----',res.status)

        if(res.status == 200){
            changeIsPhotoUploaded("photo uploaded successfully")
        }
        else{
            changeIsPhotoUploaded("error in uploading photo")
        }
        // const parsedRes = await res.json()
        // console.log(parsedRes)
    
    }
    return(
        <>
        <h1>Upload photos</h1>
        <a href="/getPhotos">gallery</a>
        <form onSubmit={formSubmitted}>

            <input type="file" name="image" onChange={handelInputChange} required/>

            <button >send</button>

            {isPhotoUploaded ? <p>{isPhotoUploaded}</p> : <></>}
        </form>
        
        </>
    )
}

export {UploadPhotoPage}