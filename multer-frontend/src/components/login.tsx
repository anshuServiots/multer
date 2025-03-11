import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
function UserLogin() {

  
  const navigate = useNavigate()
   useEffect(()=>{
          const token = window.localStorage.getItem("token")
          
          if(token){
            console.log("tokennn", token)
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

    const res = await fetch("http://localhost:3000/login", {
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

    const hi = await res.json();
    console.log("hiii" , hi , parsedRes)
    changeParsedRes(hi);

    console.log(parsedRes);
    
    if(res.status == 200){
        alert("you are now logged in")
        window.localStorage.setItem("token" , hi?.token)
        navigate("/getPhotos")
    }
    
  }
  return (
    <>
      <h1>login</h1>

      <form onSubmit={formSubmitted}>

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

        {parsedRes ? parsedRes.msg : <></>}
      </form>
    </>
  );
}

export default UserLogin
