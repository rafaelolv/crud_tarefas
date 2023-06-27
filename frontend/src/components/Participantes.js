import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateDadosChurras } from "../actions/churrasAction";

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import style from "../style/PageList.module.css";


const Participantes = ({ churrasEscolhido }) => {

    const dispatch = useDispatch();

    const listaChurras = useSelector(state => state.churras);


    const [checkedState, setCheckedState] = useState(

        new Array(churrasEscolhido.listaParticipantes && churrasEscolhido.listaParticipantes.length).fill(false)
    )


    // 
    const atualizaDadosChurras = (participante) => {

        const id = churrasEscolhido.id-1;

        let churrasAtualizado = [...listaChurras];

        if(participante.confirmado) {

            churrasAtualizado.find((churras) => churras.id == churrasEscolhido.id).numParticipantes = churrasEscolhido.numParticipantes + 1;
            churrasAtualizado.find((churras) => churras.id == churrasEscolhido.id).totalArrecadado = parseInt(churrasEscolhido.totalArrecadado) + parseInt(participante.valor);
        } else {

            churrasAtualizado.find((churras) => churras.id == churrasEscolhido.id).numParticipantes = churrasEscolhido.numParticipantes - 1;
            churrasAtualizado.find((churras) => churras.id == churrasEscolhido.id).totalArrecadado = parseInt(churrasEscolhido.totalArrecadado) - parseInt(participante.valor);
        }

        console.table(churrasAtualizado);

        dispatch(updateDadosChurras(churrasAtualizado));
    }



    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
    
        let listChurrasNewParticipante = [...listaChurras];

        let confirmou = listChurrasNewParticipante.find((churras) => churras.id == churrasEscolhido.id).listaParticipantes[position].confirmado;

        let participante = listChurrasNewParticipante.find((churras) => churras.id == churrasEscolhido.id).listaParticipantes[position];

        listChurrasNewParticipante.find((churras) => churras.id == churrasEscolhido.id).listaParticipantes[position].confirmado = !confirmou;

        
        atualizaDadosChurras(participante);

        setCheckedState(updatedCheckedState);
    }


    return (

        <Box width={700}>
                {churrasEscolhido.listaParticipantes && churrasEscolhido.listaParticipantes.map((participante, index) => {
                    return (                        
                            
                        <div className={style.divListaParticipantes} key={index} >
                            <div className={style.divRadioButton}>
                                <Checkbox
                                    icon={<RadioButtonUncheckedIcon sx={{ color: '#FDEE2F' }} />}
                                    checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#FDEE2F' }} />}

                                    checked={checkedState[index]}
                                    onChange={() => handleOnChange(index)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    value={participante.nome}
                                    id={index}
                                />
                                <span>
                                    { participante.nome }
                                </span>
                            </div>
                            <span>
                                {participante.confirmado ? (
                                    `R$ ` + participante.valor
                                ) : (
                                    <s>R$ { participante.valor }</s> 
                                )
                                }
                            </span>
                        </div>
                    )
                })}
        </Box>           
    )
}

export default Participantes;