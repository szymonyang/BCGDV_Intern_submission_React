# BCGDV Intern submission - React.js Solution

### Available Scripts

In the project directory, you can run:`npm start` to start the app. This app is built on React.js with axios library.

### Instruction

Simply enter your name and email to submit the details.

![user_interface](C:\Users\Simon\GitRepo\BCGDV_Intern_submission_React\images\user_interface.png)

Error message will be displayed if an incorrect format email address is given. 

​	![error](C:\Users\Simon\GitRepo\BCGDV_Intern_submission_React\images\error.png)

### Explanation 

After the webpage is loaded and the component is mounted, `componentDidMount()`will be invoked, in which `axios.get()` will retrieve the API key for the later use.

```react
    componentDidMount() {
      axios.get(`https://interns.bcgdvsydney.com/api/v1/key`)
      .then(res => {
        const value = res.data.key;
        this.setState({ key:value, loading:true });
        console.log("componentDidMount", this.state.email, this.state.name, this.state.key)
      })
    }
```



When `submit` button is clicked, the user's email address and name will be submitted through `POST` action with the API key. In addition, a new API key will be retrieved followed by the successful submission of the user's details.

```react
  handleSubmit(event) {
    const user = {
      name: this.state.name,
      email: this.state.email
    };
    axios.post(`https://interns.bcgdvsydney.com/api/v1/submit?apiKey=${this.state.key}`, user).then(res => {
        console.log(res);
        const status = "message: " + res.status + " " + res.statusText
        this.setState({response: status, loading:false});
        axios.get(`https://interns.bcgdvsydney.com/api/v1/key`)
        .then(res => {
          	var value = res.data.key;
          	this.setState({ key:value, loading: false });
          	console.log("handleSubmit", this.state.email, this.state.name, this.state.key)
        })

      })
```

