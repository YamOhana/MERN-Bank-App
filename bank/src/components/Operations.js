import React, { Component } from 'react';



class Operations extends Component {
    constructor() {
        super()
        this.state = {
            amount: "",
            vendor: "",
            category: ""
        }
    }


    handleChange = async (e) => {
        await this.setState({ [e.target.name]: e.target.value })
    }


    handleDeposit = async (event) => {

        if (this.state.amount !== "" && this.state.vendor !== "" && this.state.category !== "") {
            await this.props.addTransactions(this.state)
            this.setState({ amount: "", vendor: "", category: "" })
        }
    }


    handelWithdraw=async (event)=>{
        if(this.state.amount !== "" && this.state.vendor !== ""  && this.state.category !== ""){
          let negative = this.state.amount
          negative = -Math.abs(negative)
          await this.setState({amount : negative})
          await this.props.addTransactions(this.state)
          await this.setState({amount: "" ,vendor : "",  category :""})
        }
      }


    render() {
        return (
            <div>
                <input type="number" value={this.state.amount} onChange={this.handleChange} name="amount" placeholder="Amount" />

                <input type="text" value={this.state.category} onChange={this.handleChange} name="category" placeholder="Category" />

                <input type="text" value={this.state.vendor} onChange={this.handleChange} name="vendor" placeholder="Vendor" />

                <button onClick={this.handleDeposit}>Deposit</button>
                <button onClick={this.handelWithdraw}>Withdraw</button>



            </div>
        );
    }


}

export default Operations