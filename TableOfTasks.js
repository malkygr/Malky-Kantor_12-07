import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function TableOfTasks({...props}) {

    const classes = useStyles();
    const [rows, setRow] = React.useState([
        { name: 'Ron', email: 'Ron@gmail.com', discription: 'write a book', date: '2020-07-12' },
        { name: 'Bob', email: 'Bob@gmail.com', discription: 'write a sing', date: '2020-07-12' },
        { name: 'Ana', email: 'Ana@gmail.com', discription: 'write a article', date: '2020-07-12' }
    ])
    const [newPerson, setNewPerson] = React.useState({ name: '', email: '', discription: '', date: '' })

    const [isAdd, setAdd] = React.useState(false)
    const [isEdit, setIsEdit] = React.useState(false)
    const [indexForEdit, setIndexForEdit] = React.useState(null)


    const onDelete = (name) => {
        var array = [...rows]
        var index = array.findIndex(n => n.name === name)
        if (index !== -1) {
            array.splice(index, 1);
            setRow(array);
        }
    }

    const onEdit = (event) => {
        var index = rows.findIndex(obj => obj.name === event.name)
        setIndexForEdit(index)
        setNewPerson(event)
        setIsEdit(true)
    }

    const onSave = () => {
        var array = [...rows]
        array.push(newPerson)
        setRow(array)
        setAdd(false)
        setNewPerson({ name: '', email: '', discription: '', date: '' })
    }

    const onUpdate = () => {
        var data = [...rows];
        data[indexForEdit] = newPerson
        setRow(data);
        setIsEdit(false)
        setNewPerson({ name: '', email: '', discription: '', date: '' })
    }

    const onAdd = () => {
        setAdd(true)
    }
    const onCancel = () => {
        setAdd(false)
        setIsEdit(false)
    }

    const myName = (event) => {
        var data = newPerson
        data.name = event.target.value;
        setNewPerson(data)
    }
    const myEmail = (event) => {
        var data = newPerson;
        data.email = event.target.value;
        setNewPerson(data)
    }
    const myTask = (event) => {
        var data = newPerson;
        data.discription = event.target.value;
        setNewPerson(data)
    }
    const myDate = (event) => {
        var data = newPerson;
        data.date = event.target.value;
        setNewPerson(data)
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Box m={3}>
                <Button variant="contained" color="secondary" onClick={onAdd}>add a new task</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">E-mail</StyledTableCell>
                            <StyledTableCell align="right">discription&nbsp;of&nbsp;task</StyledTableCell>
                            <StyledTableCell align="right">start&nbsp;date</StyledTableCell>
                            <StyledTableCell align="right">actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length ? rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.email}</StyledTableCell>
                                <StyledTableCell align="right">{row.discription}</StyledTableCell>
                                <StyledTableCell align="right">{row.date}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <IconButton aria-label="delete" >
                                        <DeleteIcon onClick={(e) => onDelete(row.name, e)} />
                                    </IconButton>
                                    <IconButton aria-label="edit" >
                                        <EditIcon onClick={(e) => onEdit(row, e)} />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        )) : <p>NO TASKS</p>}
                        <TablePagination
                            rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
            {isAdd || isEdit
                ? <form>
                    {isAdd ? <Button color="secondary" onClick={onSave}>save</Button>
                        : <Button color="secondary" onClick={onUpdate}>Update</Button>}
                    <Button color="primary" onClick={onCancel}>cancel</Button>
                    <TextField required
                        defaultValue={newPerson.name}
                        helperText="Enter your name" onBlur={myName} style={{ margin: 8 }}
                    />
                    <TextField required style={{ margin: 8 }}
                        defaultValue={newPerson.email}
                        helperText="Enter your E-mail" onBlur={myEmail}
                    />
                    <TextField required style={{ margin: 8 }}
                        defaultValue={newPerson.discription}
                        helperText="Enter your task" onBlur={myTask}
                    />
                    <TextField required style={{ margin: 8 }}
                        defaultValue={newPerson.date}
                        helperText="Enter your start date" onBlur={myDate}
                    />
                </form>
                : null
            }    </div>
    );
}
