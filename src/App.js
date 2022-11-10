import "./App.css";
import Header from './Component/Header';
import Main from './Component/Main';
import { GlobalProvider } from './Context/GlobalState';
import TransactionForm from './Component/TransactionForm';



function App() {
  return (
    <div className="container">
      <GlobalProvider>
        <Header />
        <TransactionForm />
        <Main />
      </GlobalProvider>
    </div>
  );
}

export default App;
