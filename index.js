
let generatedOTP;
let expireOTPSpot = document.getElementById('expireOTPSpot')
let intervleId
let timeOut

function expireOTP() {

    const intervle = 1000;
    const expire = 15000;

    let timer = expire / intervle


    intervleId = setInterval(() => {
        
        expireOTPSpot.innerText = ` OTP expire in ${timer} secouds`;
        timer = timer - 1;
    }, intervle)

    timeOut = setTimeout(()=> {
        
        clearInterval(intervleId)
        
       generateOtp()
      
    },expire)
}

function tackleInputBoxes(){

 const otpBoxes = document.querySelectorAll('.otp-box')
 otpBoxes.forEach((box)=> {
    box.value=""
 
 box.addEventListener('input', function(e){
    const target = e.target;
    const inputValue = target.value;

    if(isNaN(inputValue)){
        target.value="";
        return
    }

    const nextElement = target.nextElementSibling;
    if(nextElement){
        nextElement.focus();
    }

    otpValidation()
 })

})
}


function generateOtp(){
    
     generatedOTP = Math.floor(1000 + Math.random() * 9000)
    const showOtp= document.getElementById('generate-otp')
     showOtp.innerText= `Your OTP is: ${generatedOTP}`

     expireOTP()

}

function otpValidation() {
  
   let inputValue = "";
    // const inputElemValue = document.getElementById('otp-box-list-id');
    //  [...inputElemValue.children].forEach((elem) => {
    //     inputValue = inputValue + elem.value;
    //  })

    const inputBoxes = document.querySelectorAll('.otp-box')
    inputBoxes.forEach((i) => {
        inputValue = inputValue + i.value
    })
   
    if(inputValue.length === 4){
        const totalInput = inputValue
        console.log(generatedOTP, totalInput)
        const matched = generatedOTP === parseInt(totalInput, 10)
       
    
        if(matched){
          
            const validete = document.getElementById('otp-vaildation')
            validete.innerText= 'OTP has been Validate successfully.'
            validete.classList.remove('fail')
            validete.classList.add('success')
    
            clearInterval(intervleId);
           

            
            window.location.href = './quiz/quiz.html'
          

          
           
        }
        else{
    
            
            const validete = document.getElementById('otp-vaildation')
            validete.innerText= 'Your OTP is Invaild.'
            validete.classList.remove('success')
            validete.classList.add('fail')
    
            setTimeout(()=>{
                expireOTPSpot.innerText = 'Wrong OTP. New OTP being regenerate after 3 seconds'
                clearInterval(intervleId)
               setTimeout(()=> {
                window.location.reload()
               },3000)
            },0)
    
            
        }
        
    }
   
}

function goBackBtn(){
    window.location.href= "index.html"
}

function init(){
    console.log("Project has been initialized")
    tackleInputBoxes()
    setTimeout(generateOtp , 2000);
       
}



init()