import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

const EditCar = ({data,updateCar}) =>{
    const [open,setOpen]  = useState(false);
    const [car,setCar] = useState({
        brand:'',
        model:'',
        color:'',
        year:'',
        price:'',
    });
    const handleClickOpen = ()=>{
        setOpen(true);
        setCar({
            brand:data.row.brand,
            model:data.row.model,
            color:data.row.color,
            year:data.row.year,
            price:data.row.price,
        })
    }
    const handleClose = () =>{
        setOpen(false);
    }
    const handleChange = (e)=>{
        setCar({...car, [e.target.name] : e.target.value});
    }

    const handleSave = ()=> {
        updateCar(car,data.id);
        handleClose();
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>EditCar</DialogTitle>
            <DialogContent>
                <input placeholder="brand" name="brand" value={car.brand} onChange={handleChange}></input>
                <br/>
                <input placeholder="Model" name="model" value={car.model} onChange={handleChange}></input>
                <br/>
                <input placeholder="Color" name="color" value={car.color} onChange={handleChange}></input>
                <br/>
                <input placeholder="Year" name="year" value={car.year} onChange={handleChange}></input>
                <br/>
                <input placeholder="Price" name="price" value={car.price} onChange={handleChange}></input>
                <br/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}
export default EditCar;