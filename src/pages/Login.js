import {useState} from "react";
import {
    Button,
    Checkbox,
    Container, FormControlLabel, FormGroup,
    Link,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup, Grid,
} from "@mui/material";

import {SERVER_URL} from "../constraint";
import Main from "./Main";


const Login = () =>{
    const [user,setUser] = useState({
        username:'',
        password:''
    });
    const [isAuthenticated,setAuth] = useState(false);
    const [alignment, setAlignment] = useState('login');

    const toggleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const handleChange = (e) => {
        setUser({...user,[e.target.name] : e.target.value});
    }

    const login = () =>{
        fetch(SERVER_URL+'login',{
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
        return <Main/>;
    }else{
        return(
            <Container>
                <Stack mt={4} mb={4}>
                    <h1>환영합니다.</h1>
                    <h4>회원가입 및 로그인.</h4>
                </Stack>
                <Stack>
                    <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={toggleChange}
                    fullWidth
                    aria-label="Platform">
                        <ToggleButton value="login">로그인</ToggleButton>
                        <ToggleButton value="join">회원 가입</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                <Stack spacing={2} alignItems="center" mt={4} mb={4} >
                    <TextField name="username" label="유저이름" onChange={handleChange} fullWidth />
                    <TextField type="password" name="password" label="비밀번호" onChange={handleChange} fullWidth/>
                    <Grid container >
                        <Grid md={6} alignItems="center">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox/>} label="아이디 저장" />
                            </FormGroup>
                        </Grid>
                        <Grid md={6} container justifyContent="flex-end" alignItems="center">
                            <Link href="#">아이디 또는 비밀번호 찾기</Link>
                        </Grid>
                    </Grid>
                </Stack>
                <Stack>
                    <Button variant="contained" onClick={login} fullWidth>로그인</Button>
                </Stack>
            </Container>
        )
    }
}
export default Login;