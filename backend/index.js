require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

console.log(process.env.MONGODB_URI)

const app = express()
app.use(express.json())

morgan.token('body', (request) => {
  return JSON.stringify(request.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('dist'))

app.use(cors())

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  
  Person.findById(id)
    .then(person => {
      if (person){
        response.json(person)
      } else{
        response.status(404).json({error: 'Person not found'})
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then(count => {
      
      const date = new Date()

      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
      `)
      console.log(`Phonebook has info for ${count}`)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
   .then(result => {
    if (result){
      response.status(204).end()
    } else {
      response.status(404).json({error: 'Person not found'})
    }
   })
   .catch(error => next(error))

  
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })
  
  person.save()
    .then(savedPerson => {
      response.json(person)
    })
    .catch(error => next(error))
})



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})