import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { TiDelete } from "react-icons/ti";   // import icon for delete button


export default function Expenses() {

    // provide values and function from component Global state

    const { transactions, deleteExpense } = useContext(GlobalContext);

    const expenses = transactions.expenses;
    const incomes = transactions.incomes;

    const incomesValue = incomes.map((income) => (
        income.value
    ));

    let grosIncomes = 0;
    for (let i = 0; i < incomesValue.length; i++) {
        grosIncomes += incomesValue[i];
    };

    return (
        <div>
            <table className="table table-striped">
                <tbody>
                    <tr className="table-header-expenses"><th>Expenses</th></tr>
                    {expenses.map((expens) => (
                        <tr className="row-transaction"
                            key={expens.id}>
                            <td>{expens.name}</td>
                            <td className="row-expenses-value" style={{ textAlign: "right" }}>-{(expens.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td><span className="list-procent-span">{grosIncomes && Math.round((expens.value / grosIncomes) * 100)}%</span></td>
                            <td className="button"><TiDelete
                                size='1.5em'
                                onClick={() => deleteExpense(expens.id)}   // function for delete expense-s
                            ></TiDelete>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}