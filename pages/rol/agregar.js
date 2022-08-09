import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoginIcon from '@material-ui/icons/VpnKey';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Card from '@material-ui/core/Card';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";


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
  }

}));

export default function CrearUsuario(props) {
  const classes = useStyles();
  const user = props?.id;
  const isAddMode = !user;
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const onSubmit = (data) => {
    return isAddMode
      ? crearRol(data)
      : updateUser(user.id, data);
  }

  const updateUser = (data) => {
    return userService.create(data)
      .then(() => {
        alertService.success('User added', { keepAfterRouteChange: true });
        router.push('.');
      })
      .catch(alertService.error);
  }

  const crearRol = async (data) => {
    const response = await axios.post("/api/rol", data);
    console.log(response);
  }

  /* const updateUser = (id, data)=> {
    return userService.update(id, data)
      .then(() => {
        alertService.success('User updated', { keepAfterRouteChange: true });
        router.push('..');
      })
      .catch(alertService.error);
  } */

  return (
    <Container component="main" >
      <CssBaseline />
      <Card className={classes.root}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isAddMode ? 'Crear' : 'Editar'}  Rol
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} className={classes.form}>
              <Grid item xs={12} sm={12} lg={6}>
                <TextField id="outlined-basic" label="Nombre" variant="outlined" fullWidth margin="normal" {...register('nombre')} />
                <TextField id="outlined-basic" label="Código" variant="outlined" fullWidth margin="normal" {...register('codigo')} />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <TextField id="outlined-basic" label="Descripción" variant="outlined" fullWidth margin="normal" {...register('descripcion')} multiline minRows={5} />
                <div style={{ float: 'right' }}>
                  <Button variant="contained" color="secondary" size="large" className={classes.margin} style={{ marginRight: '10px' }}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained" color="primary" size="large" className={classes.margin}>
                    Guardar
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </Card>
    </Container >
  );
}