/*Объект с курсами 3-х валюи*/
const rates = {}

/*Элементы для отображения курса валют  */
const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')
const elementGBP = document.querySelector('[data-value="GBP"]')

/*Элементы формы, ввод суммыб выбор валют и их отображение*/
const input = document.querySelector('#input')
const result = document.querySelector('#result')
const select = document.querySelector('#select')

getCurrencies()

/*Функция конвертации*/
async function getCurrencies (){
	const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js') //Получаем данные, которые вернет fetch()
	const data = await response.json() //Распаковываем данные, которые возвращает response
	const result = await data //В result присваиваем распакованные данные из data

	rates.USD = result.Valute.USD
	rates.EUR = result.Valute.EUR
	rates.GBP = result.Valute.GBP

	/*Втавляем в элементы текущюю валюту*/
	elementUSD.textContent = rates.USD.Value.toFixed(2)
	elementEUR.textContent = rates.EUR.Value.toFixed(2)
	elementGBP.textContent = rates.GBP.Value.toFixed(2)

	colorInformer()
}

/*Цвет информера*/
function colorInformer(){
	/*Цвет для информера USD*/
	rates.USD.Value > rates.USD.Previous ? elementUSD.classList.add('top') : elementUSD.classList.add('bottom')

	/*Цвет для информера EUR*/
	rates.EUR.Value > rates.EUR.Previous ? elementEUR.classList.add('top') : elementEUR.classList.add('bottom')

	/*Цвет для информера GBP*/
	rates.GBP.Value > rates.GBP.Previous ? elementGBP.classList.add('top') : elementGBP.classList.add('bottom')
}

/*Расчёт результата*/
input.oninput = convertValue
select.oninput = convertValue

/*Функция конвертации*/
function convertValue(){
	result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2)
}