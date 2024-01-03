import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";

const Addcar = ({addCar}) =>{
    const [open,setOpen] = useState(false);
    const [car,setCar] = useState({
        brand:'',
        model:'',
        color:'',
        year:'',
        price:'',
        registerNumber:'',
    })
    const handleClickOpen = () =>{
        setOpen(true);
    }
    const handleClickClose = () =>{
        setOpen(false);
    }
    const handleSave= ()=>{
        console.log(car);
        addCar(car);
        handleClickClose();
    }
    const handleChange = (e)=> {
        console.log(e.target.name,e.target.value);
        setCar({...car,
        [e.target.name]:e.target.value});
    }

    return <>
        <div>
            <Button variant="contained" onClick={handleClickOpen}>New CAR</Button>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                    <TextField label="Brand" name="brand" autoFocus variant="standard" value={car.brand} onChange={handleChange}/>
                        <TextField label="Model" name="model" variant="standard" value={car.model} onChange={handleChange}/>
                    <TextField label="Color" name="color" variant="standard" value={car.color} onChange={handleChange}/>
                    <TextField label="Year" name="year" variant="standard" value={car.year} onChange={handleChange}/>
                    <TextField label="Price" name="price" variant="standard" value={car.price} onChange={handleChange}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClickClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    </>
}
export  default Addcar;