import { useState, useContext } from "react"
import { GlobalContext } from "../Context/GlobalState";
import { v4 as uuid } from "uuid";

export default function TransactionForm() {
    const { addIncome, addExpense } = useContext(GlobalContext)

    const [option, setOption] = useState('incomes');
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    function handleSubmit() {
        // event.preventDefault();
        const transaction = {
            id: uuid(),
            name: name,
            value: parseInt(value),
        };
        if (option === 'incomes') {
            addIncome(transaction);
        }
        if (option === 'expenses') {
            addExpense(transaction);
        }
    };


    return (
        <div className="transaction-form">
            <form onSubmit={handleSubmit} className="form">
                <div>
                    <select className="form-select"
                        value={option}
                        onChange={event => setOption(event.target.value)}
                        name="option">
                        <option value="incomes">+</option>
                        <option value="expenses">-</option>
                    </select>
                </div>
                <div className="form-description">
                    <input type="text"
                        required
                        placeholder="Add description"
                        maxLength={50}
                        onChange={event => setName(event.target.value)}
                        value={name}
                        name="name"
                        step="0.01"
                    />
                </div>
                <div className="form-value">
                    <input type="number"
                        required
                        placeholder="value"
                        min={1}
                        value={value}
                        name="value"
                        onChange={event => setValue(event.target.value)}
                    />
                </div>
                <div className="form-btn">
                    {(option === 'incomes') && <button type="submit" className="form-btn-income">Enter transaction
                    </button>}
                    {(option === 'expenses') && <button type="submit" className="form-btn-expense">Enter transaction
                    </button>}
                </div>
            </form>
        </div>
    )
}
