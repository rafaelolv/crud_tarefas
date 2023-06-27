import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { retrieveAll } from "../actions/tarefaAction";

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

    // const [listaTarefas, setListaTarefas] = useState(useSelector(state => state.tarefas)); 

    // setLista(useSelector(state => state.tarefas));

    const listaTarefas = useSelector(state => state.tarefas);
    const lista = [...listaTarefas];
    const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch(retrieveAll(listaTarefas));
    //   }, []);

    const BOTAOEDITAR = "BOTAOEDITAR";

    const [checkedState, setCheckedState] = useState(
        new Array(listaTarefas.length).fill(false)
    );

    
    // 
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
        
        setCheckedState(updatedCheckedState);
        
        listaTarefas[position].isConcluida = updatedCheckedState;
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

        let dataFormatada = (adicionaZero(new Date(data).getDate().toString()) + "/" + (adicionaZero(new Date(data).getMonth()+1).toString()));
        console.log(dataFormatada);

        return dataFormatada;
    }


    // Retorna uma data já formatada
    const getDataFormatada = (data) => {

        return formataData(data);
    }


    //Método responsável por ordenar as tarefas por data de criação (mais recentes primeiro ou mais antigas primeiro).
    const filtrarDatas = (valor) => {

        let listaFiltrada = listaTarefas.sort(function(a, b) { 
            return new Date(a.data).getTime() - new Date(b.data).getTime() 
        });

        if(valor === "antigas") {
            listaFiltrada.reverse();
        }

        console.log("Aqui em retrieve do filtrar");

        // setListaTarefas([...listaFiltrada]);

        // dispatch(retrieveAll(listaFiltrada));

        // console.table(listaFiltrada);
    }


    // filtrar as tarefas por status (concluídas ou pendentes).
    const filtrarTarefasByStatus = (status) => {

        let lista = [...listaTarefas];

        console.log("1 - listaStatus page");
        console.log(lista);

        let listaTarefasFiltrada = lista.filter((tarefa) => tarefa.isConcluida === status);

        console.log("listaTarefas");
        console.table(listaTarefas);

        console.log("lista");
        console.table(lista);

        console.log("listaTarefasFiltrada");
        console.table(listaTarefasFiltrada);

        // dispatch(retrieveAll(listaTarefasFiltrada));
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
                        {checkedState[index] === true ? <s> {tarefa.titulo}</s> : tarefa.titulo}
                    </TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell >{ getDataFormatada(tarefa.data) }</TableCell>
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
                <TableHeader filtrarDatas={filtrarDatas} filtrarTarefasByStatus={filtrarTarefasByStatus} />
                
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
                            {listaTarefas && listaTarefas.map((tarefa, index) => (
                                <Row key={listaTarefas.name} tarefa={tarefa} index={index} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </main>
    )
}

export default ListaTarefas;