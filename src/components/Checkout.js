import {useState ,useRef} from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
const isEmpty =value=>value.trim()===''

const Checkout =()=>{
    const {clearCart} =useCartContext()
    const inputNameRef=useRef()
    const creditCardRef=useRef()
    const cvcRef=useRef()
    const expirationDateRef=useRef()
const[isSubmitting,setIssubmitting] =useState(false)
const [didSubmit,setDidSubmit] =useState(false)
const [formInputsValidity,setFormInputsValidity]=useState({
  name:true,
  creditCard:true,
  cvc:true,
  expirationDate: true 
})

const submitHandler= async (userData)=>{
    setIssubmitting(true)
await fetch('https://comfy-sloth-34a21-default-rtdb.firebaseio.com/orders.json'
,{method:'POST',
body:JSON.stringify({userData})})
setIssubmitting(false)
setDidSubmit(true)
clearCart()


}


const confirmHandler =(event)=>{
    event.preventDefault()
   const  enteredName=inputNameRef.current.value
    const enteredCreditCard=creditCardRef.current.value
    const enteredCvc=cvcRef.current.value
    const enteredExpirationDate=expirationDateRef.current.value
const enteredNameIsValid= !isEmpty(enteredName)
const enteredCreditCardIsValid= !isEmpty(enteredCreditCard)
const  enteredCvcIsValid= !isEmpty(enteredCvc)
const enteredExpirationDateIsValid= !isEmpty(enteredExpirationDate)
setFormInputsValidity({ name:enteredNameIsValid,
    creditCard:enteredCreditCardIsValid,
    cvc:enteredCvcIsValid,
    expirationDate: enteredExpirationDateIsValid})
const formIsValid=enteredNameIsValid && enteredCreditCardIsValid && enteredCvcIsValid && enteredExpirationDateIsValid
if(!formIsValid){
    return
}
    submitHandler({
        name:enteredName,
        creditCard:enteredCreditCard,
        cvc:enteredCvc,
        expirationDate:enteredExpirationDate
    })
    
}
   
    
    const cardModalContent= <Wrapper className="checkout-page">
    <div className="form">
    
      <form className="checkout-form" onSubmit={confirmHandler}>
        <input type="text" placeholder="name" ref={inputNameRef}/>
        {!formInputsValidity.name && <p className='invalid'>Please enter a valid name.</p>}
        <input type="number" placeholder="Credit card number" ref={creditCardRef}/>
        {!formInputsValidity.creditCard && <p className='invalid'>Please enter a valid credit number.</p>}
        <input type="number" placeholder="CVC" ref={cvcRef}/>
        {!formInputsValidity.cvc && <p className='invalid'>Please enter a valid cvc.</p>}
        <input type="date" placeholder="Expiration Date(mm/yy)" ref={expirationDateRef}/>
        {!formInputsValidity.expirationDate && <p className='invalid'>Please enter a valid expiration date.</p>}
        <button >Pay</button>
       
      </form>
    </div>
  </Wrapper>
  const isSubmittingModalContent=<h3>Sending Order Data...</h3>
  const didSubmitModalContent=<h3>Your Payment Was Successful!</h3>
    return(
       <main>
        { !isSubmitting &&!didSubmit&& cardModalContent}
       {isSubmitting && isSubmittingModalContent}
       {!isSubmitting&& didSubmit &&didSubmitModalContent}
       </main>
    )
}
const Wrapper = styled.div`
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.checkout-page {
  width: 360px;
  height: 100%;
  padding: 8% 0 0;
  margin: 0 auto;
  

}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 50px auto 100px;
  padding: 45px;
  text-align: center;

  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: hsl(22, 28%, 45%);
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: hsl(22, 28%, 29%);
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: hsl(22, 28%, 29%);
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
body {
  background: #76b852; /* fallback for old browsers */
  background: rgb(141,194,111);
  background: linear-gradient(90deg, rgba(141,194,111,1) 0%, rgba(118,184,82,1) 50%);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;      
}
.invalid{
    color:#ca3e51;
}
`
export default Checkout