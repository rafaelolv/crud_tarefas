import { React, useState } from "react";

import ModalNovaTarefa from "./ModalNovaTarefa";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import style from "../style/PageList.module.css";



const TableHeader = ({ filtrarDatas, filtrarTarefasByStatus }) => {

    const [ordem, setOrdem] = useState('');

    const handleChangeOrdem = (event) => {
        setOrdem(event.target.value);

        filtrarDatas(event.target.value);
    };

    const [status, setStatus] = useState('');

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);

        filtrarTarefasByStatus(event.target.value);
    };


    return (
        <header className={style.tableHeader}>
            
            <ModalNovaTarefa />
            
            <div className={style.boxFiltros}>
                <Box sx={{ minWidth: 160, margin: 1 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Filtrar por data</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ordem}
                            label="Ordem"
                            onChange={handleChangeOrdem}
                            >
                            <MenuItem value={"recentes"}>Mais recentes</MenuItem>
                            <MenuItem value={"antigas"}>Mais antigas</MenuItem>
                            
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 170, margin: 1 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Filtrar por status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            onChange={handleChangeStatus}
                            >
                            <MenuItem value={true}>Concluídas</MenuItem>
                            <MenuItem value={false}>Pendentes</MenuItem>
                            
                        </Select>
                    </FormControl>
                </Box>
            </div>
        </header>
    )
}

export default TableHeader;