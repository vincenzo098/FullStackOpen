const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const [,, password, name, number] = process.argv

const url = `mongodb+srv://fullstack:${password}@cluster0.arcrdkv.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family:4 })

const personSchema = new mongoose.Schema({
    name: String, 
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name && number){
    //passing the arguments as variables to person
    const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
    })

    //Inputing register to MongoDB
    person.save().then(result => {
    console.log('register saved!')
    mongoose.connection.close()
    })

} else {
    
    console.log("phonebook:")

    Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person.name, person.number)
    })
    mongoose.connection.close()
    })
}