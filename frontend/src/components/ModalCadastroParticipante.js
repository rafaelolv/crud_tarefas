import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createChurras, addParticipante, updateDadosChurras } from "../actions/churrasAction";

import style from "../style/CadastroParticipante.module.css";

import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const styleMui = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#FDEE2F',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ModalCadastroParticipante = ({ getParticipante, churrasEscolhido }) => {

    const initialStateParticipante = {
        nome: "",
        valor: "",
        confirmado: true,
    };


    // 
    const[participante, setParticipante] = useState(initialStateParticipante);

    // Estados do modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const listaChurras = useSelector(state => state.churras);


    // Método usado para setar as informações do participante no churras
    const handleInputChangeParticipante = event => {
        const { name, value } = event.target;
        setParticipante({ ...participante, [name]: value });
    };


    // 
    const atualizaDadosChurras = () => {


        let churrasAtualizado = [...listaChurras];

        churrasAtualizado.find((churras) => churras.id == churrasEscolhido.id).numParticipantes = churrasEscolhido.numParticipantes + 1;

        churrasAtualizado.find((churras) => churras.id == churrasEscolhido.id).totalArrecadado = parseInt(churrasEscolhido.totalArrecadado) + parseInt(participante.valor);


        dispatch(updateDadosChurras(churrasAtualizado));
    }


    // 
    const adicionarParticipante = () => {

        getParticipante(participante);
        atualizaDadosChurras();

        navigate("/eventos");
    }


    return (
        <>
            <Button onClick={handleOpen} sx={{borderRadius: 25}}>
                <PersonAddAlt1RoundedIcon sx={{ fontSize: 50, color: '#ffea00', border: 4, borderRadius: 25 }} />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleMui}>
                    <form className={style.formAddParticipante}>
                        <header>
                            <h1>
                                Cadastrar participante
                            </h1>
                        </header>
                        <div>
                            <label htmlFor="Nome">
                                Nome
                            </label><br/>
                            <input type="text" id="nome" label="Nome" name="nome" required value={participante.nome} placeholder="Nome" onChange={handleInputChangeParticipante} />
                        </div>
                        <div className={style.divInputRadio}>
                            <h2>Vai beber ou só comer?</h2>
                            <div>
                                <label for="Valor com bebida">Valor com bebida R$ {churrasEscolhido.valorComBebida}</label>
                                <input type="radio" id="comBebida" name="valor" value={churrasEscolhido.valorComBebida} onChange={handleInputChangeParticipante} />
                                
                                <label for="Valor sem bebida">Valor sem bebida R$ {churrasEscolhido.valorSemBebida}</label>
                                <input type="radio" id="semBebida" name="valor" value={churrasEscolhido.valorSemBebida} onChange={handleInputChangeParticipante} />
                            </div>
                        </div>
                        <div>
                            <button type="submit" onClick={adicionarParticipante}>
                                Cadastrar
                            </button>
                        </div>
                    </form>       
                </Box>   
            </Modal>
        </>  
    )
};

export default ModalCadastroParticipante;