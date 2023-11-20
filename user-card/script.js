// DOM
const fNameElement = document.getElementById('first-name')
const lNameElement = document.getElementById('last-name')
const countryElement = document.getElementById('country')
const pNumberElement = document.getElementById('phone-number')
const cityElement = document.getElementById('city')
const stateElement = document.getElementById('state')

const resetBtnElement = document.getElementById('reset')

// Initialization
const hasVisitedBefore = localStorage.getItem('hasVisitedBefore') || false

// Events
document.addEventListener('DOMContentLoaded', () => {
	if (!hasVisitedBefore) {
		localStorage.setItem('hasVisitedBefore', true)
		promptInputs()
	} else {
		updateCard()
	}
})

resetBtnElement.addEventListener('click', () => {
	localStorage.clear()
	promptInputs()
})

// Functions
const promptInputs = () => {
	const fName = prompt('What is your first name?')
	const lName = prompt('What is your last name?')
	const country = prompt('Where country are you from?')
	const pNumber = prompt('What is your phone number?')
	const city = prompt('What city do you live in?')
	const state = prompt('What state do you live in?')

	if (fName && lName && country && pNumber && city && state) {
		localStorage.setItem('fName', fName)
		localStorage.setItem('lName', lName)
		localStorage.setItem('country', country)
		localStorage.setItem('pNumber', pNumber)
		localStorage.setItem('city', city)
		localStorage.setItem('state', state)
	}

	updateCard()
}

const updateCard = () => {
	fNameElement.innerText = localStorage.getItem('fName')
	lNameElement.innerText = localStorage.getItem('lName')
	countryElement.innerText = localStorage.getItem('country')
	pNumberElement.innerText = localStorage.getItem('pNumber')
	cityElement.innerText = localStorage.getItem('city')
	stateElement.innerText = localStorage.getItem('state')
}
