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

export default function SprintForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const id = router.query['id'];
  const sprint = router?.query['id'];
  const isAddMode = !sprint;
  
  const [backlog, setBacklog] = useState([]);
  const [backlogId, setBacklogId] = useState('');


  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, getValue } = useForm({
    defaultValues: {
      nombre: "", goal: "", descripcion: "", duracion: "", fecha_inicio: "", fecha_fin: "", backlogId: ""
    }
  });

  useEffect(() => {
    getBacklog();
    if (!isAddMode) getSprintId();
    return
  }, [isAddMode]);

  const getBacklog = async () => {
    const response = await axios.get("/api/backlog");
    setBacklog(response.data)
  }

  const getSprintId = async () => {
    fetch("/api/sprint/" + id)
      .then((response) => response.json())
      .then((data) => {
        setValue('nombre', data.nombre)
        setValue('goal', data.goal)
        setValue('backlogId', data.backlogId)
        setBacklogId(getValues("backlogId"))
        setValue('duracion', data.duracion)
        setValue('fecha_inicio', data.fecha_inicio)
        setValue('fecha_fin', data.fecha_fin)
        setValue('descripcion', data.descripcion)
      });

  };
  const onSubmit = (data) => {
    return isAddMode
      ? createSprint({...data, duracion: +data.duracion})
      : updateSprint({...data, duracion: +data.duracion});
  }

  const updateSprint = async (data) => {
    const response = await axios.put("/api/sprint/" + id, data);
  }

  const createSprint = async (data) => {
    const response = await axios.post("/api/sprint", data);
  }

  const handleChange = (event) => {
    setValue('backlogId', event.target.value);
    setBacklogId(event.target.value);
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
            Sprint
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
                <TextField id="standard-basic" label="Goal" variant="standard" fullWidth margin="normal" {...register('goal', { required: true })}
                  error={errors.goal}
                  helperText={errors.goal ? 'Empty field' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <TextField id="standard-basic" label="Duración" type="number" variant="standard" fullWidth margin="normal" {...register('duracion', { required: true })}
                  error={errors.duracion}
                  helperText={errors.duracion ? 'Empty field' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <TextField id="standard-basic" label="Fecha Inicio" variant="standard" fullWidth margin="normal" {...register('fecha_inicio', { required: true })}
                  error={errors.fecha_inicio}
                  helperText={errors.fecha_inicio ? 'Empty field' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <TextField id="standard-basic" label="Fecha Fin" variant="standard" fullWidth margin="normal" {...register('fecha_fin', { required: true })}
                  error={errors.fecha_fin}
                  helperText={errors.fecha_fin ? 'Empty field' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <FormControl fullWidth={true}>
                  <InputLabel>Backlog</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleChange}
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
                <div style={{ float: 'right' }}>
                  <Button variant="contained"  size="large" className={classes.margin}  style={{ marginRight: '10px', backgroundColor: 'rgb(135 138 157)', color: '#FFFFFF' }} component={Link} href="/sprint">
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