import { useState, useEffect } from 'react'
import Forms from './Components/Forms'
import Numbers from './Components/Numbers'
import Filter from './Components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    personService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
  }, [])
  
  const addRegister = (event) =>{
    
    event.preventDefault()
    

    const nameObject = {
      name: newName,
      number: newNumber
    }
    const exists = persons.some(person => person.name === newName)
    if (exists === false) {
      personService
        .create(nameObject)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson)),
          setNewName(''),
          setNewNumber('')
        })
      
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleChange = (event) => {
    console.log(event.target)
    const { name, value } = event.target
    if(name === 'filter') setFilter(value)
    if(name === 'name') setNewName(value)
    if(name === 'number') setNewNumber(value)
  }

  const personsToShow = persons.filter(person=>
    person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.toLowerCase().includes(filter.toLowerCase())
  )

  const removePerson = (person) => {
    console.log("mother fucker clicked on", person.name)
    personService
      .remove(person.id)
      .then(updatedPersons =>{
        setPersons(updatedPersons)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} 
      handleChange={handleChange}/>
      <Forms addRegister={addRegister} 
      newName={newName}
      newNumber={newNumber} 
      handleChange={handleChange}
      />
      <Numbers persons={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App