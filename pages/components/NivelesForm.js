import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoginIcon from '@material-ui/icons/VpnKey';
import { useForm } from 'react-hook-form';
import Card from '@material-ui/core/Card';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from '../../src/Link';
import Person from '@material-ui/icons/Person';
import { useRouter } from "next/router";
import { FormGroup, ListItemIcon } from "@material-ui/core";
import { Grid, Input, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from "@material-ui/core";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
  variant: "menu",
  getContentAnchorEl: null
};
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonColor: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#146677f5'
  },
  root: {
    marginTop: 100,
    padding: theme.spacing(3)
  },
  title: {
    color: '#556cd6',
    fontSize: 2,
    fontWeight: '700'
  }

}));

export default function NivelesForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const id = router.query['id'];
  const niveles = router?.query['id'];
  const isAddMode = !niveles;
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');




  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, getValue, reset, } = useForm({
    defaultValues: {
      nombre: "", valorMax: 0, valorMin: 0
    }
  });

  useEffect(() => {

    if (!isAddMode) getNivelesId();
    return
  }, [isAddMode]);

  const getNivelesId = async () => {
    fetch("/api/nivel/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log('sad', data)
        setValue('nombre', data.nombre);
        setValue('valorMax', data.valorMax);
        setValue('valorMin', data.valorMin);

      });
  };
  const handleOpenDialog = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
    reset();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onSubmit = async (data) => {
    try {
      data.valorMax = parseInt(data.valorMax);
      data.valorMin = parseInt(data.valorMin);
      if (isAddMode) {
        await createNiveles(data);
      } else {
        await updateNiveles(data);
      }
      handleOpenDialog('Datos guardados correctamente');
      router.push('/niveles');
    } catch (error) {
      console.error('Error:', error);
      handleOpenDialog('No se pudo guardar los datos');
    }
  };
  const updateNiveles = async (data) => {
    const response = await axios.put("/api/nivel/" + id, data);
  }

  const createNiveles = async (data) => {
    const response = await axios.post("/api/nivel", data);
  }
  return (
    <Container component="main" >
      <CssBaseline />
      <Card className={classes.root}>
        <div className={classes.paper}>

          <Typography component="h1" variant="h5" >
            Niveles
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} className={classes.form}>
              <Grid item xs={12} sm={12} lg={12}>
                <TextField label="Nombre" fullWidth margin="normal" {...register('nombre', { required: true })}
                  error={errors.nombre}
                  placeholder="Nombre"
                  helperText={errors.nombre ? 'Campo obligatorio' : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

             
              <Grid item xs={12} sm={12} lg={12}>
                <TextField type="number" label="Valor Mínimo" variant="standard" fullWidth margin="normal" {...register('valorMin', { required: true })}
                  error={errors.valorMin}
                  placeholder="Valor Mínimo"
                  helperText={errors.valorMin ? 'Campo obligatorio' : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={12}>
                <TextField type="number" label="Valor Máximo" variant="standard" fullWidth margin="normal" {...register('valorMax', { required: true })}
                  error={errors.valorMax}
                  placeholder="Valor Máximo"
                  helperText={errors.valorMax ? 'Campo obligatorio' : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <div style={{ float: 'left' }}>
                  <Button variant="contained"  size="large" className={classes.margin}  style={{ marginRight: '10px', backgroundColor: 'rgb(135 138 157)', color: '#FFFFFF' }} component={Link} href="/niveles">
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained" color="primary" size="large" className={classes.buttonColor}>
                    Guardar
                  </Button>
                </div>
              </Grid>
            </Grid>
            <div>
            </div>
          </form>
        </div>
      </Card>


      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/*  <DialogTitle id="alert-dialog-title">{"Mensaje de Confirmación"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

    </Container >
  );
}