import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Add from '@material-ui/icons/Add';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteModal from './layout/DeleteModal';
import CheckIcon from '@material-ui/icons/Check';
import { useRouter } from "next/router";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#146677f5',
    color: '#fff',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  table: {
    minWidth: 500,
  },
  center: {
    textAlign: 'center'
  },
  right: {
    float: 'right'
  }
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EvaluarAtributoForm(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [deleteItem, setDeleteItem] = useState(false);
  const [id, setId] = useState('');
  const router = useRouter();
  const idProyecto = router.query['id'];
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const [calificaciones, setCalificaciones] = useState([]);
  const [niveles, setNiveles] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [proyecto, setProyecto] = React.useState(false);
  const [proceso, setProceso] = React.useState(null);
  const [resultados, setResultados] = React.useState(false);
  const [intervalo, setIntervalo] = React.useState(false);
  const [promedios, setPromedios] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getListData();
    getListNivel();
    getCalificacion();
    getProyectoId();
  }, [idProyecto]);

  useEffect(() => {
    if (deleteItem) {
      axios.delete('/api/proceso/' + id).then((response) => {
        window.location.reload();
      });
    }
  }, [deleteItem, id]);


  const getCalificacion = async () => {
    const response = await axios.get('/api/escala');
    setCalificaciones(response.data);
  };
  const getListNivel = async () => {
    const response = await axios.get('/api/nivel');
    setNiveles(response.data);
  };
  const getListData = async () => {
    debugger
    if (idProyecto !== undefined && idProyecto !== null) {
      const response = await axios.get("/api/proceso/asignar/" + idProyecto);
      const newList = response.data.map(item => ({ ...item, calificacion: 0, ponderacion: "", totalPonderacion: 0 }));
      setRows(newList);
      /* setRows(response.data); */
      console.log(response.data)
      if (newList.length > 0) {
        setProceso(newList[0]);
      }

    }
  }
  const getProyectoId = async () => {
    let id = localStorage.getItem('idProyecto');
    fetch("/api/proyecto/" + id)
      .then((response) => response.json())
      .then((data) => {
        setProyecto(data)
      });
  };
  const handlePonderacionChange = (event, id) => {
    const { value } = event.target;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, ponderacion: +value } : row
      )
    );
    calcularTotal(id);
    /*   validar(); */
    console.log(rows)
  };
  const handleChange = (event, id) => {
    const { value } = event.target;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, calificacion: +value } : row
      )
    );
    calcularTotal(id);
    /*  validar(); */
    console.log(rows)
  };
  const calcularTotal = (id) => {
    const { value } = event.target;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, totalPonderacion: row.calificacion * row.ponderacion } : row
      )
    );
    console.log(rows)
  };
  const validar = () => {
    debugger
    let totalPonderacionTotal = 0;
    const valorMasAlto = calificaciones.reduce((max, valor) => max.valor > valor.valor ? max : valor);

    console.log(valorMasAlto);
    rows.forEach(element => {
      totalPonderacionTotal += element.calificacion;
    });


    if (totalPonderacionTotal > 100) {
      alert('Ponderación supera el limite permitido.')
    } else {
      let calificacionPonderada = 0;
      let totalPonderacionTotal = 0;
      let prom = 0;
      rows.forEach(element => {
        totalPonderacionTotal += element.calificacion;
        calificacionPonderada += element.totalPonderacion;

      });

      let resultadoDiv = calificacionPonderada / totalPonderacionTotal;
      let resultado = (resultadoDiv / valorMasAlto.valor) * 100;
      resultado = resultado.toFixed(2);
      console.log(resultado);
      setResultados(resultado);
      let intervalo = niveles.find(intervalo => resultado >= intervalo.valorMin && resultado <= intervalo.valorMax);
      // Calcular el promedio
     let promedioPonderacionTotal = (rows.reduce((acc, curr) => acc + curr.totalPonderacion, 0)) / rows.length;


      // Encontrar los elementos cuyo total es mayor o igual al promedio
      prom = rows.filter(item => item.totalPonderacion <= promedioPonderacionTotal);
      setPromedios(prom)
      setIntervalo(intervalo);
      if (intervalo) {
        console.log(`El resultado está en el intervalo: ${intervalo.nombre}`);
      } else {
        console.log("El resultado no está en ningún intervalo definido");
      }
      handleClickOpen();
    }
    console.log(proceso)
  };
  return (
    <Container component="main">
      <Grid item xs={12}>
        <Typography component="h1" variant="h5" className={classes.center}>
          Matriz de Evaluación
        </Typography>
      </Grid>
      <Grid container spacing={3}>

        <Grid item xs={12} style={{ marginBottom: 10 }}>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Atributo de Proceso</StyledTableCell>
              <StyledTableCell align="center">Descripción</StyledTableCell>
              <StyledTableCell align="center">Calificación de Logro</StyledTableCell>
              <StyledTableCell align="center">Ponderación (%)</StyledTableCell>
              <StyledTableCell align="center">Calificación Ponderada</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.atributo.nombre}
                </StyledTableCell>
                <StyledTableCell align="center">{row.atributo.descripcion}</StyledTableCell>
                <StyledTableCell align="center">
                  <FormControl className={classes.formControl}>

                    <Select

                      value={row.ponderacion}
                      onChange={(e) => handlePonderacionChange(e, row.id)}
                    >
                      {calificaciones.map((nivel) => (
                        <MenuItem key={nivel.id} value={nivel.id}>
                          {nivel.descripcion}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField label="" variant="standard"
                    fullWidth margin="normal"

                    value={row.calificacion}
                    onChange={(e) => handleChange(e, row.id)}
                    InputLabelProps={{
                      shrink: true,
                    }}

                  />
                </StyledTableCell>
                <StyledTableCell align="center" style={{ fontWeight: 500, fontSize: 18 }}>{row.totalPonderacion}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item xs={12} sm={12} lg={12} style={{ marginTop: 30 }}>
        <div style={{ float: 'right' }}>
          <Button variant="contained" color="secondary" size="large" className={classes.margin} style={{ marginRight: '10px' }} component={Link} href="/evaluacion-calidad">
            Cancelar
          </Button>
          <Button variant="contained" color="primary" size="large" className={classes.margin} onClick={validar}>
            Guardar
          </Button>
        </div>
      </Grid>



      <div>
        {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
        <Dialog
          fullWidth={"md"}
          maxWidth={"md"}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Análisis de Resultados
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
              <li style={{ fontSize: 18, fontWeight: 800, marginRight: '1rem' }}>Calificación total del proceso:</li>
              <span>{resultados} %</span>
            </Typography>
            <Typography gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
              <li style={{ fontSize: 18, fontWeight: 800, marginRight: '1rem' }}>Nivel de calidad del proceso:</li>
              <span>{intervalo.nombre}</span>
            </Typography>
            
            <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ backgroundColor: '#146677f5', color: '#fff' }}>Proyecto</TableCell>
                    <TableCell style={{ backgroundColor: '#146677f5', color: '#fff' }} align="center">Proceso evaluado</TableCell>
                    <TableCell style={{ backgroundColor: '#146677f5', color: '#fff' }} align="center">Calificación total del proceso</TableCell>
                    <TableCell style={{ backgroundColor: '#146677f5', color: '#fff' }} align="center">Nivel de calidad del proceso</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  <TableRow key={'1w'}>
                    <TableCell component="th" scope="row">
                      {proyecto.nombre}
                    </TableCell>
                    <TableCell align="center">{proceso?.proceso.nombre}</TableCell>
                    <TableCell align="center">{resultados}%</TableCell>
                    <TableCell align="center">{intervalo.nombre}</TableCell>

                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>

            <Typography gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginRight: '1rem' }}>Mejoras a aplicar sobre:</h3>

            </Typography>
            {promedios.map((promedio, index) => (
              <Typography key={index} gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
                <li style={{ fontSize: 18, fontWeight: 400, marginRight: '1rem' }}>{promedio.atributo.nombre}</li>

              </Typography>
            ))}

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Aceptar
            </Button>
            
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
}
