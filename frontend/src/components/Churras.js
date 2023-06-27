import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import PlaylistAddCircleRoundedIcon from '@mui/icons-material/PlaylistAddCircleRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import { yellow } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';

import style from '../style/Churras.module.css';


const Churras = ({ churras }) => {

    let navigate = useNavigate();
    console.log(new Date(churras.data.toString()));

    const mes = new Date(churras.data.toString()).getMonth();
    const dia = new Date(churras.data.toString()).getDate();



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


    // 
    const acessarListaParticipantes = () => {
        // console.log("churras.id " + churras.id);
        // navigate("/lista/" + churras.id);
    }

    return (
        <div className={style.churras}>
            <div className={style.divChurrasHeader}>
                <div className={style.divChurrasDataDesc}>
                    <div>
                        <h1>{getDataFormatada(churras.data)}</h1>
                    </div>
                    <div>
                        <span>
                            <h2>{churras.descricao}</h2>
                        </span>
                    </div>
                </div>
                <div className={style.divButtonIconsChurras}>
                    <IconButton onClick={acessarListaParticipantes}>
                        <Link to={"/lista/" + churras.id} >
                            <PlaylistAddCircleRoundedIcon sx={{ fontSize: 50, color: '#ffea00' }} />
                        </Link>
                    </IconButton>
                </div>
            </div>
            <div className={style.divChurrasInfo}>
                <div>
                    <div className={style.divButtonIconsChurras}>
                        <GroupRoundedIcon sx={{ color: '#ffea00' }} />
                    </div>
                    <div>
                        <p>{churras.numParticipantes}</p>
                    </div>    
                </div>
                <div>
                    <div className={style.divButtonIconsChurras}>
                        <MonetizationOnRoundedIcon sx={{ color: '#ffea00' }} />
                    </div>
                    <div>
                        <p>{ churras.totalArrecadado}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Churras;