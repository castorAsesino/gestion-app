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
  buttonColor: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#146677f5'
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

export default function AsignarRolesForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const id = router.query['id'];
  const sprint = router?.query['id'];
  const isAddMode = !sprint;
  const [roles, setRoles] = useState([]);
  const [rolId, setRolId] = useState('');

  const [recursos, setRecursos] = useState([]);
  const [recursoId, setRecursoId] = useState('');


  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, getValue } = useForm({
    defaultValues: {
      recursoId: "", rolId: ""
    }
  });

  useEffect(() => {
    getRoles();
    getRecursos();
    if (!isAddMode) getAsignarRoles();
    return
  }, [isAddMode]);

  const getRecursos = async () => {
    const response = await axios.get("/api/recurso");
    setRecursos(response.data)
  }

  const getRoles = async () => {
    const response = await axios.get("/api/rol");
    setRoles(response.data)
  }

  const getAsignarRoles = async () => {
    fetch("/api/asignar-roles/" + id)
      .then((response) => response.json())
      .then((data) => {
        setValue('recursoId', data.recursoId)
        setRecursoId(getValues("recursoId"))
        setValue('rolId', data.rolId)
        setRolId(getValues("rolId"))
      });

  };
  const onSubmit = (data) => {
    return isAddMode
      ? create(data)
      : update(data);
  }

  const update = async (data) => {
    const response = await axios.put("/api/asignar-roles/" + id, data);
  }

  const create = async (data) => {
    const response = await axios.post("/api/asignar-roles", data);
  }

  const handleChangerecurso = (event) => {
    setValue('recursoId', event.target.value);
    setRecursoId(event.target.value);
  };

  const handleChangeRol = (event) => {
    setValue('rolId', event.target.value);
    setRolId(event.target.value);
  };


  return (
    <Container component="main" >
      <CssBaseline />
      <Card className={classes.root}>
        <div className={classes}>


          <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>

            Asignar Roles
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5} className={classes.form}>

              <Grid item xs={12} sm={12} lg={6}>
                <FormControl fullWidth={true}>
                  <InputLabel>Recurso</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleChangerecurso}
                    error={errors.recursoId}
                    helperText={errors.recursoId ? 'Empty field' : ''}
                    inputProps={register('recursoId')}
                    value={recursoId}
                    input={<Input />}
                    MenuProps={MenuProps}
                    required={true}
                    disabled={!isAddMode}
                  >
                    {recursos.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre}
                      </MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} lg={6}>
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

              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <div style={{ float: 'right' }}>
                  <Button variant="contained" size="large" className={classes.margin}  style={{ marginRight: '10px', backgroundColor: 'rgb(135 138 157)', color: '#FFFFFF' }} component={Link} href="/asignar-roles">
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