console.log("Clinet side Javascript File Loaded")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messsageTwo  = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading....'
    messsageTwo.textContent = ''

    if (location){
        fetch('/weather/?address=' + location ).then((response)=>{
            response.json().then((data) =>{
                    if(data.error){
                        console.log(data.error)
                        messageOne.textContent = data.error
                    }
                    else{
                        messageOne.textContent = "Location is " + data.location + "\n"
                        messsageTwo.textContent = data.temperature + " " + data.forecast
                    }
            })
        })
    }
    else{
        console.log("Please Enter a Address")
    }
})
