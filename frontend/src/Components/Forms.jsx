const Forms = ({addRegister, newName, newNumber, handleChange}) =>{
    
    return(
        <><div>
            <h2>add a new</h2>
        </div>
            <form onSubmit={addRegister}>
                <div>
                    Name: <input
                        name="name"
                        value={newName}
                        onChange={handleChange} />
                </div>
                <div>
                    Number: <input
                        name="number"
                        value={newNumber}
                        onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form></>
    )
}

export default Forms