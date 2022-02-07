const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOAD':
      return {
        ...state,
        load: action.payload,
      };
    case 'SET_USER_INFORMATION':
      return {
        ...state,
        userInformation: action.payload,
      };
    case 'SET_ACCOUNTS':
      return {
        ...state,
        accounts: action.payload,
      };
    case 'SET_TRANSACTION':
      return {
        ...state,
        transaction: action.payload,
      };
    case 'SET_SELECTED_ACCOUNT':
      return {
        ...state,
        selectedAccount: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
