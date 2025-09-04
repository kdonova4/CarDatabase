import { useState } from "react";
import { CarEntry, CarResponse } from "../types";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import CarDialogContent from "./CarDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/CarAPI";

type FormProps = {
    carData: CarResponse;
}

function EditCar({ carData }: FormProps) {
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
    })
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const { mutate } = useMutation<CarResponse, Error, CarEntry>({
        mutationFn: updateCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cars"] })
        },
        onError: (err) => {
            console.error(err);
        }
    })

    const handleClickOpen = () => {
        setCar({
            brand: carData.brand,
            model: carData.model,
            color: carData.color,
            registrationNumber: carData.registrationNumber,
            modelYear: carData.modelYear,
            price: carData.price
        })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        const url = carData._links.self.href;
        const carEntry: CarEntry = { car, url }
        mutate(carEntry);
        setCar({
            brand: '',
            model: '',
            color: '',
            registrationNumber: '',
            modelYear: 0,
            price: 0
        })
        setOpen(false);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({ ...car, [event.target.name]: event.target.value })
    }

    return (
        <>
            <Button onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditCar;