import {useEffect, useState} from "react";
import axios from "axios";
import {DataGrid, GridDeleteIcon, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import {Button, IconButton, Snackbar, Stack} from "@mui/material";
import Addcar from "./Addcar";
import EditCar from "./EditCar";
import {gridClasses} from "@mui/system";

const Carlist = () =>{
    const [cars,setCars] = useState([]);
    const [open,setOpen]=useState(false);
    const fetchCars = ()=>{
        const token = sessionStorage.getItem("jwt");
        axios({
            method:'GET',
            url:'http://localhost:9090/api/cars',
            headers:{'Authorization':token}
        })
            .then(res=> setCars(res.data._embedded.cars))
            .catch(err => console.error(err))
    }
    const addCar = (car)=>{
        const token = sessionStorage.getItem("jwt");
        fetch('http://localhost:9090/api/cars', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':token
            },
            body:JSON.stringify(car)
        }).then(res=>res.json())
            .then(r =>{
            fetchCars();
        }).catch(err => alert(err));
    }
    const updateCar = (car,link)=>{
        const token = sessionStorage.getItem("jwt");
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':token
            },
            body: JSON.stringify(car)
        }).then (r =>r.json())
            .then(r=> setCars(r.data))
            .catch(err=> console.error(err));
    }
    const onDelClick =(url)=>{
        const token = sessionStorage.getItem("jwt");
        axios.delete(url,{headers:{ 'Authorization':token}}).then(res=> {
            fetchCars();
            setOpen(true);
        })
            .catch(err=>console.error(err));
    }
    const CustomToolbar = ()=>{
        return (
            <GridToolbarContainer className={gridClasses.toolbarContainer}>
                <GridToolbarExport/>
            </GridToolbarContainer>
        )
    }
    const columns = [
        {field:'brand',headerName:'Brand',with:200},
        {field:'model',headerName:'Model',with:200},
        {field:'color',headerName:'Color',with:200},
        {field:'year',headerName:'Year',with:150},
        {field:'price',headerName:'Price',with:150},
        {
            field:'_linked.car.href',
            headerName: '',
            sortable:false,
            filterable:false,
            renderCell:row=>
              <EditCar
              data={row}
              updateCar={updateCar}>
              </EditCar>
        },
        {
            field:'_linked.self.href',
            headerName: '',
            sortable:false,
            filterable:false,
            renderCell:row=>
                <IconButton onClick={()=>onDelClick(row.id)}>
                    <GridDeleteIcon color="error"/>
                </IconButton>
        }
    ]
    useEffect(()=>{
        fetchCars();
    },[])
    return<>
        <Stack mt={2} mb={2}>
            <Addcar addCar={addCar}/>
        </Stack>
        <div style={{height:500,width:"100%"}}>
           <DataGrid
               columns={columns}
               rows={cars}
               getRowId={row=>row._links.self.href}
               disableRowSelectionOnClick={true}
               components={{Toolbar:CustomToolbar}}
           />
        </div>
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={()=>setOpen(false)}
            message="Car deleted!!"
        />
    </>
}
export  default Carlist;