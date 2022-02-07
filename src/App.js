import './App.scss';
import { useEffect } from 'react';
import Router from 'router';
import { setLoad, setTransaction } from './store/actions';
import { HttpProvider } from './providers';
import { connect } from 'react-redux';
import { transactionService } from './services';
import { Loading, NavBar, Footer } from './commons/components';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App({ setTransaction, setLoad }) {
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const transactionId = localStorage.getItem('transaction_id');
        const response = await transactionService.getTransactionById(
          `tx_${transactionId}`
        );
        setTransaction(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransaction();
  }, []);
  HttpProvider.setDefaultHeaders();
  if (localStorage.getItem('id_token')) {
    HttpProvider.setHeaderToken(localStorage.getItem('id_token'));
  }
  return (
    <div className="app-background">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <NavBar />
        <div className="flex center h100">
          <Router />
        </div>
        <Loading />
      </MuiPickersUtilsProvider>
      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    transaction: state.transaction,
  };
};

const mapDispatchToProps = {
  setLoad,
  setTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
