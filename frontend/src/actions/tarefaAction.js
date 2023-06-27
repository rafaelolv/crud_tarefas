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
        // const listChurras = list;

        console.log("2 - retrieveAllTarefas action");
        console.table(listaTarefas);
    
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
        console.log("tarefaAtualizada action");
        console.table(tarefaAtualizada);
      
        dispatch({
          type: UPDATE,
          payload: tarefaAtualizada,
        });
    } catch (err) {
        console.log(err);
    }
}


export const filter = (tarefaAtualizada) => (dispatch) => {
  try {
      console.log("tarefaAtualizada action");
      console.table(tarefaAtualizada);
    
      dispatch({
        type: FILTER,
        payload: tarefaAtualizada,
      });
  } catch (err) {
      console.log(err);
  }
}