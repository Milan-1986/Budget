import { createContext, useEffect, useReducer } from "react";

// Reducer is used for updating (add or delete) the state, base on action.

const Reducer = ((state, action) => {
    switch (action.type) {
        case 'AddIncome':
            return {
                ...state,
                transactions: { ...state.transactions, incomes: [...state.transactions.incomes, action.payload] }
            }
        case 'AddExpenses':
            return {
                ...state,
                transactions: { ...state.transactions, expenses: [...state.transactions.expenses, action.payload] }
            }
        case 'DeleteIncome':
            return {
                ...state,
                transactions: { ...state.transactions, incomes: [...state.transactions.incomes.filter(transaction => transaction.id !== action.payload)] }
            }
        case 'DeleteExpense':
            return {
                ...state,
                transactions: { ...state.transactions, expenses: [...state.transactions.expenses.filter(transaction => transaction.id !== action.payload)] }
            }
        default:
            return state;
    }

})

// function for load data from local storege that eliminate error if local storage is empty.


function getIncoms() {
    let localStorageIncomes;
    try {
        localStorageIncomes = JSON.parse(localStorage.getItem('listOfIncome'));
        if (localStorageIncomes === null) {
            return [];
        }
        return localStorageIncomes;
    } catch (error) {
        alert(error);
    }

}
function getExpenses() {
    let localStorageExpenses;
    try {
        localStorageExpenses = JSON.parse(localStorage.getItem('listOfExpenses'));
        if (localStorageExpenses === null) {
            return [];
        }
        return localStorageExpenses;
    } catch (error) {
        alert(error);
    }
}

// try {
//     getIncoms();
//     getExpenses();
// } catch (error) {
//     alert("Call technical support")
// }

// create initial state

const initialState = {
    transactions: {
        incomes: getIncoms(),
        expenses: getExpenses(),
    }
}

// Create Context form manage the state globally

export const GlobalContext = createContext(initialState);

// Provider

export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(Reducer, initialState);

    // set data to local storage

    useEffect(() => {
        localStorage.setItem('listOfIncome', JSON.stringify(state.transactions.incomes));
        localStorage.setItem('listOfExpenses', JSON.stringify(state.transactions.expenses));
    }, [state])

    // parameter transaction is provide from component TransactionForm

    function addIncome(transaction) {
        dispatch({
            type: 'AddIncome',
            payload: transaction,
        });
    }

    function addExpense(transaction) {
        dispatch({
            type: 'AddExpenses',
            payload: transaction,
        });
    }

    // the id is used for identify the transaction that is to be deleted

    function deleteIncome(id) {
        dispatch({
            type: 'DeleteIncome',
            payload: id,
        })
    }

    function deleteExpense(id) {
        dispatch({
            type: 'DeleteExpense',
            payload: id,
        })
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        addIncome,
        deleteIncome,
        addExpense,
        deleteExpense,
    }}>
        {children}
    </GlobalContext.Provider>);

}
