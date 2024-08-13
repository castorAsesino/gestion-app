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
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';



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
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  tableContainer: {
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  center: {
    textAlign: 'center',
    fontSize: 40,
  },
  right: {
    textAlign: 'right',
  },
  addButton: {
    textAlign: 'right',
    backgroundColor: '#146677f5'
  },
  headerStyle: {
    fontWeight: 900,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: '100%',
  },
  tableCell: {
    width: 100,
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  tableCellDescription: {
    width: 200,
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  tableCellActions: {
    width: 100,
    border: '1px solid #ddd',
    textAlign: 'center',
  },
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
  const [proyecto, setProyecto] = React.useState(null);
  const [proceso, setProceso] = React.useState(null);
  const [resultados, setResultados] = React.useState(null);
  const [intervalo, setIntervalo] = React.useState(null);
  const [promedios, setPromedios] = React.useState([]);
  const [isGuardarEnabled, setIsGuardarEnabled] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getListNivel();
    getCalificacion();
    getProyectoId();
    if (idProyecto) {
      getListData();
    }
  }, [idProyecto]);

  useEffect(() => {
    if (deleteItem) {
      axios.delete('/api/proceso/' + id).then(() => {
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
    if (idProyecto) {
      const response = await axios.get("/api/proceso/asignar/" + idProyecto);
      const newList = response.data.map(item => ({ ...item, calificacion: 0, ponderacion: "", totalPonderacion: 0 }));
      setRows(newList);
      if (newList.length > 0) {
        setProceso(newList[0]);
      }
    }
  };

  const getProyectoId = async () => {
    const id = localStorage.getItem('idProyecto');
    const response = await fetch("/api/proyecto/" + id);
    const data = await response.json();
    setProyecto(data);
  };

  const handlePonderacionChange = (event, id) => {
    const { value } = event.target;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, ponderacion: +value } : row
      )
    );
    calcularTotal(id);
   
  };
  
  useEffect(() => {
    const totalPonderacion = rows.reduce((sum, row) => sum + (row.calificacion || 0), 0);
    setIsGuardarEnabled(totalPonderacion === 100);
  }, [rows]);


  const handleChange = (event, id) => {
    const { value } = event.target;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, calificacion: +value } : row
      )
    );
    calcularTotal(id);
  };

  const calcularTotal = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, totalPonderacion: row.calificacion * row.ponderacion } : row
      )
    );
  };

  const validar = () => {
    let totalPonderacionTotal = 0;
    let calificacionPonderada = 0;

    const valorMasAlto = calificaciones.reduce(
      (max, valor) => (max.valor > valor.valor ? max : valor),
      { valor: 0 }
    );

    rows.forEach((element) => {
      totalPonderacionTotal += element.calificacion || 0;
      calificacionPonderada += element.totalPonderacion || 0;
    });

    if (totalPonderacionTotal > 100) {
      alert('Ponderación supera el límite permitido.');
      return;
    }

    let resultado = 0;
    if (totalPonderacionTotal > 0 && valorMasAlto.valor > 0) {
      let resultadoDiv = calificacionPonderada / totalPonderacionTotal;
      resultado = (resultadoDiv / valorMasAlto.valor) * 100;
      resultado = parseFloat(resultado.toFixed(2));
    }

    setResultados(resultado);

    const intervalo = niveles.find(
      (intervalo) => resultado >= intervalo.valorMin && resultado <= intervalo.valorMax
    );

    const promedioPonderacionTotal =
      rows.reduce((acc, curr) => acc + (curr.totalPonderacion || 0), 0) / rows.length;

    const prom = rows.filter(
      (item) => item.totalPonderacion <= promedioPonderacionTotal
    );

    setPromedios(prom);
    setIntervalo(intervalo);

    handleClickOpen();

    
  };

  const enviar = async () => {
   
    console.log(promedios);

    let aux = [];

    for (const element of promedios) {
      if (element && element.atributo) {
        aux.push(element.atributo);
      }
    }

    console.log(aux);
    const payload = {
      calificacion: resultados,
      nivelId: intervalo ? intervalo.id : null,
      procesoId: proceso ? proceso.procesoId : null,
      proyectoId: proyecto ? proyecto.id : null,
      atributos: aux
    };

    try {
      const response = await axios.post("/api/evaluar", payload);
      console.log("Respuesta del servidor:", response.data);
  
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
    
    }
  };
  useEffect(() => {
    if(promedios !== null && resultados !== null && intervalo !==null){
      enviar();
    }
    
  }, [promedios, resultados, intervalo]);




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
            {rows.length > 0 ? rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell className={classes.tableCell} component="th" scope="row">
                  {row.atributo.nombre}
                </StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">{row.atributo.descripcion}</StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">
                  <FormControl className={classes.formControl}>
                    <Select
                      value={row.ponderacion}
                      onChange={(e) => handlePonderacionChange(e, row.id)}
                    >
                      {calificaciones.map((nivel) => (
                        <MenuItem key={nivel.id} value={nivel.valor}>
                          {nivel.descripcion}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center">
                  <TextField
                    label=""
                    variant="standard"
                    fullWidth
                    margin="normal"
                    value={row.calificacion}
                    onChange={(e) => handleChange(e, row.id)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell className={classes.tableCell} align="center" style={{ fontWeight: 500, fontSize: 18 }}>
                  {row.totalPonderacion}
                </StyledTableCell>
              </StyledTableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No se encontraron registros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > 0 && (
        <Grid item xs={12} sm={12} lg={12} style={{ marginTop: 20 }}>
          <div style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              /* color="secondary" */
              size="large"
              className={classes.margin}
              style={{ marginRight: '10px', backgroundColor: 'rgb(135 138 157)', color: '#FFFFFF' }}
              component={Link}
              href="/evaluacion-calidad"

            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.buttonColor}
              onClick={validar}
              disabled={!isGuardarEnabled} 

            >
              Guardar
            </Button>
          </div>
        </Grid>

      )}

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
                    {proyecto ? proyecto.nombre : 'No definido'}
                  </TableCell>
                  <TableCell align="center">{proceso?.proceso.nombre}</TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>{resultados}%</TableCell>
                  <TableCell align="center">{intervalo ? intervalo.nombre : 'No definido'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br /><br />
          <Typography gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
            <li style={{ fontSize: 18, fontWeight: 800, marginRight: '1rem' }}>Calificación total del proceso:</li>
            <span>{resultados} %</span>
          </Typography>
          <Typography gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
            <li style={{ fontSize: 18, fontWeight: 800, marginRight: '1rem' }}>Nivel de calidad del proceso:</li>
            <span>{intervalo ? intervalo.nombre : 'No definido'}</span>
          </Typography>
          <Typography gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginRight: '1rem' }}>Se recomienda aplicar mejoras sobre los siguientes (AP):</h3>
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
    </Container>
  );
}
