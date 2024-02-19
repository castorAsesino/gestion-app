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

  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, getValue } = useForm({
    defaultValues: {
      nombre: "", descripcion: ""
    }
  });

  useEffect(() => {
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
      });
  };

  const onSubmit = (data) => {
    return isAddMode
      ? createAtributo({ ...data })
      : updateAtributo({ ...data });
  }

  const updateAtributo = async (data) => {
    const response = await axios.put("/api/atributo/" + id, data);
  }

  const createAtributo = async (data) => {
    const response = await axios.post("/api/atributo", data);
  }

  /*   const handleChangeBacklog = (event) => {
      setValue('backlogId', event.target.value);
      setBacklogId(event.target.value);
    };
  
    const handleChangeSprint = (event) => {
      setValue('sprintId', event.target.value);
      setSprintId(event.target.value);
    };
  
    const handleChangeUsuario = (event) => {
      setValue('usuarioId', event.target.value);
      setUsuarioId(event.target.value);
    };
  
   */
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
                  helperText={errors.nombre ? 'Empty field' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <TextField id="standard-basic" label="Descripción" variant="standard" fullWidth margin="normal" {...register('descripcion', { required: true })}
                  error={errors.descripcion}
                  helperText={errors.descripcion ? 'Empty field' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <TextField id="standard-basic" label="Valor" variant="standard" fullWidth margin="normal" {...register('valor', { required: true })}
                  error={errors.valor}
                  helperText={errors.valor ? 'Empty field' : ''}
                />
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


    </Container >
  );
}