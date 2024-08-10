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

export default function ReviewForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const id = router?.query['id'];
  const isAddMode = !id;


  const [sprint, setSprint] = useState([]);
  const [sprintId, setSprintId] = useState('');


  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, getValue } = useForm({
    defaultValues: {
      nombre: "", descripcion: "", avance: "", conclusion: "", sprintId: "", 
    }
  });

  useEffect(() => {
    getSprint();
    if (!isAddMode) getReview();
    return
  }, [isAddMode]);

  const getSprint = async () => {
    const response = await axios.get("/api/sprint");
    setSprint(response.data)
  }



  const getReview = async () => {
    fetch("/api/review/" + id)
      .then((response) => response.json())
      .then((data) => {
        setValue('sprintId', data.sprintId);
        setSprintId(getValues("sprintId"));
        setValue('descripcion', data.descripcion);
        setValue('nombre', data.nombre);
        setValue('avance', data.avance);
        setValue('conclusion', data.conclusion);
      });

  };
  const onSubmit = (data) => {
    return isAddMode
      ? create({...data, estado: "ACTIVO"})
      : update({...data, estado: "ACTIVO"});
  }

  const update = async (data) => {
    const response = await axios.put("/api/review/" + id, data);
  }

  const create = async (data) => {
    const response = await axios.post("/api/review", data);
  }

  const handleChange = (event) => {
    setValue('sprintId', event.target.value);
    setSprintId(event.target.value);
  };


  return (
    <Container component="main" >
      <CssBaseline />
      <Card className={classes.root}>
        <div className={classes}>
          <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
            Review
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5} className={classes.form}>

            <Grid item xs={12} sm={12} lg={6}>
                <TextField id="standard-basic" type="text" label="Nombre" variant="standard" fullWidth margin="normal" {...register('nombre', { required: true })}
                  error={errors.nombre}
                  helperText={errors.nombre ? 'Empty field' : ''}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={6}>
                <TextField id="standard-basic" type="text" label="Descripción" variant="standard" fullWidth margin="normal" {...register('descripcion', { required: true })}
                  error={errors.descripcion}
                  helperText={errors.descripcion ? 'Empty field' : ''}
                />
              </Grid>


              <Grid item xs={12} sm={12} lg={6}>
                <TextField id="standard-basic" type="text" label="Avance" variant="standard" fullWidth margin="normal" {...register('avance', { required: true })}
                  error={errors.avance}
                  helperText={errors.avance ? 'Empty field' : ''}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={6}>
                <TextField id="standard-basic" type="text" label="Conclusión" variant="standard" fullWidth margin="normal" {...register('conclusion', { required: true })}
                  error={errors.conclusion}
                  helperText={errors.conclusion ? 'Empty field' : ''}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={6}>
                <FormControl fullWidth={true}>
                  <InputLabel>Tarea</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleChange}
                    error={errors.sprintId}
                    helperText={errors.sprintId ? 'Empty field' : ''}
                    inputProps={register('sprintId')}
                    value={sprintId}
                    input={<Input />}
                    MenuProps={MenuProps}
                    required={true}
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
                <div >
                  <Button variant="contained" size="large" className={classes.margin}  style={{ marginRight: '10px', backgroundColor: 'rgb(135 138 157)', color: '#FFFFFF' }} component={Link} href="/review">
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