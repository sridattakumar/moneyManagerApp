// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {totalBalance, totalIncome, totalExpenses} = props

  return (
    <div className="moneyDetails-container">
      <div className="balance-container">
        <img
          className="money-icon"
          alt="balance"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
        />
        <div className="text-amount">
          <p className="balance">Your Balance</p>
          <p className="rupees" data-testid="balanceAmount">
            Rs {totalBalance}
          </p>
        </div>
      </div>

      <div className="income-container">
        <img
          className="money-icon"
          alt="income"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        />
        <div className="text-amount">
          <p className="balance">Your Income</p>
          <p className="rupees" data-testid="incomeAmount">
            Rs {totalIncome}
          </p>
        </div>
      </div>

      <div className="expenses-container">
        <img
          className="money-icon"
          alt="expenses"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        />
        <div className="text-amount">
          <p className="balance">Your Expenses</p>
          <p className="rupees" data-testid="expensesAmount">
            Rs {totalExpenses}
          </p>
        </div>
      </div>
    </div>
  )
}
export default MoneyDetails
