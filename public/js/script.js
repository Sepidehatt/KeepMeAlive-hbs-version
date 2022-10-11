document.addEventListener('DOMContentLoaded',() => {
		console.log('new-app JS imported successfully!');

    const form = document.querySelector('.keep-form')

    const spinner = document.querySelector('.spinner-border')

    const activePage = document.querySelector('.active-page')

    spinner.setAttribute('hidden', 'true')

    form.addEventListener('click', () => {
      activePage.innerHTML += '<h2> Keeping all projects alive.... </h2>' 
      form.setAttribute('hidden', 'true')
      spinner.removeAttribute('hidden')
    })  
	},
	false
);
