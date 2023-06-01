const animationItems = document.querySelectorAll('.animation')

window.onload = function (element) {
	animationItems.forEach(element => {
		element.classList.add('animation-item')
	})
}