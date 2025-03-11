import { useState , useEffect} from "react";
import { useNavigate  } from "react-router-dom";
function CreateAccount() {
  const navigate = useNavigate()
   useEffect(()=>{
            const token = window.localStorage.getItem("token")
    
            if(token){
                navigate('/getPhotos')
            }
        },[])
    
  

  
  const [value, changeValue] = useState({
    userName: "",
    email : "",
    password : ""
  });

  const [ parsedRes ,changeParsedRes] = useState('')
  function handelInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value} = e.target;

    changeValue((prev) => ({
      ...prev,
      [name]:  value,
    }));
  }

  async function formSubmitted(e: React.FormEvent) {
    e.preventDefault();
    console.log(value);

    const res = await fetch("http://localhost:3000/CreateAccount", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: value.userName,
        email : value.email,
        password : value.password
      }),
      method: "POST",
    });

    console.log("res.status-----", res.status);

    // if(res.status == 200){
    //     changeIsPhotoUploaded("photo uploaded successfully")
    // }
    // else{
    //     changeIsPhotoUploaded("error in uploading photo")
    // }
    if(res.status == 201){
        alert("account created successfully")
        navigate("/login")
    }
    const hi = await res.json();
    changeParsedRes(hi);
    console.log(parsedRes);
  }
  return (
    <>
      <h1>Create Account</h1>

      <form onSubmit={formSubmitted}>

        <input
          type="text"
          name="userName"
          onChange={handelInputChange}
          placeholder="enter name"
          required
        />

        
        <input
          type="email"
          name="email"
          onChange={handelInputChange}
          placeholder="enter email"
          required
        />

        <input
          type="text"
          name="password"
          onChange={handelInputChange}
          placeholder="enter password"
          required
        />


        <button>send</button>

        {parsedRes ? parsedRes?.msg : <></>}
      </form>
    </>
  );
}

export default CreateAccount
