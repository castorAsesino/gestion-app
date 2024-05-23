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
  buttonColor: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#146677f5'
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

export default function ProcesoForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const id = router.query['id'];
  const proceso = router?.query['id'];
  const isAddMode = !proceso;
  const [roles, setRoles] = useState([]);
  const [rolId, setRolId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
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
    },
  });

  useEffect(() => {
    if (!isAddMode) getProcesoById();
    return;
  }, [isAddMode]);

  const getProcesoById = async () => {
    fetch('/api/proceso/' + id)
      .then((response) => response.json())
      .then((data) => {
        setValue('nombre', data.nombre);
        setValue('descripcion', data.descripcion);
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
        await createProceso(data);
      } else {
        await updateProceso(data);
      }
      handleOpenDialog('Datos guardados correctamente');
    } catch (error) {
      console.error('Error:', error);
      handleOpenDialog('No se pudo guardar los datos');
    }
  };

  const updateProceso = async (data) => {
    const response = await axios.put('/api/proceso/' + id, data);
  };

  const createProceso = async (data) => {
    console.log('create proceso');
    const response = await axios.post('/api/proceso', data);
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Card className={classes.root}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Nuevo Proceso
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} className={classes.form}>
              <Grid item xs={12} sm={12} lg={12}>
                <TextField
                  id="standard-basic"
                  label="Nombre"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  {...register('nombre', { required: true })}
                  error={errors.nombre}
                  helperText={errors.nombre ? 'Campo obligatorio' : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={12}>
                <TextField
                  id="standard-basic"
                  label="Descripción"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  {...register('descripcion', { required: true })}
                  multiline
                  minRows={3} // Cambiado a 3 para mostrar al menos 3 filas
                  error={errors.descripcion}
                  helperText={errors.descripcion ? 'Campo obligatorio' : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    as: 'textarea', // Cambiado a 'textarea' para renderizar un componente <textarea>
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={12}>
                <div style={{ float: 'right' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.margin}
                    style={{ marginRight: '10px' }}
                    component={Link}
                    href="/proceso"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.buttonColor}
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
