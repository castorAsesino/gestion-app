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
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteModal from '../../pages/components/layout/DeleteModal';
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import Checkbox from '@material-ui/core/Checkbox';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
import { withStyles } from '@material-ui/core/styles';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#4576e0',
    color: '#fff',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
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
    backgroundColor: '#4576e0'
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
function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function AsignarAtributosForm(props) {
  const classes = useStyles();
  const router = useRouter();
  const idProceso = router.query['id'];
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const [procesos, setProcesos] = useState([]);
  const [procesoId, setProcesoId] = useState(idProceso);
  const [id, setId] = React.useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [deleteItem, setDeleteItem] = React.useState(false);
  const [seleccionados, setSeleccionados] = React.useState([]);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, getValue, reset, } = useForm({
    defaultValues: {
      nombre: "", descripcion: "", /* procesoId: "" */
    }
  });

  useEffect(() => {
    getListData();
  }, []);
  useEffect(() => {
    getProcesos();
  }, [idProceso]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const getAtributoId = async () => {
    fetch("/api/atributo/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log('sad', data)
        setValue('nombre', data.nombre);
        setValue('descripcion', data.descripcion);
        setValue('valor', data.valor);
        /* setValue('procesoId', data.procesoId); */
        /*   setProcesoId(data.procesoId); */
      });
  };
  const handleOpenDialog = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
    // Reseteamos el formulario después de mostrar el mensaje de confirmación
    reset();
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onSubmit = async () => {
    try {

      await createAtributo();

      handleOpenDialog('Datos guardados correctamente');
      router.push('/proceso');
    } catch (error) {
      console.error('Error:', error);
      handleOpenDialog('No se pudo guardar los datos');
    }
  };


  const createAtributo = async () => {
    
    const selectedItems = rows.filter(item => item.seleccionado === true);
    const atributoProcesoIds = selectedItems.map(item => item.id);

    const response = await axios.post("/api/proceso/asignar/" + idProceso, {
      procesoId: +idProceso,
      atributoProcesoIds,
    });

  }
  const getProcesos = async () => {
    if (idProceso !== undefined && idProceso !== null) {
      const response = await axios.get("/api/proceso/asignar/" + idProceso);
      setSeleccionados(response.data)
      console.log(response.data)
      rows.forEach(element => {
        response.data.forEach(index => {
          if (element.id === index.atributoProcesoId) {
            element.seleccionado = true;
          }
        });
      });
    }
  }
  const getListData = async () => {
    const response = await axios.get("/api/atributo");
    const newList = response.data.map(item => ({ ...item, seleccionado: false }));
    setRows(newList);

  }


  const handleCheckboxChange = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, seleccionado: !row.seleccionado } : row
      )
    );
  };

  return (
    <Container component="main" >
      <CssBaseline />
     
        <div className={classes.paper}>
        <Typography component="h1" variant="h4" style={{ margin: 15, fontWeight: 500, textAlign: 'center' }}>
        Seleccionar Atributo de Proceso
          </Typography>
          
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nombre</StyledTableCell>
                  <StyledTableCell align="center">Descripción</StyledTableCell>
                  <StyledTableCell align="center">Valor</StyledTableCell>
                  <StyledTableCell align="center">Seleccionar</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                      {row.nombre}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {row.descripcion}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {row.valor}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Checkbox
                        checked={row.seleccionado}
                        onChange={() => handleCheckboxChange(row.id)}
                        color="primary"
                      />
                    </TableCell>

                  </TableRow>
                ))}
                {emptyRows > 0 && rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center"> No se encontraron registros.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
                    colSpan={4}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'Registros por páginas' },
                      native: true,
                    }}
                    labelRowsPerPage={"Registros por páginas"}
                    labelDisplayedRows={
                      ({ from, to, count }) => {
                        return '' + from + '-' + to + ' de ' + count
                      }
                    }
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions} />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
         
        </div>

        <Grid item xs={12} sm={12} lg={12} style={{ marginTop: 10, marginBottom: 20 }}>
            <div style={{ float: 'right' }}>
              <Button variant="contained"  size="large" className={classes.margin}  style={{ marginRight: '10px', backgroundColor: 'rgb(135 138 157)', color: '#FFFFFF' }} component={Link} href="/proceso">
                Cancelar
              </Button>
              <Button variant="contained" color="primary" size="large" className={classes.margin} onClick={onSubmit}>
                Guardar
              </Button>
            </div>
          </Grid>


      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/*  <DialogTitle id="alert-dialog-title">{"Mensaje de Confirmación"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

    </Container >
  );
}