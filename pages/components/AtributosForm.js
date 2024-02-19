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

export default function AtributosForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const id = router.query['id'];
  const atributo = router?.query['id'];
  const isAddMode = !atributo;
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const [procesos, setProcesos] = useState([]);
  const [procesoId, setProcesoId] = useState('');


  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, getValue,  reset, } = useForm({
    defaultValues: {
      nombre: "", descripcion: "", procesoId: ""
    }
  });

  useEffect(() => {
    getProcesos();
    if (!isAddMode) getAtributoId();
    return
  }, [isAddMode]);

  const getAtributoId = async () => {
    fetch("/api/atributo/" + id)
      .then((response) => response.json())
      .then((data) => {
        setValue('nombre', data.nombre);
        setValue('descripcion', data.descripcion);
        setValue('valor', data.valor);
        setValue('procesoId', data.procesoId);
      });
  };
  const handleOpenDialog = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
    // Reseteamos el formulario después de mostrar el mensaje de confirmación
    reset();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onSubmit = async (data) => {
    try {
      if (isAddMode) {
        await createAtributo(data);
      } else {
        await updateAtributo(data);
      }
      handleOpenDialog('Datos guardados correctamente');
      router.push('/atributos');
    } catch (error) {
      console.error('Error:', error);
      handleOpenDialog('No se pudo guardar los datos');
    }
  };
  const updateAtributo = async (data) => {
    const response = await axios.put("/api/atributo/" + id, data);
  }

  const createAtributo = async (data) => {
    const response = await axios.post("/api/atributo", data);
  }
  const getProcesos = async () => {
    const response = await axios.get("/api/proceso");
    setProcesos(response.data)
  }


  const handleChangeproceso = (event) => {
    setValue('procesoId', event.target.value);
    setProcesoId(event.target.value);
  };
  return (
    <Container component="main" >
      <CssBaseline />
      <Card className={classes.root}>
        <div className={classes.paper}>

          <Typography component="h1" variant="h5" >
            Atributo de Proceso
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} className={classes.form}>
              <Grid item xs={12} sm={12} lg={12}>
                <TextField id="standard-basic" label="Nombre" variant="standard" fullWidth margin="normal" {...register('nombre', { required: true })}
                  error={errors.nombre}
                  helperText={errors.nombre ? 'Campo obligatorio' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <TextField id="standard-basic" label="Descripción" variant="standard" fullWidth margin="normal" {...register('descripcion', { required: true })}
                  error={errors.descripcion}
                  helperText={errors.descripcion ? 'Campo obligatorio' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <TextField id="standard-basic"  type="number" label="Valor" variant="standard" fullWidth margin="normal" {...register('valor', { required: true })}
                  error={errors.valor}
                  helperText={errors.valor ? 'Campo obligatorio' : ''}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={12}>
                <FormControl fullWidth={true}>
                  <InputLabel>Seleccione un Proceso</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleChangeproceso}
                    error={errors.procesoId}
                    helperText={errors.procesoId ? 'Campo obligatorio' : ''}
                    inputProps={register('procesoId')}
                    value={procesoId}
                    input={<Input />}
                    MenuProps={MenuProps}
                    required={true}
                    disabled={!isAddMode}
                  >
                    {procesos.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre}
                      </MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} lg={12}>
                <div style={{ float: 'left' }}>
                  <Button variant="contained" color="secondary" size="large" className={classes.margin} style={{ marginRight: '10px' }} component={Link} href="/atributos">
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained" color="primary" size="large" className={classes.margin}>
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