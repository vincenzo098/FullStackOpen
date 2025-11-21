const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())

morgan.token('body', (request) => {
  return JSON.stringify(request.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
    response.json(person)
  } else {
    response.status(404).json({ error: 'Person not found' })
  }
})

app.get('/info', (request, response) => {
    const count = persons.length
    const date = new Date()
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${date}</p>
    `)
    console.log(`Phonebook has info for ${persons.length}`)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  const person = {
    id: Math.random(),
    name: body.name,
    number: body.number

  }
  
  persons = persons.concat(person)

  response.json(person)
})



const PORT = 3001
app.listen(PORT)
console.log(`Server runing on port ${PORT}`)