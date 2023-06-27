import React from "react";
import ModalNewChurras from "./ModalNewChurras";

import style from "../style/Churras.module.css";


const BotaoNewChurras = () => {


    return (
        <div className={style.botaoNewChurras}>
            <ModalNewChurras />
            <div>
                <h3>Adicionar Churras</h3>
            </div>
        </div>
    )
}

export default BotaoNewChurras;