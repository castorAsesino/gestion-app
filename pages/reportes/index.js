import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
  Container,
  Card,
  FormGroup,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  TextareaAutosize,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { VpnKey as LoginIcon, Person } from '@material-ui/icons';
import axios from 'axios';
import Link from '../../src/Link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonColor: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#146677f5',
  },
  root: {
    marginTop: 20,
    padding: theme.spacing(3),
  },
  title: {
    color: '#556cd6',
    fontSize: 2,
    fontWeight: '700',
  },
  badge: {
    display: 'inline-block',
    padding: '0.25em 0.4em',
    fontSize: '75%',
    fontWeight: '700',
    lineHeight: '1',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '0.25rem',
    color: '#fff',
  },
  nivelDeficiente: {
    backgroundColor: '#dc3545',
  },
  nivelAceptable: {
    backgroundColor: '#ffc107',
  },
  nivelSatisfactorio: {
    backgroundColor: '#3b4b95',
  },
  nivelExcelente: {
    backgroundColor: '#5cba16',
  },
}));

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
  variant: 'menu',
  getContentAnchorEl: null,
};

const getRandomColor  = () => {
  const r = Math.floor((Math.random() * 127) + 127);
  const g = Math.floor((Math.random() * 127) + 127);
  const b = Math.floor((Math.random() * 127) + 127);
  return `rgb(${r}, ${g}, ${b})`;
};

const generateColors  = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(getRandomColor ());
  }
  return colors;
};

const levelColors = {
  'Nivel Deficiente': '#dc3545',
  'Nivel Aceptable': '#ffc107',
  'Nivel Satisfactorio': '#3b4b95',
  'Nivel Excelente': '#5cba16',
};

const getLevelColor = (level) => levelColors[level] || '#000000';
const prepareChartData = (data) => {
  const pieData = data.reduce((acc, curr) => {
    const level = curr.Niveles.nombre;
    if (acc[level]) {
      acc[level] += 1;
    } else {
      acc[level] = 1;
    }
    return acc;
  }, {});

  //const pieColors = generateColors(Object.keys(pieData).length);
  const pieColors = Object.keys(pieData).map(getLevelColor);
  const pieChartData = {
    labels: Object.keys(pieData),
    datasets: [
      {
        label: 'Distribución de Calificaciones por Nivel',
        data: Object.values(pieData),
        backgroundColor: pieColors,
        borderColor: pieColors,
        borderWidth: 1,
      },
    ],
  };

  const barData = data.reduce((acc, curr) => {
    const proceso = curr.Proceso.nombre;
    if (acc[proceso]) {
      acc[proceso].push(curr.calificacion);
    } else {
      acc[proceso] = [curr.calificacion];
    }
    return acc;
  }, {});

  const barColors = generateColors(Object.keys(barData).length);

  const barChartData = {
    labels: Object.keys(barData),
    datasets: Object.keys(barData).map((proceso, index) => ({
      label: proceso,
      data: barData[proceso],
      backgroundColor: barColors[index],
      borderColor: barColors[index],
      borderWidth: 1,
    })),
  };

  return { pieChartData, barChartData };
};

export default function Reportes(props) {
  const classes = useStyles();
  const router = useRouter();
  const [expanded, setExpanded] = useState('panel1');
  const [proyectoId, setProyectoId] = useState('');
  const [procesoId, setProcesoId] = useState('');
  const [nivelId, setNivelId] = useState('');
  const [proyectos, setProyectos] = useState([]);
  const [procesos, setProcesos] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [resultado, setResultado] = useState([]);
  const [pieChartData, setPieChartData] = useState({ datasets: [] });
  const [barChartData, setBarChartData] = useState({ datasets: [] });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      proyectoId: '',
      procesoId: '',
      nivelId: '',
    },
  });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangerecurso = (event) => {
    setValue('proyectoId', event.target.value);
    setProyectoId(event.target.value);
    getListDataProceso(event.target.value);
  };

  const handleProceso = (event) => {
    setValue('procesoId', event.target.value);
    setProcesoId(event.target.value);
  };

  const handleNivel = (event) => {
    setValue('nivelId', event.target.value);
    setNivelId(event.target.value);
  };

  useEffect(() => {
    getListData();
    getListDataNivel();
  }, []);

  const getListData = async () => {
    const response = await axios.get('/api/proyecto');
    setProyectos(response.data);
  };

  const getListDataProceso = async (value) => {
    debugger
    const response = await axios.get(`/api/proceso-proyecto`, {
      params: {
        id: +value,
      },
    });
    setProcesos(response.data);
  };

  const getListDataNivel = async () => {
    const response = await axios.get('/api/nivel');
    setNiveles(response.data);
  };

  const buscar = async () => {
    let data = {
      
    };
    if (proyectoId !== null && proyectoId !== "") {
      data['idProyecto'] = idProyecto
    }
    if (procesoId !== null && procesoId !== "") {
      data['idProceso'] = procesoId
    }
    if (nivelId !== null && nivelId !== "") {
      data['nivelId'] = nivelId
    }
    const response = await axios.get(`/api/evaluar`, {
      params: data
    });
    setResultado(response.data);
    const chartData = prepareChartData(response.data);
    console.log(chartData)
    setPieChartData(chartData.pieChartData);
    setBarChartData(chartData.barChartData);
  };
  const getBadgeClass = (nivel) => {
    switch (nivel) {
      case 'Nivel Deficiente':
        return classes.nivelDeficiente;
      case 'Nivel Aceptable':
        return classes.nivelAceptable;
      case 'Nivel Satisfactorio':
        return classes.nivelSatisfactorio;
      case 'Nivel Excelente':
        return classes.nivelExcelente;
      default:
        return '';
    }
  };
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div>
          <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography variant="h6">Filtros de Búsqueda</Typography>
            </AccordionSummary>
            <AccordionDetails>

              <Grid item xs={4} style={{ padding: 15 }}>
                <FormControl fullWidth>
                  <InputLabel>Seleccionar Proyecto</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleChangerecurso}
                    error={errors.proyectoId}
                    helperText={errors.proyectoId ? 'Empty field' : ''}
                    inputProps={register('proyectoId')}
                    value={proyectoId}
                  >
                    {proyectos.map((row, index) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} style={{ padding: 15 }}>
                <FormControl fullWidth={true}>
                  <InputLabel>Seleccionar Proceso</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleProceso}
                    error={errors.procesoId}
                    helperText={errors.procesoId ? 'Empty field' : ''}
                    inputProps={register('procesoId')}
                    value={procesoId}
                    input={<Input />}
                    MenuProps={MenuProps}
                    required={true}

                  >
                    {procesos.map((option) => (
                      <MenuItem key={option.proceso.id} value={option.proceso.id}>
                        {option.proceso.nombre}
                      </MenuItem>
                    ))}

                  </Select>
                </FormControl>


              </Grid>
              <Grid item xs={4} style={{ padding: 15 }}>
                <FormControl fullWidth>
                  <InputLabel>Seleccionar Nivel</InputLabel>
                  <Select
                    fullWidth
                    onChange={handleNivel}
                    error={errors.nivelId}
                    helperText={errors.nivelId ? 'Empty field' : ''}
                    inputProps={register('nivelId')}
                    value={nivelId}
                  >
                    {niveles.map((row, index) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={2} sm={2} lg={2}>
                <div style={{ float: 'right', paddingTop: 10 }}>
                  <Button
                    onClick={buscar}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.margin}
                  >
                    Generar Reporte
                  </Button>
                </div>
              </Grid>
              <br />

            </AccordionDetails>
          </Accordion>
        </div>
      </CardContent>

      <CardActions>

      </CardActions>
      <CardContent>



        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>

            <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="rigth">Proceso</TableCell>
                    <TableCell align="rigth">Nivel</TableCell>
                    <TableCell align="center">Calificación</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultado.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="rigth">{row.Proceso.nombre}</TableCell>
                      <TableCell align="rigth"><span className={`${classes.badge} ${getBadgeClass(row.Niveles.nombre)}`}>
                        {row.Niveles.nombre}
                      </span></TableCell>
                      <TableCell align="center">{row.calificacion}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>

          </Grid>
        </Grid>


      </CardContent>
      <Grid container spacing={2} justifyContent="center">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '45%' }}>
              {pieChartData.datasets.length > 0 && <Pie data={pieChartData} />}
            </div>
          </Grid>
          <Grid item xs={6}>
            {barChartData.datasets.length > 0 && <Bar data={barChartData} />}
          </Grid>
        </Grid>

      </Grid>
    </Card>
  );
}
