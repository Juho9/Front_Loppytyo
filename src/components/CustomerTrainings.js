
import * as React from "react"
import Button from '@mui/material/Button';
import CustomerTrainingTable from './CustomerTrainingTable';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

export default function ProfileInformation(props) {

    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstName: '', lastName: '', streetaddress: '',postcode: '', city: '', email: '', phone: '', links: ''
    });

    const handleClickOpen = () => {
        console.log(props.customer)
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone,
            links: props.customer.links[2].href
        })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        console.log(customer)
    }

    const trainingLink = () => {
        customer();
    }

    const dialogStyle = {
        dialogPapers: {
            minHeight: '80vh',
            maxHeight: '80vh'
        }
    }

    return(
        <div>
            <Button variant="contained" color="background" onClick={handleClickOpen} >
                Trainings
            </Button>
            <Dialog className="profile-dialog" open={open} onClose={handleClose} 
                    aria-labelledby="trainings-dialog" fullWidth maxWidth="md" maxheight="xl" >
                <h2 textAlign="center" >{customer.firstname} {customer.lastname}</h2>
                <DialogContent style={{height: '60%'}} >
                    <p >Email: </p>
                    <Typography>{customer.email}</Typography>
                    <p>Phone number: </p>
                    <Typography>{customer.phone}</Typography>
                    <p>Address: </p>
                    <Typography>{customer.streetaddress}, {customer.city} {customer.postcode}</Typography>
                    <div className="c-traininsTable" style={{height: '200', width: '100%'}} >
                        <CustomerTrainingTable trainingLink={trainingLink} link={customer.links} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}