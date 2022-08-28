import React, { Component } from 'react'
import "../Form/FormSign.module.css"

class Form extends Component {

  /**
   * The constructor function is a special method for creating and initializing an object created
   * within a class.
   * props - The props passed to the component.
   */
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            email: '',
            password: '',
            bio: '',
            age: '',
            checked: {
                Development: false,
                Design: false,
                Gaming: false,
              },
            touched: {
                fullName: false, email: false, password: false, age: false, bio: false, checked: false,
            },
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
          this.validate = this.validate.bind(this)
    }
    
   /**
    * The handleChange function is a method that takes in an event as a parameter and then sets the
    * state of the component to the value of the event.
    * @param e - the event object
    */
    handleChange(e){
        const { name, value, type } = e.target
        if (type === "checkbox") {
            this.setState({
                checked: {
                    ...this.state.checked,[name]:value
                }
            })
        }
        this.setState({
           [name]:value
        }, () => {
            console.log(this.state.name)
            console.log(this.state.email)
            console.log(this.state.password)
        })

        
    }

/**
 * When the user clicks out of the input field, the touched property of the state object is updated to
 * include the name of the input field that was clicked out of.
 * @param e - the event object
 */
    handleBlur(e) {
        const {name} = e.target;
        this.setState({
            touched:{...this.state.touched,[name]:true}
        })
    }

    validate = () => {
        const error = {
            errorfullName:'',
            errorEmail: '',
            errorPassword: ''
        }

     /* Checking if the fullName input field has been touched and if the length of the fullName input
     field is less than 10 and greater than 0. If it is, it sets the errorfullName property of the
     error object to the string "Kindly Provide Full Name between 4 and 20 Characters long". */
        if (
            (this.state.touched.fullName && this.state.fullName.length < 10 && this.state.fullName.length > 0) ||
            (this.state.touched.fullName.length > 0 && this.state.fullName && this.state.fullName.length > 20)
        ) {
            error.errorfullName = "Kindly Provide Full Name between 4 and 20 Characters long"
        }


     /* Checking if the email input field has been touched and if the length of the email input
     field is greater than 0. If it is, it sets the errorEmail property of the error object to the
     string
     "Invalid Email, Please enter a valid email address". */
        
        const pattern = /[@]/gi
        const testing = pattern.test(this.state.email)
      if(this.state.touched.email && this.state.email.length > 0 && testing === false){
          error.errorEmail = 'Invalid Email, Please enter a valid email address';

        }

        // Minimum five and maximum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        const passwordRegex = /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,8}$"/gi
        const testingPassword = passwordRegex.test(this.state.password)

        if (this.state.password.length > 0 && testingPassword === false) {
            error.errorPassword = 'Invalid Email, Please enter a valid email address';
        }

        return error;

    }
    
    /* Preventing the default action of the form from happening. */
    submitHandler(e) {
        e.preventDefault()

        if (
            this.state.fullName === "" ||
            this.state.email === "" ||
            this.state.password === ""
        ){
            alert("Ensure to provide all required details") 

        } else {
            const {fullName,email, password, age, bio, checked} = this.state;
            const data = {
                fullName: fullName,
                email: email,
                password: password,
                age: age,
                bio: bio,
                checked: checked,
            };

            console.log(data)

       /* Pushing the data to the local storage. */
            let userData = []
            userData.push(data);
            
            userData = userData.concat(JSON.parse(localStorage.getItem('users')));
            localStorage.setItem('users', JSON.stringify(userData));
            alert('Form submitted successfully')
        }
        
     /* Clearing the form after submission. */
        this.setState({
            fullName: '',
            email: '',
            password: '',
            age: '',
            bio: '',
            checked: ''
        })
      }

   /* Rendering the form to the page. */
    render() {
        const { age} = this.state
        const {errorfullName, errorEmail, errorPassword} = this.validate()
        return (
            <div>
                <div className="container">
                    <div className="container_form">
                        <form onSubmit={this.submitHandler} noValidate>
                            <h1> Sign Up </h1>
                            <fieldset className='Field'>
                                <legend><span>1</span> Your Basic Info</legend>
                                
                                <label type="name">Full Name:</label>
                                {errorfullName && <p style={{color:'black', fontSize:'0.9rem', backgroundColor: "white", borderRadius: "5px"}}>error: {errorfullName}</p>}
                                <input type="text" name='fullName' value={this.state.fullName} onChange={this.handleChange} onBlur={this.handleBlur}/>
                                
                                <label type="email">Email:</label>
                                {errorEmail && <p style={{color:'black', fontSize:'0.9rem', backgroundColor: "white", borderRadius: "5px"}}>error: {errorEmail}</p>} 
                                <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} onBlur={this.handleBlur} />
                                
                                <label type="password">Password:</label>
                                {errorPassword && <p style={{color:'black', fontSize:'0.9rem', backgroundColor: "white", borderRadius: "5px"}}>error: {errorPassword}</p>} 
                                <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} onBlur={this.handleBlur} />
                                
                                <label>Age:</label>
                                <input type="radio" id='under 18' name="age" value="under 18" checked={ age === 'under 18'} onChange={this.handleChange}/>
                                <label type="radio" className="light">Under 18</label>
                                
                                <input type="radio" id='Over 20' name="age" value='Over 20' checked={ age === 'Over 20'} onChange={this.handleChange}/>
                                <label type="radio" className="light">Over 20</label>
                            </fieldset>

                            <fieldset>
                                <legend><span>2</span> Your Profile</legend>

                                <label type="bio">Bio:</label>
                                <textarea id="bio" name="bio" value={this.state.bio} onChange={this.handleChange} onBlur={this.handleBlur}/>

                                <label type="job">Job Role:</label>
                                <select id="job" name="job" onChange={this.handleChange}>
                                    <optgroup label="web">
                                        <option value="frontend_developer">Front-End Developer</option>
                                        <option value="php_developer">PHP Developer</option>
                                        <option value="python_developer">Python Developer</option>
                                        <option value="rails_developer">Rails Developer</option>
                                        <option value="web_designer">Web Designer</option>
                                        <option value="wordpress_developer">Wordpress Developer</option>
                                    </optgroup>

                                    <optgroup label="Mobile">
                                        <option value="android_developer">Android Developer</option>
                                        <option value="ios_developer">IOS Developer</option>
                                        <option value="mobile_designer">Mobile Designer</option>
                                    </optgroup>

                                    <optgroup label="Business">
                                        <option value="business_owner">Business Owner</option>
                                        <option value="freelancer">Freelancer</option>
                                    </optgroup>
                                </select>
                                <label>Interests:</label>
                                    <input type="checkbox"  id = "Development" name="Development" onChange={this.handleChange}/><label className="light" >Development</label>
                                    <input type="checkbox" id="Design" name="Design" onClick={this.handleChange}/><label className="light" >Design</label>
                                    <input type="checkbox"  id="Gaming" name="Gaming" onClick={this.handleChange}/> <label className="light">Gaming</label>
                            </fieldset>

                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form;
