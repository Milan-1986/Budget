import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

export default function Header() {

    // to display the current date in the header

    let date = new Date();
    let year = date.getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()];

    const { transactions } = useContext(GlobalContext)
    const incomes = transactions.incomes;
    const expenses = transactions.expenses;

    const incomesValue = incomes?.map((income) => (
        income.value
    ));
    const expensesValue = expenses?.map((expens) => (
        expens.value
    ));

    let groseIncomes = 0;
    for (let i = 0; i < incomesValue?.length; i++) {
        groseIncomes += incomesValue[i];
    };

    let groseExpenses = 0;
    for (let i = 0; i < expensesValue?.length; i++) {
        groseExpenses += expensesValue[i];
    };

    let budget;
    function rezultat() {
        if ((groseIncomes - groseExpenses) >= 0) {
            budget = groseIncomes - groseExpenses;
        } else {
            throw new Error('Incomes is les than expenses.')
        }
    };

    let error = null;
    try {
        rezultat()
    } catch (e) {
        alert(e.message)       
    }finally {
        budget = groseIncomes - groseExpenses;
        error = 'Expenses are greater than incomes. Please be cautious.'
    }
    let sing = '';
    if (budget > 0) {
        sing = '+';
    }

    return (
        <div className="header">
            <header >
                <div className="header-date">Available Budget in {month} {year}:</div>
                <div className="header-budget"> {sing} {budget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </div>
                {(budget < 0) && <div className="header-error"> {error}</div>}
                <div className="header-incomes">
                    <div>Incomes</div>
                    {groseIncomes && <div >+{groseIncomes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        <span className="header-procent-incomes">{groseIncomes && Math.round((groseExpenses / groseIncomes) * 100)}%</span>
                    </div>}
                </div>
                <div className="header-expenses">
                    <div>Expenses</div>
                    {groseExpenses && <div >-{groseExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        <span className="header-procent">{groseIncomes && Math.round((groseExpenses / groseIncomes) * 100)}%</span>
                    </div>}
                </div>
            </header>
        </div>
    )
};