import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  }

  onChangeOptionId = event => {
    this.setState({
      optionId: event.target.value,
    })
  }

  onChangeTitle = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeAmount = event => {
    this.setState({
      amountInput: event.target.value,
    })
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionsList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      transactionsList: updatedTransactionsList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getExpenses = () => {
    const {transactionsList, totalExpenses} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    this.setState(prevState => ({
      totalExpenses: prevState.totalExpenses + expensesAmount,
    }))
    return totalExpenses
  }

  getIncome = () => {
    const {transactionsList, totalIncome} = this.state
    let incomeAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    this.setState(prevState => ({
      totalIncome: prevState.totalIncome + incomeAmount,
    }))
    return totalIncome
  }

  getBalance = () => {
    const {
      transactionsList,
      totalBalance,
      //   totalIncome,
      //   totalExpenses,
    } = this.state
    let incomeAmount = 0
    let expensesAmount = 0
    let balanceAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    this.setState(prevState => ({
      totalIncome: prevState.totalIncome + incomeAmount,
      totalExpenses: prevState.totalExpenses + expensesAmount,
      totalBalance: prevState.totalBalance + balanceAmount,
    }))
    return totalBalance
  }

  render() {
    const {
      titleInput,
      amountInput,
      optionId,
      transactionsList,
      totalBalance,
      totalIncome,
      totalExpenses,
    } = this.state
    // const {balanceAmount} = this.getBalance()
    // const {incomeAmount} = this.getIncome()
    // const {expensesAmount} = this.getExpenses()

    return (
      <div className="main-container">
        <div className="first">
          <h1 className="name">Hi, Richard</h1>
          <p className="para1">
            Welcome back to your <span className="money">Money Manager</span>
          </p>
        </div>

        <MoneyDetails
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        <div className="transaction-and-history-container">
          <div className="add-transaction">
            <h1 className="heading">Add Transaction</h1>
            <form className="form" onSubmit={this.onAddTransaction}>
              <label htmlFor="title" className="label1">
                TITLE
              </label>
              <input
                onChange={this.onChangeTitle}
                value={titleInput}
                type="text"
                id="title"
                className="titleInput"
                placeholder="TITLE"
              />

              <label htmlFor="amount" className="label1">
                AMOUNT
              </label>
              <input
                onChange={this.onChangeAmount}
                value={amountInput}
                type="text"
                id="amount"
                className="titleInput"
                placeholder="AMOUNT"
              />

              <label htmlFor="type" className="label1">
                Type
              </label>
              <select
                name="type"
                id="type"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button className="button" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="history">
            <h1 className="heading">History</h1>
            <div className="transaction-table-container">
              <ul className="transaction-table">
                <li className="header">
                  <p className="table-header-cell">Title</p>
                  <p className="table-header-cell">Amount</p>
                  <p className="table-header-cell">Type</p>
                </li>
                {transactionsList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
