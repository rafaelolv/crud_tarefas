import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { update } from "../actions/tarefaAction";

import ModalNovaTarefa from "../components/ModalNovaTarefa";
import TableHeader from "../components/TableHeader";

import { yellow } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import style from "../style/PageList.module.css";


const ListaTarefas = () => {

    const listaTarefas = useSelector(state => state.tarefas);

    const [status, setStatus] = useState("");
    const [tarefas, setTarefas] = useState(listaTarefas);
    const [checkedState, setCheckedState] = useState(
        new Array(listaTarefas.length).fill(false)
    );

    const BOTAOEDITAR = "BOTAOEDITAR";

    const dispatch = useDispatch();


    // 
    const atualizaListaCheckedState = (tarefa) => {
        // setCheckedState(...checkedState, tarefa.isConcluida);
        
    }

    
    // 
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
        
        setCheckedState(updatedCheckedState);
        
        listaTarefas[position].isConcluida = updatedCheckedState;

        console.log(listaTarefas[position]);

        // dispatch(update(listaTarefas[position]));

        console.table(listaTarefas);
    }


    // Função utilitaria para formatar uma data adicionando zero antes de dias e meses com um algarismo.
    function adicionaZero(numero){
        if (numero <= 9) 
            return "0" + numero;
        else
            return numero; 
    }


    // Método para formatar datas
    const formataData = (data) => {

        let dataFormatada = adicionaZero(new Date(data).getDate()).toString() + "/" + adicionaZero(new Date(data).getMonth()+1).toString() + "/" + new Date(data).getFullYear().toString();

        return dataFormatada;
    }


    // Retorna uma data já formatada
    const getDataFormatada = (data) => {

        return formataData(data);
    }


    //Método responsável por ordenar as tarefas por data de criação (mais recentes primeiro ou mais antigas primeiro).
    const filtrarDatas = (valor) => {

        let listaDataFiltrada = listaTarefas.sort(function(a, b) { 
            return new Date(b.data).getTime() - new Date(a.data).getTime() 
        });

        if(valor === "antigas") {
            listaDataFiltrada.reverse();
        }

        setTarefas([...listaDataFiltrada]);
    }


    // filtrar as tarefas por status (concluídas ou pendentes).
    const filtrarTarefasByStatus = (status) => {

        setStatus(status);

        return status;
    }


    // 
    function Row({ tarefa, index }) {

        const [open, setOpen] = useState(false);
      

        return (
            <>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                            >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>

                    <TableCell>
                        <Checkbox
                            icon={<RadioButtonUncheckedIcon sx={{ color: '#FDEE2F' }} />}
                            checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#FDEE2F' }} />}
                            id={tarefa.id}
                            checked={checkedState[index]}
                            onChange={() => handleOnChange(index)}
                            inputProps={{ 'aria-label': 'controlled' }}
                            value={tarefa.titulo}
                        />
                    </TableCell>

                    <TableCell component="th" scope="row">
                        {checkedState[index] === true ? <s> {tarefa.titulo + " " + tarefa.isConcluida.toString()}</s> : tarefa.titulo + " " + tarefa.isConcluida.toString()}
                    </TableCell>
                    <TableCell align="right"></TableCell> 
                    <TableCell >{checkedState[index] === true ? <s>{ getDataFormatada(tarefa.data) + " " + index} </s> : getDataFormatada(tarefa.data) + " " + index }</TableCell>
                    <TableCell align="right">
                        <ModalNovaTarefa botaoEditar={BOTAOEDITAR} tarefaEditar={tarefa} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 3 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Descrição
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={tarefa.id}>
                                            <TableCell component="th" scope="row">
                                                {tarefa.descricao}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    }

    return (
        <main className={style.mainList}>
            <div className={style.boxTableList}>
                <TableHeader filtrarDatas={filtrarDatas} filtrarTarefasByStatus={filtrarTarefasByStatus} atualizaListaCheckedState={atualizaListaCheckedState}  />
                
                <TableContainer component={Paper} style={{ width: '100%' }} >
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell />
                                <TableCell><h2>Tarefa</h2></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell><h2>Data</h2></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {status !== ''
                                ? listaTarefas && listaTarefas.map((tarefa, index) => (
                                    status === tarefa.isConcluida
                                        ? <Row key={listaTarefas.name} tarefa={tarefa} index={index} />
                                        : <></>
                                ))

                                : listaTarefas && listaTarefas.map((tarefa, index) => (
                                <Row key={listaTarefas.name} tarefa={tarefa} index={index} />
                                )) 

                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </main>
    )
}

export default ListaTarefas;