const mobileFormButton = document.querySelector('.flopTuneHome__form button')
const desktopFormButton = document.querySelector('.border-search button')
const overlayContainer = document.querySelector('.flopTuneHome__modalOverlay')
const closeButton = document.querySelector('.flopTuneHome__modalCloseButton')
const btnsArray = [mobileFormButton, desktopFormButton]


const validate = async (buttonEl, inputField, errorField) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
  if (inputField.value.length == 0) {
    inputField.classList.add('error_active')
    errorField.innerHTML = "Email Field can't be empty!🙄 "
    errorField.style.display = 'block'
    setTimeout(() => {
      inputField.classList.remove('error_active')
      errorField.innerHTML = ""
      errorField.style.display = 'none'
    }, 1500)
  } else if (re.test(String(inputField.value).toLowerCase()) !== true) {
    inputField.classList.add('error_active')
    errorField.innerHTML = "Invalid Email syntax!"
    errorField.style.display = 'block'
    setTimeout(() => {
      inputField.classList.remove('error_active')
      errorField.innerHTML = ""
      errorField.style.display = 'none'
    }, 1500)
  } else {
    try {
      
      buttonEl.innerHTML = '';
      buttonEl.style.display = 'flex';
      buttonEl.style.justifyContent = 'center';
      buttonEl.style.alignItems = 'center';
      const newSpan = document.createElement('div')
      buttonEl.disabled = true
      newSpan.classList.add('loader')
      buttonEl.appendChild(newSpan)
      // Send Ajax for Email Operations https://floptune.herokuapp.com/api/addEmail
			$.ajax({
				url: "https://floptune.herokuapp.com/api/addEmail",
				method: "POST",
				data: { email: inputField.value },
				success: function (data) {
					// console.log(data.email);

					if (data.status == "401") {
						buttonEl.innerHTML = "Request Access";
						buttonEl.disabled = false;
						inputField.classList.add("error_active");
						errorField.innerHTML = "Email Already Exists!";
						errorField.style.display = "block";
						setTimeout(() => {
							inputField.classList.remove("error_active");
							errorField.innerHTML = "";
							errorField.style.display = "none";
						}, 1500);
					} else if (data.status == "200") {
						inputField.value = "";
						overlayContainer.style.display = "flex";
						buttonEl.innerHTML = "Request Access";
						buttonEl.disabled = false;
					}
				},
			});
    } catch (error) {      
        buttonEl.innerHTML = 'Request Access'
        buttonEl.disabled = false
        alert('Something went wrong, Try Again Later', error)        
    }
    
  }         
}


mobileFormButton.addEventListener('click', (e) => {
  e.preventDefault()
  const mobileInput = document.querySelector('.flopTuneHome__form input')
  const errorEl = document.querySelector('.returnError')    
  validate(mobileFormButton, mobileInput, errorEl)  
})


desktopFormButton.addEventListener('click', (e) => {
  e.preventDefault()
  const desktopInput = document.querySelector('.border-search input')
  const errorEl = document.querySelector('.returnError.desktop')  
  validate(desktopFormButton, desktopInput, errorEl)
})

closeButton.addEventListener('click', () => {
  overlayContainer.style.display = 'none'
})

