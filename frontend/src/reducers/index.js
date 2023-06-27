import tarefas from "./tarefaReducer";
// import produtos from "./produtoReducer";
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    tarefas: tarefas,
});