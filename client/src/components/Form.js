import React,{Component} from 'react'








class Form extends Component{

    constructor(){
        super()
        this.state={
            email: '',
            username:'',
            phone: '',
            password: '',
            reEnteredPassword: ''

        }


        this.changeHandler=this.changeHandler.bind(this)
        this.submitHandler=this.submitHandler.bind(this)
    }
    changeHandler= event=>{
        let nam= event.target.name
        let val=event.target.value

        this.setState({[nam]:val})
    }

 

    submitHandler= event=>{
        event.preventDefault()
        console.log('submitting!')
        const {email,username,phone,password,reEnteredPassword}=this.state

        
        
        let submit=async () => {
            let obj={userType:'customer',name:username,email,phone,password}
            const rawResponse = await fetch('http://localhost:15000/api/signup', {
              method: 'POST',
              headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(obj)

            });
            console.log(JSON.stringify(obj))
            const content = await rawResponse.json();
            console.log(content)

            this.props.history.push('/success')


        }

        submit()



    }

    render(){
        const {email,username,phone,password,reEnteredPassword}=this.state
        // const style={
        //     display: flex,
        //     justyContent: center
        // }

        console.log(this.state)
        
        return (
        
            <div className={this.props.className}>
                <div >
                <nav style={{ background: '#16ab34', textAlign:'center'}}>Your online food delivery service</nav>

                <div style={{ display:'flex', justifyContent:'center'}}>
                    <form >
                        <input
                            type='email'
                            name='email'
                            // inputProps={{style: { textAlign: "right" }}}
                            hintText='enter your email'
                            // floatingLabelText='emali'
                            onChange = {this.changeHandler}
                            defaultValue= {email}
                            id='outlined-basic'
                            label='Outlined'
                        />
                        <br/>
                        <input
                            type='text'
                            name='username'
                            hintText='enter your username'
                            floatingLabelText='username'
                            onChange = {this.changeHandler}
                            defaultValue= {username}
                        />
                        <br/>
                        <input
                            type='phone'
                            name='phone'
                            hintText='enter your phone'
                            floatingLabelText='phone'
                            onChange = {this.changeHandler}
                            defaultValue= {phone}
                        />
                        <br/>
                        <input
                            type='password'
                            name='password'
                            hintText='enter your password'
                            floatingLabelText='password'
                            onChange = {this.changeHandler}
                            defaultValue= {password}
                        />
                        <br/>
                        <input
                            type='password'
                            name='reEnteredPassword'
                            hintText='re enter your password'
                            floatingLabelText='re-enter password'
                            onChange = {this.changeHandler}
                            defaultValue= {reEnteredPassword}
                        />
                        <br/>
                            <button
                                label='Signup'
                                primary={true}
                                onClick={this.submitHandler}
                            >signup   
                            </button>

                    </form>
                </div>
                </div>
            </div>
                
            

            
            
        )

    }
}

export {Form}