import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import Link from '../../src/Link';
import Person from '@material-ui/icons/Person';
import { useRouter } from 'next/router';
import {
  Grid,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
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
  variant: 'menu',
  getContentAnchorEl: null,
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
    padding: theme.spacing(3),
  },
  title: {
    color: '#556cd6',
    fontSize: 2,
    fontWeight: '700',
  },
}));

export default function ClienteForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const id = router.query['id'];
  const cliente = router?.query['id'];
  const isAddMode = !cliente;
  const [roles, setRoles] = useState([]);
  const [rolId, setRolId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [estado, setEstado] = useState('Activo'); 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset, // Agregamos la función reset de react-hook-form
  } = useForm({
    defaultValues: {
      nombre: '',
      descripcion: '',
      pais: '',
      numero: '',
      direccion: '',
    },
  });

  useEffect(() => {
    if (!isAddMode) getClienteById();
    return;
  }, [isAddMode]);

  const getClienteById = async () => {
    fetch('/api/cliente/' + id)
      .then((response) => response.json())
      .then((data) => {
        setValue('nombre', data.nombre);
        setValue('descripcion', data.descripcion);
        setValue('numero', data.numero);
        setValue('pais', data.pais);
        setValue('direccion', data.direccion);
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
      console.log('data: '+JSON.stringify(data));
      if (isAddMode) {
        await createCliente(data);
      } else {
        await updateCliente(data);
      }
      handleOpenDialog('Datos guardados correctamente');
    } catch (error) {
      console.error('Error:', error);
      handleOpenDialog('No se pudo guardar los datos');
    }
  };

  const updateCliente = async (data) => {
    const response = await axios.put('/api/cliente/' + id, data);
  };

  const createCliente = async (data) => {
    console.log('create cliente');
    const response = await axios.post('/api/cliente', data);
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Card className={classes.root}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Nuevo Cliente
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} className={classes.form}>
              <Grid item xs={12} sm={12} lg={6}>
                <TextField
                  id="standard-basic"
                  label="Nombre"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  {...register('nombre', { required: true })}
                  error={errors.nombre}
                  helperText={errors.nombre ? 'Campo obligatorio' : ''}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={6}>
                <TextField
                  id="standard-basic"
                  label="Descripción"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  {...register('descripcion', { required: true })}
                  multiline
                  minRows={1}
                  error={errors.descripcion}
                  helperText={errors.descripcion ? 'Campo obligatorio' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <TextField
                  id="standard-basic"
                  label="Numero"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  {...register('numero', { required: true })}
                  multiline
                  minRows={1}
                  error={errors.numero}
                  helperText={errors.numero ? 'Campo obligatorio' : ''}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={6}>
                <TextField
                  id="standard-basic"
                  label="Pais"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  {...register('pais', { required: true })}
                  multiline
                  minRows={1}
                  error={errors.pais}
                  helperText={errors.pais ? 'Campo obligatorio' : ''}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={6}>
                <TextField
                  id="standard-basic"
                  label="Direccion"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  {...register('direccion', { required: true })}
                  multiline
                  minRows={1}
                  error={errors.direccion}
                  helperText={errors.pais ? 'Campo obligatorio' : ''}
                />
              </Grid>

              {/* <Grid item xs={12} sm={12} lg={6}>
              <Select
                id="estado"
                label="Estado"
                onChange={(e) => setValue('estado', e.target.value)}
                fullWidth
                {...register('estado', { required: true })}
                displayEmpty
                inputProps={{ 'aria-label': 'Estado' }}
                error={errors.estado}
              >
                <MenuItem value="" disabled>
                  Selecciona el estado
                </MenuItem>
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="Inactivo">Inactivo</MenuItem>
              </Select>
              </Grid> */}
              <Grid item xs={12} sm={12} lg={6}>
                <div style={{ float: 'right' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.margin}
                    style={{ marginRight: '10px' }}
                    component={Link}
                    href="/cliente"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.margin}
                  >
                    Guardar
                  </Button>
                </div>
              </Grid>
            </Grid>
            <div></div>
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
    </Container>
  );
}
