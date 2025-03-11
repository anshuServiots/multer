import { useState  , useEffect} from "react"

function GetAllPhotosPage(){
    
    const [parsedRes ,changeParsedRes ] = useState([])

    useEffect( ()=>{     

        async function asyncThisPls(){
            const token = window.localStorage.getItem("token")
            const res = await fetch('http://localhost:3000/getAllPhotos' , {
                headers:{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    token 
                }),
                method : "POST"
            })
            console.log('res.status-----',res.status)
    
           
            const hi = await res.json()
            changeParsedRes(hi)
            console.log(parsedRes)
        
        }
        asyncThisPls()
       
    },[])
   
    return(
        <>
        <h1>get all photos</h1>
        <a href="/uploadPhoto">upload photos</a>
            {parsedRes.length != 0 ? (
        parsedRes.map((element) => (
        <img key={element.photoName} src={`http://localhost:3000/uploads/${element.photoName}`} alt="Uploaded" height={130} />
    ))
) : (
    <></>
)}
        
        </>
    )
}

export {GetAllPhotosPage}