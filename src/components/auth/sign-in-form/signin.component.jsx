import { useState,useContext } from 'react'

import { UserContext } from '../../../context/user.context'

import { Button, Input } from '../../components'

import './signin.styles.css'
import { signinAuthUserWithEmailAndPassword } from '../../../utils/firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const defaultFormField = {
  email: '',
  password: '',
}

export default function Signin() {
  const [ formFields, setFormFields ] = useState(defaultFormField)
  const { email,password } = formFields;

  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext)

  const handleOnChange = (e)=>{
    const { name,value } = e.target
    setFormFields({...formFields, [name]:value})
  }

  const resetFormFields =()=>{
    setFormFields(defaultFormField)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{
      const {user} = await signinAuthUserWithEmailAndPassword(email,password)
      setCurrentUser(user)
      //console.log(response)

      navigate("home")

      resetFormFields()
    }catch(error){console.log(error.message)}
    
  }

  return (
    <div>
      <h2>Sign In</h2>
      <span>With in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleOnChange}
          required
        />
        <div>
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </div>
  )
}
