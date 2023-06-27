import { RETRIEVE_ALL, CREATE, UPDATE, FILTER } from '../actions/actionTypes/tarefaActionType';


const list = [
    {
        id: 1,
        data: "2023-12-25",
        isConcluida: false,
        titulo: "Fazer exercícios",
        descricao: "Ir para academia",
        
    },
    {
        id: 2,
        data: "2023-01-01",
        isConcluida: true,
        titulo: "Pagar contas",
        descricao: "Pagar hoje as contas de água, luz e internet!",
        
    },
    {
        id: 3,
        data: "2023-08-26",
        isConcluida: false,
        titulo: "Ir no petshop",
        descricao: "Comprar comida e petiscos para suflê",
    }

];


const initialState = list;

function tarefaReducer(tarefas = initialState, action) {
    
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_ALL:

            console.log("3 - retrieve payload ");
            console.log(payload);

            return payload;
        
        case CREATE:
            return [...tarefas, payload];

        case UPDATE:
            return tarefas.map((tarefa) => {
                if (tarefa.id === payload.id) {
                    return {
                        ...tarefa,
                        ...payload,
                    };
                } else {
                    return tarefa;
                }
            });

            
        case FILTER:
            return tarefas.map((tarefa) => {
                if (tarefa.isConcluida === payload.isConcluida) {
                    return {
                        ...tarefa,
                        ...payload,
                    };
                } else {
                    return tarefa;
                }
            });  
    
        default:
            return tarefas;
    }
}

export default tarefaReducer;