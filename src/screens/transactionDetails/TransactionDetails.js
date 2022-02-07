import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setLoad,
  setTransaction,
  setSelectedAccount,
  setUserInformation,
} from '../../store/actions';
import { transactionService } from '../../services';
import { logout } from '../../utils';

import './transactionDetails.scss';
const TransactionDetails = ({
  selectedAccount,
  setLoad,
  transaction,
  setTransaction,
  setSelectedAccount,
  setUserInformation,
}) => {
  const [cancel, setCancel] = useState(false);
  const [accept, setAccept] = useState(false);
  const date = new Date();
  let { transactionId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('account'))?.number) {
      setSelectedAccount(JSON.parse(localStorage.getItem('account')));
    }
    const fetchTransaction = async () => {
      setLoad(true);
      try {
        if (transactionId) {
          const response = await transactionService.getTransactionById(
            transactionId
          );
          setTransaction(response);
        } else {
          const response = await transactionService.getTransactionById(
            localStorage.getItem('transaction_id')
          );
          setTransaction(response);
        }
      } catch (error) {
        console.log(error);
      }
      setLoad(false);
    };

    fetchTransaction();
  }, []);
  const routeChange = () => {
    history.push(`/`);
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
  const manageTransaction = async (status) => {
    setLoad(true);

    if (status === 1) {
      setAccept(true);
      const response = await transactionService.notifyEvent(transaction.id, {
        accountId: selectedAccount.id,
        status: 1,
      });
    } else {
      setCancel(true);
      const response = await transactionService.notifyEvent(transaction.id, {
        accountId: selectedAccount.id,
        status: 2,
      });
    }
    localStorage.removeItem('transaction_id');
    setTransaction({});
    logout();
    setUserInformation({});

    setLoad(false);
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
  return (
    <div className="modal-transaction-details">
      {cancel || accept ? (
        <div className="center height-100 color-black flex-column text-center ">
          <div className="text-30">{textValue()}</div>
          <div
            className="button button--accept color-black cursor-pointer mt-3"
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
            <div className="col-6">
              <div>From </div>
              <div className="color-black">
                {selectedAccount.number
                  ? selectedAccount.number
                  : JSON.parse(localStorage.getItem('account')).number}
              </div>
            </div>
            <div className="col-6 ">
              <div>To </div>
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
            <div className="color-black">{`$${transaction.amount}.00`}</div>
          </div>
          <div className="flex-column mt-5 pt-3  pb-2 center">
            <button
              className="button button--accept color-black cursor-pointer"
              onClick={() => {
                manageTransaction(1);
              }}
            >
              Accept
            </button>
            <button
              className="button button--cancel color-black cursor-pointer"
              onClick={() => {
                manageTransaction(2);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    selectedAccount: state.selectedAccount,
    transaction: state.transaction,
  };
};

const mapDispatchToProps = {
  setLoad,
  setSelectedAccount,
  setTransaction,
  setUserInformation,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetails);
