import React, { useState, useEffect, useCallback } from 'react';
import './accountSelect.scss';
import { connect } from 'react-redux';
import {
  setLoad,
  setSelectedAccount,
  setAccounts,
  setUserInformation,
  setTransaction,
} from '../../store/actions';
import { useHistory } from 'react-router-dom';
import {
  finicityService,
  accountService,
  transactionService,
} from '../../services';
import { logout } from '../../utils';

const AccountSelect = ({
  setLoad,
  accounts,
  setSelectedAccount,
  setAccounts,
  setTransaction,
  transaction,
}) => {
  const [account, setAccount] = useState({});
  const [cancel, setCancel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountDiv, setAccountDiv] = useState();
  const history = useHistory();
  const routeChange = useCallback(
    (path) => {
      history.push(`/${path}`);
    },
    [history]
  );
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
    routeChange('login');
  };
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await finicityService.getAccounts();
        setAccounts(response);
        setLoad(false);
      } catch (error) {
        console.log(error);
        setLoad(false);
      }
    };
    setLoad(true);
    const timer = setTimeout(() => {
      fetchAccounts();
    }, 5000);

    return () => clearTimeout(timer);
  }, [setLoad, setAccounts]);

  useEffect(() => {
    const displayAccounts = () => {
      let accountsDiv;
      if (accounts.length === 0) {
        accountsDiv = (
          <div className="accounts-table__account">
            <div className="accounts-table__add-account ">
              <div> You do not have an associated account yet</div>
              <button
                className="modal-accounts__button  modal-accounts__button--accept"
                onClick={() => routeChange('banks')}
              >
                Add new account
              </button>
            </div>
          </div>
        );
      } else {
        accountsDiv = accounts.map((account) => (
          <div className="accounts-table__account" key={account.id}>
            <div className="accounts-table__account__data">
              {account.number}
            </div>
            <div className="accounts-table__account__data">{account.type}</div>
            <div className="accounts-table__account__data">
              {account.status}
            </div>
            <div>
              {transaction.id ? (
                <button
                  className="accounts-table__account__select-button accounts-table__account__select-button--add"
                  onClick={() => {
                    setAccount(account);
                    setShowModal(true);
                  }}
                >
                  <div>Select account</div>
                </button>
              ) : null}

              <button
                className=" accounts-table__account__select-button accounts-table__account__select-button--cancel"
                onClick={() => {
                  setAccount(account);
                  setShowDeleteModal(true);
                }}
              >
                <div>Delete account</div>
              </button>
            </div>
          </div>
        ));
      }
      setAccountDiv(accountsDiv);
    };

    displayAccounts();
  }, [setLoad, accounts, routeChange, transaction]);

  return (
    <>
      <div className="flex-column">
        <div className="accounts-table">
          <div className="accounts-table__title">Account number</div>
          <div className="accounts-table__title">Account type</div>
          <div className="accounts-table__title">Account status</div>
          <div className="accounts-table__title"></div>
          <div className="accounts-table__accounts-container">{accountDiv}</div>
        </div>
        <div className="flex-row justify-content-end ">
          {accounts.length > 0 ? (
            <button
              className="modal-accounts__button modal-accounts__button--accept w-25"
              onClick={() => routeChange('banks')}
            >
              Add another account
            </button>
          ) : null}
          {transaction.id ? (
            <button
              className="modal-accounts__button modal-accounts__button--cancel w-25"
              onClick={() => {
                setCancel(true);
              }}
            >
              Cancel transaction
            </button>
          ) : (
            <button
              className="modal-accounts__button modal-accounts__button--cancel w-25"
              onClick={() => {
                logout();
                setUserInformation({});
                routeChange('login');
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div className={showModal ? `modal-accounts` : `display-none`}>
        <div className="modal-accounts__content">
          Are you sure you want to use this account?
          <br /> Account number {'  '}
          {account.number}
          <div className="flex-row mt-3 ">
            <button
              className=" modal-accounts__button  modal-accounts__button--accept"
              onClick={() => {
                setSelectedAccount(account);
                localStorage.setItem('account', JSON.stringify(account));
                routeChange(`confirm/${transaction.id}`);
              }}
            >
              <div>Accept</div>
            </button>
            <button
              className="modal-accounts__button  modal-accounts__button--cancel"
              onClick={() => {
                setAccount({});
                setShowModal(false);
              }}
            >
              <div>Decline</div>
            </button>
          </div>
        </div>
      </div>
      <div className={cancel ? `modal-accounts` : `display-none`}>
        <div className="modal-accounts__content">
          Are you sure you want to cancel this transaction?
          <div className="flex-row mt-3 ">
            <button
              className=" modal-accounts__button  modal-accounts__button--accept"
              onClick={() => {
                manageTransaction();
              }}
            >
              <div>Accept</div>
            </button>
            <button
              className="modal-accounts__button  modal-accounts__button--cancel"
              onClick={() => {
                setCancel(false);
              }}
            >
              <div>Decline</div>
            </button>
          </div>
        </div>
      </div>
      <div className={showDeleteModal ? `modal-accounts` : `display-none`}>
        <div className="modal-accounts__content">
          Are you sure you want to delete this account?
          <br /> Account number {'  '}
          {account.number}
          <div className="flex-row mt-3 ">
            <button
              className=" modal-accounts__button  modal-accounts__button--accept"
              onClick={() => {
                try {
                  accountService.deleteAccount(account.id);
                  const newAccounts = accounts.filter(
                    (accountSelected) => accountSelected.id !== account.id
                  );
                  setAccounts(newAccounts);
                  setShowDeleteModal(false);
                } catch (error) {
                  console.log(error);
                  setShowDeleteModal(false);
                }
              }}
            >
              <div>Accept</div>
            </button>
            <button
              className="modal-accounts__button  modal-accounts__button--cancel"
              onClick={() => {
                setShowDeleteModal(false);
              }}
            >
              <div>Decline</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    transaction: state.transaction,
  };
};

const mapDispatchToProps = {
  setLoad,
  setSelectedAccount,
  setAccounts,
  setUserInformation,
  setTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelect);
