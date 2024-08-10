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
    textAlign: 'center',
    alignItems: 'center',
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

export default function UserStoriesForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const id = router?.query['id'];
  const isAddMode = !id;
  const [recursos, setRecursos] = useState([]);
  const [recursoId, setRecursoId] = useState('');

  const [tareas, setTareas] = useState([]);
  const [tareaId, setTareaId] = useState('');

  const [sprint, setSprint] = useState([]);
  const [sprintId, setSprintId] = useState('');


  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, getValue } = useForm({
    defaultValues: {
      rol_recursoId: "", tareaId: "", sprintId: "", story_points: 0, sprintId: ""
    }
  });

  useEffect(() => {
    getRecursos();
    getSprint();
    getTarea();
    if (!isAddMode) getUserStories();
    return
  }, [isAddMode]);

  const getRecursos = async () => {
    const response = await axios.get("/api/asignar-roles");
    setRecursos(response.data)
  }

  const getSprint = async () => {
    const response = await axios.get("/api/sprint");
    setSprint(response.data)
  }

  const getTarea = async () => {
    const response = await axios.get("/api/tarea");
    setTareas(response.data)
  }

  const getUserStories = async () => {
    fetch("/api/asignar-roles/" + id)
      .then((response) => response.json())
      .then((data) => {
        setValue('rol_recursoId', data.rol_recursoId);
        setRecursoId(getValues("rol_recursoId"));
        setValue('tareaId', data.tareaId);
        setTareaId(getValues("tareaId"));
        setValue('sprintId', data.sprintId);
        setSprintId(getValues("sprintId"));
        setValue('story_points', data.story_points);

      });

  };
  const onSubmit = (data) => {
    return isAddMode
      ? create({...data, story_points: +data.story_points})
      : update({...data, story_points: +data.story_points});
  }

  const update = async (data) => {
    const response = await axios.put("/api/user-storie/" + id, data);
  }

  const create = async (data) => {
    const response = await axios.post("/api/user-storie", data);
  }

  const handleChangerecurso = (event) => {
    setValue('rol_recursoId', event.target.value);
    setRecursoId(event.target.value);
  };

  const handleChangeTarea = (event) => {
    setValue('tareaId', event.target.value);
    setTareaId(event.target.value);
  };

  const handleChangeSprint = (event) => {
    setValue('sprintId', event.target.value);
    setSprintId(event.target.value);
  };

  return (
    <Container component="main" >
      <CssBaseline />
      <Card className={classes.root}>
        <div className={classes}>
          <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
            User Stories
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5} className={classes.form}>

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
              </Grid>

              <Grid item xs={12} sm={12} lg={6}>
                <FormControl fullWidth={true}>
                  <InputLabel>Recurso</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleChangerecurso}
                    error={errors.rol_recursoId}
                    helperText={errors.rol_recursoId ? 'Empty field' : ''}
                    inputProps={register('rol_recursoId')}
                    value={recursoId}
                    input={<Input />}
                    MenuProps={MenuProps}
                    required={true}
                    disabled={!isAddMode}
                  >
                    {recursos.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombreRecurso}
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
                    disabled={!isAddMode}
                  >
                    {sprint.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre}
                      </MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <TextField id="standard-basic" type="number" label="Story Point" variant="standard" fullWidth margin="normal" {...register('story_points', { required: true })}
                  error={errors.story_points}
                  helperText={errors.story_points ? 'Empty field' : ''}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={6}>
                <div >
                  <Button variant="contained"  size="large" className={classes.margin}  style={{ marginRight: '10px', backgroundColor: 'rgb(135 138 157)', color: '#FFFFFF' }} component={Link} href="/user-storie">
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