import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
	return (
		<div>filter shown with <input onChange={props.filterHandler} /></div>
	)
}

const Persons = (props) => {
	const {persons,filterWord,deleteHandler} = props;
	const personsToShow = filterWord===''?
									persons:
									persons.filter(person=>person.name.toLowerCase().includes(filterWord.toLowerCase()));
	return (
		<div>
			{personsToShow.map(person=>
				<div key={person.id}>
					{person.name} {person.number}  
					<button onClick={()=>deleteHandler(person.id, person.name)}>delete</button>
				</div>	
			)}
		</div>
	)
}

const PersonForm = (props) => {
	return(
		<form onSubmit={props.submitHandler}>
			<div>name: <input value={props.newName} onChange={props.newNameHandler} /></div>
			<div>number: <input value={props.newNumber} onChange={props.newNumberHandler} /></div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

const Notifiation = ({message, type}) => {
	if(message===null || message==='')	{
		return null
	}
	return (
		<div className={type + ' notification'}>{message}</div>
	)
}

const App = () => {
	const [persons, setPersons] = useState([]/* [
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	] */)
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterWord, setFilterWord] = useState('')
	const [noticationMessage, setNotificationMessage] = useState(null);
	const [notificationMessageType, setNotificationMessageType] = useState('');

	useEffect(()=>{
		personService.getAll().then(initialPersons=>setPersons(initialPersons))
		
	}, [])

	const showNotification = (message,type) => {
		setNotificationMessage(message)
		setNotificationMessageType(type)
		console.log(message, type);
		setTimeout(() => {
			setNotificationMessage(null)
			setNotificationMessageType('')
		}, 5000)
	}

	const deleteName = (id,name) => {
		if(window.confirm(`Delete ${name} ?`))	{
			personService
				.deleteRecord(id)
				.then(()=>{
					setPersons(persons.filter(p=>p.id!==id));
					showNotification(`${name} deleted`, 'success')
				})
				.catch(err=>{
					showNotification(`${name} already removed from server`, 'error')
					setPersons(persons.filter(x => x.id !== id))
				})
		}
	}

	const addNewName = (e) => {
		e.preventDefault()
		const person = persons.find(a=>a.name===newName);
		if( person!== undefined)	{
			if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))	{
				// update existing record
				const updatedPerson = {...person, number: newNumber}
				personService
					.update(updatedPerson.id, updatedPerson)
					.then(returnedPerson=>{
						setPersons(persons.map(n => n.id !== updatedPerson.id ? n : returnedPerson))
						setNewName('')
						setNewNumber('')
						showNotification(`${returnedPerson.name} number is changed`, 'success')
					})
					.catch(err=>{
						showNotification(`${updatedPerson.name} already removed from server`, 'error')
						setPersons(persons.filter(x => x.id !== updatedPerson.id))
					})
			}
			return;
		}	

		// add new
		personService
			.create({name: newName, number: newNumber})
			.then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))
				setNewName('')
				setNewNumber('')
				showNotification(`Added ${returnedPerson.name}`, 'success')
			})
	}

	const updateNewName = (e) => {
		setNewName(e.target.value)
	}
	const updateNewNumber = (e) => {
		setNewNumber(e.target.value)
	}

	const filterHandler = (e) => {
		setFilterWord(e.target.value);
	}

	return (
		<div>
			<h2>Phonebook</h2>

			<Notifiation message={noticationMessage} type={notificationMessageType} />
			
			<Filter filterHandler={filterHandler} />

			<h3>add a new</h3>

			<PersonForm submitHandler={addNewName} 
								newName={newName} newNameHandler={updateNewName}
								newNumber={newNumber} newNumberHandler={updateNewNumber} />
			
			<h3>Numbers</h3>

			<Persons persons={persons} filterWord={filterWord} deleteHandler={deleteName} />
		</div>
	)
}

export default App