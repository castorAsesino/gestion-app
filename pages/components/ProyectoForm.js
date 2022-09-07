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
import { FormGroup, ListItemIcon } from "@material-ui/core";
import { Grid, Input, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from "@material-ui/core";
import { useForm } from 'react-hook-form';


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

export default function ProyectoForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const id = router.query['id'];
  const proyecto = router?.query['id'];
  const isAddMode = !proyecto;
  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, getValue } = useForm({
    defaultValues: {
      nombre: "", presupuesto: 0
    }
  });

  useEffect(() => {
    if (!isAddMode) getProyectoId();
    return
  }, [isAddMode]);

  const getRoles = async () => {
    const response = await axios.get("/api/rol");
    setRoles(response.data)
  }

  const getProyectoId = async () => {
    fetch("/api/proyecto/" + id)
      .then((response) => response.json())
      .then((data) => {
        setValue('nombre', data.nombre)
        setValue('presupuesto', data.presupuesto)
      });

  };
  const onSubmit = (data) => {
    return isAddMode
      ? createProyecto({...data, presupuesto: +data.presupuesto})
      : updateProyecto({...data, presupuesto: +data.presupuesto});
  }

  const updateProyecto = async (data) => {
    const response = await axios.put("/api/proyecto/" + id, data);
  }

  const createProyecto = async (data) => {
    const response = await axios.post("/api/proyecto", data);
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
            Proyecto
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} className={classes.form}>
              <Grid item xs={12} sm={12} lg={6}>
                <TextField id="standard-basic" label="Nombre" variant="standard" fullWidth margin="normal" {...register('nombre', { required: true })}
                  error={errors.nombre}
                  helperText={errors.nombre ? 'Empty field' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <TextField id="standard-basic"  type="number" label="Presupuesto" variant="standard" fullWidth margin="normal" {...register('presupuesto', { required: true })}
                  error={errors.presupuesto}
                  helperText={errors.presupuesto ? 'Empty field' : ''}
                />
              </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <div style={{ float: 'right' }}>
                <Button variant="contained" color="secondary" size="large" className={classes.margin} style={{ marginRight: '10px' }} component={Link} href="/proyecto">
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


    </Container >
  );
}