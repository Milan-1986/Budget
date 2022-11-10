import { useContext } from "react";
import { TiDelete } from "react-icons/ti";   // import icon for delete button
import { GlobalContext } from "../Context/GlobalState";

export default function Income() {

    // provide values and function from component Global state

    const { transactions, deleteIncome } = useContext(GlobalContext);

    // from transaction get only incomes

    const incomes = transactions.incomes;

    // map over incomes and display tham on table

    const income = incomes.map((item) => (
        (<tr className="row-transaction" key={item.id}>
            <td>{item.name}</td>
            <td className="row-income-value" style={{ textAlign: "right" }}>+{(item.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td className="button"><TiDelete
                size='1.5em'
                onClick={() => deleteIncome(item.id)}  // function for delete income-s
            ></TiDelete></td>
        </tr>
        )
    )
    );
    return (
        <div className="table-incomes">
            <table>
                <tbody>
                    <tr className="table-header-incomes"><th>Incomes</th></tr>
                    {incomes && income}
                </tbody>
            </table>
        </div>
    )
}

