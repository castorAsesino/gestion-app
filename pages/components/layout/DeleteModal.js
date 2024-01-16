import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


export default function DeleteModal(props) {
    const [open, setOpen] = React.useState(false);
    const setDeleteItem = props.setDeleteItem;
    const id = props.id;
    const setId = props.setId;


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        console.log('sdasdasd', id)
        setDeleteItem(true);
        setId(id);
        handleClose();
    };
    return (
        <>
            <IconButton aria-label="delete" title={'Eliminar'} onClick={handleClickOpen}>
                <DeleteIcon style={{color:'#bd251a'}} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Eliminar"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Desea eliminar el registro seleccionado ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}