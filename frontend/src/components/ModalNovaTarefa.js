import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import { create, update } from "../actions/tarefaAction";

import style from "../style/Churras.module.css";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EditIcon from '@mui/icons-material/Edit';

const styleMui = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#FDEE2F',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ModalNovaTarefa = ({ botaoEditar, tarefaEditar }) => {

    const initialStateTarefa = {
        id: uuidv4(),
        isConcluida: false,
        data: "",
        titulo: "",
        descricao: ""
    }

    const [tarefa, setTarefa] = useState(initialStateTarefa);

    // Estados do modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    let params = useParams();


    // 
    // useEffect(() => {
    //     editarTarefa(params);
    // }, [params.id]);


    // Método usado para setar as informações do novo churras 
    const handleInputChangeTarefa = event => {
        const { name, value } = event.target;
        setTarefa({ ...tarefa, [name]: value });
    };

    
    // 
    const cadastrarNovaTarefa = () => {

        if(tarefaEditar) {
            console.log("tarefa para editar!!!! entrou aqui???");
            dispatch(update(tarefa));
        } else {
            dispatch(create(tarefa));
        }

        setTarefa(initialStateTarefa);
    }

    // Método utilizado para editar uma tarefa selecionada
    const editarTarefa = () => {
        console.log("Editar Tarefa!!! " + tarefaEditar.titulo);
        setTarefa(tarefaEditar);
        handleOpen();
    }


    return (
        <>
            {botaoEditar ? <Button variant="contained" sx={{backgroundColor: '#2A323D'}} endIcon={<EditIcon />} onClick={editarTarefa} >Editar</Button> 
                : <Button onClick={handleOpen} variant="contained" sx={{margin: 1, backgroundColor: '#2A323D'}} endIcon={<AddTaskIcon sx={{color: '#FFFFFF' }} />} >Nova Tarefa</Button>}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleMui}>
                    <form className={style.formNewChurras}>
                        <div>
                            <h1><b>Cadastrar Nova Tarefa</b></h1>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="Data">
                                    Data
                                </label><br/>
                                <input type="date" id="data" label="Data" name="data" required value={tarefa.data} onChange={handleInputChangeTarefa}
                                    />
                            </div>
                            <div>
                                <label htmlFor="Título">
                                    Título
                                </label><br/>
                                <input 
                                    type="text" id="titulo" label="Título" name="titulo" required value={tarefa.titulo}  placeholder="Título" 
                                        onChange={handleInputChangeTarefa} />
                            </div>
                            <div>
                                <label htmlFor="Descrição">
                                    Descrição
                                </label><br/>
                                <input 
                                    type="text" id="descricao" label="Descrição" name="descricao" required value={tarefa.descricao}  placeholder="Descrição" 
                                        onChange={handleInputChangeTarefa} />
                            </div>
                        </div>
                    </form>
                    <div className={style.divButtonCadastrarNovoChurras}>
                        <button type="submit" onClick={cadastrarNovaTarefa}>
                            Cadastrar
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModalNovaTarefa;