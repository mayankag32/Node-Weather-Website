const path = require('path')
const express = require('express')
const hbs  = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


//express uses a global filepath not relative
console.log(__dirname) // for getting current directory
console.log(__filename) // for current filename
const app = express() //to initalize a express server

app.set('view engine', 'hbs'); // to sent template engines
app.set('views',path.join(__dirname,'../templates/views')) //set view location
const partialPath = path.join(__dirname,'../templates/partials')

//to use folder we want to serve using express we use()
const publicDirectory = path.join(__dirname,'../public')
app.use(express.static(publicDirectory)) // static takes a folder that we eant to serve up
hbs.registerPartials(partialPath)




app.get('' , (req, res) => { //get method to request
    res.render('index',{
        title : 'Weather App',
        name : 'Mayank Agrawal'
    })
})


app.get('/help' , (req,res) =>{
    res.render('help',{
        title : 'Help Page',
        help : 'Help about the page',
        name :'Mayank Agrawal'
    })

})


app.get('/about',(req,res) =>{
    res.render('about',{
        title : 'About',
        name : 'Mayank Agrawal',
        about : 'Weather App'
    })
})

app.get('/weather',(req,res) =>{
    if (!req.query.address){
        return res.send({
            error : 'You Must provide address',
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location} = {}) =>{
        if(error) {
            return res.send({error})
        }
        forecast(longitude,latitude, (error,{temperature,forecast}) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                temperature : temperature,
                forecast: forecast,
                location,
                address : req.query.address
            })
        })

    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title : '404',
        errorMessage : 'Help Article not Found'
    })
})
app.get('*' , (req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Mayank Agrawal',
        errorMessage: 'Page not Found'
    })
})

app.listen(3000,() =>{
    console.log('Server is up on port 3000.')
}) //to start a server
