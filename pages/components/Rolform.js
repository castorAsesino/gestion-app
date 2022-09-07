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
import { useForm } from 'react-hook-form';
import Card from '@material-ui/core/Card';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from '../../src/Link';
import Person from '@material-ui/icons/Person';
import { useRouter } from "next/router";




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

export default function RolForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const id = router.query['id'];
  const rol = router?.query['id'];
  const isAddMode = !rol;
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
    defaultValues: {
      nombre: "", codigo: "", descripcion: ""
    }
  });

  useEffect(() => {
    if (!isAddMode) getRolById();
    return
  }, [isAddMode]);


  const getRolById = async () => {



    fetch("/api/rol/" + id)
      .then((response) => response.json())
      .then((data) => {
      
        setValue('nombre', data.nombre)
        setValue('codigo', data.codigo)
        setValue('descripcion', data.descripcion)

      })




  };
  const onSubmit = (data) => {
    return isAddMode
      ? createRole(data)
      : updateRol(data);
  }

  const updateRol = async (data) => {
    const response = await axios.put("/api/rol/" + id, data);
  }

  const createRole = async (data) => {
    const response = await axios.post("/api/rol", data);
  }



  return (
    <Container component="main" >
      <CssBaseline />
      <Card className={classes.root}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Rol
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} className={classes.form}>
              <Grid item xs={12} sm={12} lg={6}>
                <TextField id="standard-basic" label="Nombre" variant="standard" fullWidth margin="normal" {...register('nombre', { required: true })}
                  error={errors.nombre}
                  helperText={errors.nombre ? 'Empty field' : ''}
                />

                <TextField id="standard-basic" label="Código" variant="standard" fullWidth margin="normal" {...register('codigo', { required: true })}
                  error={errors.codigo}
                  helperText={errors.codigo ? 'Empty field' : ''} />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <TextField id="standard-basic" label="Descripción" variant="standard" fullWidth margin="normal" {...register('descripcion', { required: true })}
                  multiline minRows={1}
                  error={errors.descripcion}
                  helperText={errors.descripcion ? 'Empty field' : ''}
                />
                <div style={{ float: 'right' }}>
                  <Button variant="contained" color="secondary" size="large" className={classes.margin} style={{ marginRight: '10px' }} component={Link} href="/rol">
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