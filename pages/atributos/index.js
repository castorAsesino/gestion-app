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
import DeleteModal from '../../pages/components/layout/DeleteModal'

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
const useStyles = makeStyles((theme) => ({
  main: {
    background: '#fff',
    borderRadius: '5px',
    padding: '3rem',
  },
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

export default function Atributos(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [deleteItem, setDeleteItem] = React.useState(false);
  const [id, setId] = React.useState('');

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  useEffect(() => {
    getListData();
  }, []);

  useEffect(() => {
    if (deleteItem) {
      axios
        .delete(("/api/atributo/" + id))
        .then(response => {
          window.location.reload();
        })
    }

  }, [deleteItem, id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getListData = async () => {
    const response = await axios.get("/api/atributo");
    setRows(response.data)
  }



  return (
    <>
      <Container component="main" className={classes.main}>
      <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.center} style={{ fontWeight: 500, }}>
              Atributos de Procesos
            </Typography>
          </Grid>
        <Grid container spacing={3}>
        
          <Grid item xs={12} style={{ marginBottom: 10 }}>
            <Button variant="contained" color="primary" className={classes.addButton} href="/atributos/agregar">
              <Add /> Agregar
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="center">Descripción</StyledTableCell>
               
              {/*   <StyledTableCell align="center">Proceso</StyledTableCell> */}
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell className={classes.tableCell}  component="th" scope="row">
                    {row.nombre}
                  </TableCell>
                  <TableCell className={classes.tableCell}  align="center">
                    {row.descripcion}
                  </TableCell>
                 
                  {/* <TableCell align="center">
                    {row.proceso.nombre}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}  align="center">
                    <IconButton aria-label="delete" title={'Editar'} component={Link} href={'/atributos/editar/' + row.id}>
                      <EditIcon />
                    </IconButton>
                    <DeleteModal setDeleteItem={setDeleteItem} id={row.id} setId={setId}></DeleteModal>
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
      </Container>
    </>
  );
}