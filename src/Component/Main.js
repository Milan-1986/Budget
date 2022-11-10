import ExpensesList from "./ExpensesList";
import IncomeList from "./IncomeList";

export default function Main() {


    return (
        <div className="row">            
            <div className="column">
                <IncomeList />
            </div>
            <div className="column">
                <ExpensesList />
            </div>
        </div>
    )
}