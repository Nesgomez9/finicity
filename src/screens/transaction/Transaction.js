import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setLoad,
  setTransaction,
  setUserInformation,
} from '../../store/actions';
import { transactionService } from '../../services';
import { logout } from '../../utils';

import './transaction.scss';

const Transaction = ({
  transaction,
  setLoad,
  setTransaction,
  setUserInformation,
}) => {
  const [cancel, setCancel] = useState(false);
  const [accept, setAccept] = useState(false);
  let { transactionId } = useParams();
  const date = new Date();
  const history = useHistory();
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoad(true);
        const response = await transactionService.getTransactionById(
          `tx_${transactionId}`
        );
        setTransaction(response);
        localStorage.setItem('transaction_id', transactionId);
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
    };
    fetchTransaction();
  }, []);
  const manageTransaction = async () => {
    setLoad(true);
    try {
      const response = await transactionService.notifyEvent(transaction.id, {
        status: 2,
      });
    } catch (error) {
      console.log(error);
      setLoad(false);
      return;
    }
    setCancel(true);
    localStorage.removeItem('transaction_id');
    setTransaction({});
    logout();
    setUserInformation({});
    setLoad(false);
  };
  const routeChange = (path) => {
    history.push(`/${path}`);
  };
  const returnTransaction = () => {
    setLoad(true);
    setTimeout(() => {
      routeChange();
      setLoad(false);
    }, 2000);
  };
  const textValue = () => {
    if (cancel) {
      return 'The transaction was successfully cancelled.';
    } else {
      return 'Successful transaction. Thank you for using our services.';
    }
  };
  const selectReceiverName = () => {
    if (transaction) {
      if (transaction.senderAccount) {
        return transaction.senderAccount.name;
      }
    } else {
      return null;
    }
  };

  return (
    <div className="modal-transaction">
      {cancel || accept ? (
        <div className="center height-100 color-black flex-column text-center ">
          <div className="text-30">{textValue()}</div>
          <div
            className="button button--accept color-white cursor-pointer mt-3"
            onClick={() => {
              returnTransaction();
            }}
          >
            Accept
          </div>
        </div>
      ) : (
        <div>
          <div className="border-bot pb-2 ">Transaction details</div>
          <div className="flex-row mt-5 border-bot pb-2 pt-3 ">
            <div className="col-12 ">
              <div>To</div>
              <div className="color-black">{selectReceiverName()}</div>
            </div>
          </div>
          <div className="flex-row mt-5 pt-3 border-bot pb-2">
            <div className="col-6">
              <div>Date </div>
              <div className="color-black">{date.toLocaleDateString()}</div>
            </div>
            <div className="col-6 ">
              <div>Time </div>
              <div className="color-black">{date.toLocaleTimeString()}</div>
            </div>
          </div>
          <div className=" mt-5 pb-2 border-bot flex-column center  ">
            <div>Amount</div>
            <div className="color-black">{`$ ${
              transaction.amount ? transaction.amount : null
            }.00`}</div>
          </div>
          <div className="flex-column mt-5   center">
            <button
              className="button button--accept color-black cursor-pointer"
              onClick={() => {
                routeChange('login');
              }}
            >
              <div>Login with QuickPenny</div>
            </button>
            <button
              className="button button--cancel color-black cursor-pointer"
              onClick={() => {
                manageTransaction();
              }}
            >
              Cancel
            </button>
            <span className="">
              Not a member yet?{' '}
              <span
                className="text-underline cursor-pointer"
                onClick={() => routeChange('singup')}
              >
                Join QuickPenny
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    transaction: state.transaction,
  };
};

const mapDispatchToProps = {
  setLoad,
  setUserInformation,
  setTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
