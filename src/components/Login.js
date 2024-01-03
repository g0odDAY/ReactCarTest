import {useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import Carlist from "./Carlist";

const Login = () =>{
    const [user,setUser] = useState({
        username:'',
        password:''
    });
    const [isAuthenticated,setAuth] = useState(false);

    const handleChange = (e) => {
        setUser({...user,[e.target.name] : e.target.value});
    }

    const login = () =>{
        fetch('http://localhost:9090/'+'login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(user)
        }).then(res=>{
            const jwtToken = res.headers.get('Authorization');
            if(jwtToken !== null){
                sessionStorage.setItem("jwt",jwtToken);
                setAuth(true);
            }
        }).catch(err=>console.error(err))
    }
    if(isAuthenticated){
        return <Carlist/>;
    }else{
        return(
            <div>
                <Stack spacing={2} alignItems='center' mt={2}>
                    <TextField name="username" label="Username" onChange={handleChange}/>
                    <TextField type="password" name="password" label="Password" onChange={handleChange}/>
                    <Button variant="outlined" color="primary" onClick={login}>Login</Button>
                </Stack>
            </div>
        )
    }

}
export default Login;