import { RETRIEVE_ALL, CREATE, UPDATE, FILTER } from './actionTypes/tarefaActionType';


// 
export const create = (tarefa) => async (dispatch) => {
    try {
      
      dispatch({
        type: CREATE,
        payload: tarefa,
      });

    } catch (err) {
        console.log(err);
    }
};

// 
export const retrieveAll = (listaTarefas) => (dispatch) => {
    try {
    
        dispatch({
            type: RETRIEVE_ALL,
            payload: listaTarefas,
        });

    } catch (err) {
      console.log(err);
    }
};


// 
export const update = (tarefaAtualizada) => (dispatch) => {
    try {
        dispatch({
          type: UPDATE,
          payload: tarefaAtualizada,
        });
    } catch (err) {
        console.log(err);
    }
}