import React from "react";

import '../style/Global.module.css';
import style from "../style/HeaderPages.module.css";


const Header = () => {

    return (

        <header className={style.header}>
            <h1>Lista de tarefas</h1>
        </header>
    )
}

export default Header;