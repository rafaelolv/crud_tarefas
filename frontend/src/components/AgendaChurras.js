import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { retrieveAllChurras } from "../actions/churrasAction";

import { RETRIEVE_ALL_CHURRAS } from './../actions/actionTypes/churrasActionType';

import Churras from "../components/Churras";
import BotaoNewChurras from "./BotaoNewChurras";

import style from '../style/Churras.module.css';


const AgendaChurras = () => {


    const listaChurras = useSelector(state => state.churras);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(retrieveAllChurras(listaChurras));
    }, []);


    return (
        <div className={style.agenda}>

            {listaChurras && listaChurras.map((churras, index) => {
                console.log(index);
                return <Churras churras={churras} key={index} />
            })}

            <BotaoNewChurras />
        </div>
    )
}

export default AgendaChurras;