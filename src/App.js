import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', name: ' ', key: ' ', response: ' '};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    // is invoked immediately after a component is mounted (inserted into the tree)
    componentDidMount() {
      axios.get(`https://interns.bcgdvsydney.com/api/v1/key`)
      .then(res => {
        const value = res.data.key;
        this.setState({ key:value, loading:true });
        console.log("componentDidMount", this.state.email, this.state.name, this.state.key)
      })
    }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {

    // axios.get(`https://interns.bcgdvsydney.com/api/v1/key`)
    // .then(res => {
    //   var value = res.data.key;
    //   this.setState({ 'key':value, loading: false });
    //   console.log(this.state.email, this.state.name, this.state.key)
    // }).then(console.log("handleSubmit")
    // )

    // var res = axios.get(`https://interns.bcgdvsydney.com/api/v1/key`);
    // // this.setState({ 'key':res.data.key });
    // console.log(this.state.email, this.state.name, res.data)
    

    // POST <base URI>/api/v1/submit?apiKey=<API_KEY></API_KEY>
    const user = {
      name: this.state.name,
      email: this.state.email
    };
    axios.post(`https://interns.bcgdvsydney.com/api/v1/submit?apiKey=${this.state.key}`, user)
      .then(res => {
        console.log(res);
        const status = "message: " + res.status + " " + res.statusText
        this.setState({response: status, loading:false});
        axios.get(`https://interns.bcgdvsydney.com/api/v1/key`)
        .then(res => {
          var value = res.data.key;
          this.setState({ key:value, loading: false });
          console.log("handleSubmit", this.state.email, this.state.name, this.state.key)
        }).catch(error => {
          console.log(error.response);
          const status = "message: " + error.response.status + " " + error.response.data.error
          this.setState({response: status, loading:false});
        });

      }).catch(error => {
        console.log(error.response);
        const status = "message: " + error.response.status + " " + error.response.data.error
        this.setState({response: status, loading:false});
      })
      

    event.preventDefault();

  
  }

  render() {
  
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" /> */}
      <label>Email</label>
      <input type="text" name="email" onChange={this.handleChange} />
      
      <label>Name</label>
      <input type="text" name="name" onChange={this.handleChange} />
      <input type="submit" value="Submit" />
      <p>{this.state.response}</p>
      </form>
 
    );
  }
}

export default App;