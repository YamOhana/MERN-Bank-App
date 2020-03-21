import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css';
import axios from 'axios'
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import Pie from './components/Pie';



class App extends Component {
  constructor() {
    super()
    this.state = {
      transaction: [],
      balance: 0
    }
  }





  balanceClass() {
    if (this.state.balance >= 0) {
      return <span className="green">balance : {this.state.balance}</span>
    }
    else {
      return <span className="red">balance : {this.state.balance}</span>
    }
  }




  checkBalance = (transaction) => {
    let sum = 0;
    transaction.forEach(i => { sum += i.amount})
    return sum
  }


  getTransactions = async () => {

    let transaction = await axios.get(`http://localhost:3001/transactions`)
    let sum = this.checkBalance(transaction.data)
    await this.setState({ transaction: transaction.data, balance: sum })

  }

  addTransactions = async (transactionValue) => {
    await axios.post(`http://localhost:3001/transaction`, transactionValue)
    await this.getTransactions()
  }

  componenDidMount = async () => {
    await this.getTransactions()
  }



  render() {
    const state = this.state

    return (

      <Router>
      <div id="app">
        <div className="border" id="header">
          {this.balanceClass()}
          <Operations addTransactions={this.addTransactions} />
      {<Link to="/pie">Graphs</Link>}
        </div>
        <div className="border">
          <h1>Your Expenses:</h1>
          {/* <Pie transaction={this.state.transaction} /> */}
        </div>
        <Route path="/pie" exact render={({match}) => <Pie match={match} state={state} />}/>
        <Transactions transaction={this.state.transaction} />
      </div>

      </Router>
    );


  }


}



export default App;
