import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoginIcon from '@material-ui/icons/VpnKey';
import Card from '@material-ui/core/Card';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from '../../src/Link';
import Person from '@material-ui/icons/Person';
import { useRouter } from "next/router";
import {
  FormGroup, ListItemIcon, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { Grid, Input, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from "@material-ui/core";
import { useForm } from 'react-hook-form';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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

export default function ProyectoForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const id = router.query['id'];
  const proyecto = router?.query['id'];
  const isAddMode = !proyecto;
  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, getValue } = useForm({
    defaultValues: {
      nombre: "", descripcion: "", presupuesto: 0,
    }
  });
  const [clientes, setClientes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    if (!isAddMode) getProyectoId();
   
    return
  }, [isAddMode]);

  const getClientes = async () => {
    const response = await axios.get('/api/cliente');
    setClientes(response.data);
  };

  const getRoles = async () => {
    const response = await axios.get("/api/rol");
    setRoles(response.data)
  }

  const getProyectoId = async () => {
    fetch("/api/proyecto/" + id)
      .then((response) => response.json())
      .then((data) => {
        setValue('nombre', data.nombre)
        setValue('descripcion', data.descripcion)
   /*      setValue('presupuesto', data.presupuesto)
        setValue('cliente', data.cliente) */
      });
  };

  const handleOpenDialog = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
    /* reset(); */
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onSubmit = async (data) => {
    try {
      if (isAddMode) {
        await createProyecto({ ...data, presupuesto: +data.presupuesto });
      } else {
        await updateProyecto({ ...data, presupuesto: +data.presupuesto });
      }
      handleOpenDialog('Datos guardados correctamente');
      router.push('/proyecto');
    } catch (error) {
      console.error('Error:', error);
      handleOpenDialog('No se pudo guardar los datos');
    }
  }

  const updateProyecto = async (data) => {
    const response = await axios.put("/api/proyecto/" + id, data);
  }

  const createProyecto = async (data) => {
    console.log('proyecto: ' + JSON.stringify(data));
    const response = await axios.post("/api/proyecto", data);
  }

  return (
    <Container component="main" >
      <CssBaseline />
      <Card className={classes.root}>
        <div className={classes.paper}>

          <Typography component="h1" variant="h5" >
            Proyecto
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

                <TextField label="Descripción" variant="standard"
                  fullWidth margin="normal" {...register('descripcion', { required: true })}

                  error={errors.descripcion}
                  placeholder="Descripción"
                  helperText={errors.descripcion ? 'Campo obligatorio' : ''} InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              {/*  <Grid item xs={12} sm={12} lg={6}>
                <TextField id="standard-basic"  type="number" label="Presupuesto" variant="standard" fullWidth margin="normal" {...register('presupuesto', { required: true })}
                  error={errors.presupuesto}
                  helperText={errors.presupuesto ? 'Empty field' : ''}
                />
              </Grid> */}
              {/*  <Grid item xs={12} sm={12} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="cliente-label">Cliente</InputLabel>
                  <Select labelId="cliente-label" id="cliente" {...register('cliente', { required: true })} error={errors.cliente} MenuProps={MenuProps}>
                    {clientes.map((cliente) => (
                      <MenuItem key={cliente.id} value={cliente.id}>
                        {cliente.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item xs={12} sm={12} lg={6}>
                <div style={{ float: 'left' }}>
                  <Button variant="contained" color="secondary" size="large" className={classes.margin} style={{ marginRight: '10px' }} component={Link} href="/proyecto">
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
        <DialogTitle id="alert-dialog-title">{"Mensaje de Confirmación"}</DialogTitle>
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