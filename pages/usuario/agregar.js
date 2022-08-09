import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Person from '@material-ui/icons/Person';

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
 /*  margin: {
    margin: theme.spacing(2),
  }, */
/*   extendedIcon: {
    marginRight: theme.spacing(5),
  }, */
}));

export default function CrearUsuario() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Container component="main" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Person />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crear Usuario
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={6}>
              <TextField id="outlined-basic" label="Nombre" variant="outlined" fullWidth margin="normal" />
              <TextField id="outlined-basic" label="Apellido" variant="outlined" fullWidth margin="normal" />
             
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <FormControl fullWidth variant="outlined" className={classes.formControl} style={{ marginTop: "16px" }}>
                <InputLabel id="demo-simple-select-outlined-label">Rol</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={age}
                  onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <div style={{ float: 'right'}}>
              <Button variant="contained" color="secondary" size="large" className={classes.margin} style={{ marginRight: '10px'}}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" size="large" className={classes.margin}>
                Guardar
              </Button>
              </div>

            
            </Grid>

          </Grid>
        </form>
      </div>

    </Container >
  );
}