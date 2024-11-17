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
  buttonColor: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#4576e0'
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

export default function RecursoForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const id = router.query['id'];
  const recurso = router?.query['id'];
  const [tipo, setTipo] = useState('');
 /*  const [roles, setRoles] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [rolId, setRolId] = useState('');
  const [tareaId, setTareaId] = useState(''); */
  const isAddMode = !recurso;
  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, getValue } = useForm({
    defaultValues: {
      nombre: "", descripcion: "", tipo: "", 
    }
  });

  useEffect(() => {
 /*    getRoles();
    getTareas(); */
    if (!isAddMode) getRecursoId();
    return
  }, [isAddMode]);

/*   const getRoles = async () => {
    const response = await axios.get("/api/rol");
    setRoles(response.data)
  }

  const getTareas = async () => {
    const response = await axios.get("/api/tarea");
    setTareas(response.data)
  } */

  const getRecursoId = async () => {
    fetch("/api/recurso/" + id)
      .then((response) => response.json())
      .then((data) => {
        setValue('nombre', data.nombre)
        setValue('descripcion', data.descripcion)
        setValue('tipo', data.tipo)
      });

  };
  const onSubmit = (data) => {
    return isAddMode
      ? createRecurso(data)
      : updateRecurso(data);
  }

  const updateRecurso = async (data) => {
    const response = await axios.put("/api/recurso/" + id, data);
  }

  const createRecurso = async (data) => {
    const response = await axios.post("/api/recurso", data);
  }
  const handleChange = (event) => {
    setValue('tipo', event.target.value);
    setTipo(event.target.value);
  };
 /*  const handleChangeRol = (event) => {
    setValue('rolId', event.target.value);
    setRolId(event.target.value);
  };
  const handleChangeTarea = (event) => {
    setValue('tareaId', event.target.value);
    setTareaId(event.target.value);
  }; */
  return (
    <Container component="main" >
      <CssBaseline />
      <Card className={classes.root}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Recurso
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
                <TextField id="standard-basic" label="Descripción" variant="standard" fullWidth margin="normal" {...register('descripcion', { required: true })}
                  error={errors.descripcion}
                  helperText={errors.descripcion ? 'Empty field' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <FormControl fullWidth={true}>
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleChange}
                    error={errors.tipo}
                    helperText={errors.tipo ? 'Empty field' : ''}
                    inputProps={register('tipo')}
                    value={tipo}
                    input={<Input />}
                    MenuProps={MenuProps}
                    required={true}
                  >
                     <MenuItem key={'1'} value={'fisico'}> Físico </MenuItem>

                  </Select>
                </FormControl>
              </Grid>
             {/*  <Grid item xs={12} sm={12} lg={6}>
                <FormControl fullWidth={true}>
                  <InputLabel>Rol</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleChangeRol}
                    error={errors.rolId}
                    helperText={errors.rolId ? 'Empty field' : ''}
                    inputProps={register('rolId')}
                    value={rolId}
                    input={<Input />}
                    MenuProps={MenuProps}
                    required={true}
                  >
                     {roles.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre}
                      </MenuItem>
                    ))}


                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <FormControl fullWidth={true}>
                  <InputLabel>Tarea</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleChangeTarea}
                    error={errors.tareaId}
                    helperText={errors.tareaId ? 'Empty field' : ''}
                    inputProps={register('tareaId')}
                    value={tareaId}
                    input={<Input />}
                    MenuProps={MenuProps}
                    required={true}
                  >
                     {tareas.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre}
                      </MenuItem>
                    ))}


                  </Select>
                </FormControl>
              </Grid> */}
            <Grid item xs={12} sm={12} lg={6}>
              <div style={{ float: 'right' }}>
                <Button variant="contained"  size="large" className={classes.margin} style={{ marginRight: '10px', backgroundColor: 'rgb(135 138 157)', color: '#FFFFFF' }} component={Link} href="/recurso">
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


    </Container >
  );
}