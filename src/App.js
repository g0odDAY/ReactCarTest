
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {AgGridReact} from "ag-grid-react";
import {AppBar, Toolbar, Typography} from "@mui/material";
import Carlist from "./components/Carlist";
import Login from "./components/Login";
function App() {
  const [keyword,setKeyword] = useState('');
  const [data,setData] = useState([]);
  const columns = [{field:'full_name',sortable:true,filter:true},{field: 'html_url',sortable:true,filter:true},{field: 'owner.login',sortable:true,filter:true}];
  const fetchData = () =>{
    axios.get(`http://api.github.com/search/repositories?q=${keyword}`)
        .then(res=>{
          console.log(res.data.items);
          setData(res.data.items)})
        .catch(err => console.error(err));
  }

    return (
        <div className="App">
          <AppBar position="static">
              <Toolbar>
                  <Typography variant="6">
                      Carshop
                  </Typography>
              </Toolbar>
          </AppBar>
            <Login/>
        </div>
    )


}

export default App;
