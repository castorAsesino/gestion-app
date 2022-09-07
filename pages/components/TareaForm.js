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

export default function TareaForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const id = router.query['id'];
  const tarea = router?.query['id'];
  const isAddMode = !tarea;


  const [backlog, setBacklog] = useState([]);
  const [sprint, setSprint] = useState([]);
  const [usuario, setUsuario] = useState([]);

  const [backlogId, setBacklogId] = useState('');
  const [sprintId, setSprintId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, getValue } = useForm({
    defaultValues: {
      nombre: "", tiempo: 0, backlogId: "", sprintId: "", usuarioId: ""
    }
  });

  useEffect(() => {
    getBacklog();
    getUsuario();
    getSprint();
    if (!isAddMode) getTareaId();
    return
  }, [isAddMode]);

  const getBacklog = async () => {
    axios
      .get(("/api/backlog"))
      .then(response => {
        setBacklog(response.data);
        console.log(response.data);
      })
  }

  const getUsuario = async () => {
    const response = await axios.get("/api/usuario");
    setUsuario(response.data)
    console.log(usuario)
  }

  const getSprint = async () => {
    const response = await axios.get("/api/sprint");
    setSprint(response.data)
    console.log(sprint)
  }

  const getTareaId = async () => {
    fetch("/api/tarea/" + id)
      .then((response) => response.json())
      .then((data) => {
        setValue('nombre', data.nombre);
        setValue('backlogId', data.backlogId);
        setValue('sprintId', data.sprintId);
        setValue('usuarioId', data.usuarioId);
        setBacklogId(getValues("backlogId"));
        setSprintId(getValues("sprintId"));
        setUsuarioId(getValues("usuarioId"));
      });
  };

  const onSubmit = (data) => {
    return isAddMode
      ? createTarea({ ...data, tiempo: +data.tiempo })
      : updateTarea({ ...data, tiempo: +data.tiempo });
  }

  const updateTarea = async (data) => {
    const response = await axios.put("/api/tarea/" + id, data);
  }

  const createTarea = async (data) => {
    const response = await axios.post("/api/tarea", data);
  }

  const handleChangeBacklog = (event) => {
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


  return (
    <Container component="main" >
      <CssBaseline />
      <Card className={classes.root}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Tarea
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
                <TextField id="standard-basic" type="number" label="Tiempo" variant="standard" fullWidth margin="normal" {...register('tiempo', { required: true })}
                  error={errors.tiempo}
                  helperText={errors.tiempo ? 'Empty field' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <FormControl fullWidth={true}>
                  <InputLabel>Backlog</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleChangeBacklog}
                    error={errors.backlogId}
                    helperText={errors.backlogId ? 'Empty field' : ''}
                    inputProps={register('backlogId')}
                    value={backlogId}
                    input={<Input />}
                    MenuProps={MenuProps}
                    required={true}
                  >
                    {backlog.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre}
                      </MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <FormControl fullWidth={true}>
                  <InputLabel>Sprint</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleChangeSprint}
                    error={errors.sprintId}
                    helperText={errors.sprintId ? 'Empty field' : ''}
                    inputProps={register('sprintId')}
                    value={sprintId}
                    input={<Input />}
                    MenuProps={MenuProps}
                    required={true}
                  >
                    {sprint?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre}
                      </MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <FormControl fullWidth={true}>
                  <InputLabel>Usuario</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleChangeUsuario}
                    error={errors.usuarioId}
                    helperText={errors.usuarioId ? 'Empty field' : ''}
                    inputProps={register('usuarioId')}
                    value={usuarioId}
                    input={<Input />}
                    MenuProps={MenuProps}
                    required={true}
                  >
                    {usuario?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre}
                      </MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <div style={{ float: 'right' }}>
                  <Button variant="contained" color="secondary" size="large" className={classes.margin} style={{ marginRight: '10px' }} component={Link} href="/tarea">
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