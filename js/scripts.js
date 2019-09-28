document.querySelector('body').style.backgroundImage = 'url(images/background.jpg)';

/**
 *
 * Hide current modal to show a new one
 *
 */
function hideModal (button) {

        document.querySelector('.modal-info-container').remove();
        document.querySelector('.modal-container').style.display = 'none';
        //  prevButton.disabled = false;
        //  nextButton.disabled = false;


}

/**
 * Disable button
 * @param {*} button
 */
function disableButton(button) {
    button.disabled = true;
    button.style.backgroundColor = '#0099cc';
}

function enableButton(button) {
    button.disabled = false;
    button.style.backgroundColor = '#4CAF50';
}

//send a request to API and create DOM elements
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        const people = JSON.parse(xhr.responseText).results;
        const gallery = document.getElementById('gallery');
        const modalContainer = document.createElement('div');
        const modal = document.createElement('div');

            //add buttons to toggle between users when modal window is open
            const toggleDiv = document.createElement('div');
            toggleDiv.className = "modal-btn-container";
            const prevButton = document.createElement('button');
            prevButton.setAttribute('type', "button");
            prevButton.setAttribute('id', "modal-prev");
            prevButton.className = "modal-prev btn";
            prevButton.innerHTML = 'Prev';
            const nextButton = document.createElement('button');
            nextButton.setAttribute('type', "button");
            nextButton.setAttribute('id', "modal-next");
            nextButton.className = 'modal-next btn';
            nextButton.innerHTML = 'Next';
            toggleDiv.appendChild(prevButton);
            toggleDiv.appendChild(nextButton);

        let targetDiv;
        let parent;
        let grandparent;

        //create a card for each person
        for (let i = 0; i < people.length; i++) {
            const div = document.createElement('div');
            div.className = 'card';
            gallery.appendChild(div);
            div.style.display = 'block';

            const imgContainer = document.createElement('div');
            imgContainer.className = 'card-img-container';
            div.appendChild(imgContainer);

            const img = document.createElement('img');
            img.className = 'card-img';
            img.setAttribute('alt', "profile picture");
            const picture = people[i].picture;
            img.setAttribute('src', picture.large);
            imgContainer.appendChild(img);

            const information = document.createElement('div');
            div.appendChild(information);

            const name = document.createElement('h3');
            name.setAttribute('id', 'name');
            const fullName = people[i].name;
            name.innerHTML = fullName.title + ' ' + fullName.first + ' ' + fullName.last;
            name.className ="card-name cap";
            information.appendChild(name);

            const email = document.createElement('p');
            email.className = "card-text";
            email.innerHTML = people[i].email;
            information.appendChild(email);

            const cityState = document.createElement('p');
            cityState.className = "card-text cap";
            const location = people[i].location;
            cityState.innerHTML = location.city + ', ' + location.state;
            information.appendChild(cityState);

            //event listener for cards
            div.addEventListener ('click', (event) => {
                modalContainer.className = "modal-container";
                modal.className = "modal";

                targetDiv = event.target;
                parent = targetDiv.parentElement;
                grandparent = parent.parentElement;

                //change style of 'prev' or 'next' button when you reach the first or the last card
                if (parent.className === 'card-img-container') {
                        if (targetDiv.previousElementSibling === null && parent.previousElementSibling === null
                            && grandparent.previousElementSibling === null) {
                                disableButton(prevButton);
                        }
                        else if ((targetDiv.nextElementSibling === null && grandparent.nextElementSibling === null)
                            || (grandparent.nextElementSibling.className === 'modal-container' && targetDiv.nextElementSibling === null)) {
                            disableButton(nextButton);
                        }
                }
                if (grandparent.className === 'card') {
                        if (grandparent.previousElementSibling === null) {
                            disableButton(prevButton);
                        }
                        else if (parent.nextElementSibling === null && grandparent.nextElementSibling === null) {
                            disableButton(nextButton);
                        }
                }
                if (parent.className === 'card') {
                    if(targetDiv.previousElementSibling === null && parent.previousElementSibling === null) {
                        disableButton(prevButton);
                    }
                    else if(parent.nextElementSibling === null) {
                        disableButton(nextButton);
                    }
                }
                if (parent.className === 'gallery') {
                    if (targetDiv.previousElementSibling === null) {
                        disableButton(prevButton);
                    }
                    else if (targetDiv.nextElementSibling === null && grandparent.nextElementSibling === null) {
                        disableButton(nextButton);
                    }
                }

                //create a modal window for a card that was clicked
                const button = document.createElement('button');
                button.setAttribute('type', 'button');
                button.setAttribute('id', 'modal-close-btn');
                button.className = "modal-close-btn";
                const strong = document.createElement('strong');
                strong.innerHTML = 'X';
                button.appendChild(strong);
                modal.appendChild(button);

                const info = document.createElement('div');
                modal.appendChild(info);
                info.className = "modal-info-container";
                const imgModal = document.createElement('img');
                imgModal.setAttribute('src', picture.large);
                imgModal.setAttribute('alt', "profile picture");

                imgModal.style.borderRadius = '50%';

                imgModal.addEventListener('mouseover', () => {
                    imgModal.style.transform = 'scale(1.1)';
                });

                imgModal.addEventListener('mouseout', () => {
                    imgModal.style.transform = 'scale(1)';
                });

                info.appendChild(imgModal);
                const nameModal = document.createElement('h3');
                nameModal.setAttribute('id', 'name');
                nameModal.className = "modal-name cap";
                nameModal.innerHTML = fullName.title + ' ' + fullName.first + ' ' + fullName.last;
                info.appendChild(nameModal);
                const emailModal = document.createElement('p');

                emailModal.className = "modal-text";
                emailModal.innerHTML = people[i].email;
                info.appendChild(emailModal);
                const cityModal = document.createElement('p');
                cityModal.className = "modal-text cap";
                cityModal.innerHTML = location.city;
                info.appendChild(cityModal);
                const hr = document.createElement('hr');
                info.appendChild(hr);

                const phone = document.createElement('p');
                phone.className = "modal-text";
                phone.innerHTML  =people[i].cell;
                info.appendChild(phone);

                const address = document.createElement('p');
                address.className = "modal-text";
                const street = location.street;
                const state = location.state;
                const postcode = location.postcode;
                address.innerHTML = street + ', ' + location.city + ', ' + state + ', ' + postcode;
                info.appendChild(address);

                const birthday = document.createElement('p');
                birthday.className = "modal-text";
                const dob = people[i].dob;
                birthday.innerHTML = dob.date.slice(0, 10);
                info.appendChild(birthday);
                modalContainer.appendChild(modal);

                gallery.appendChild(modalContainer);

                modalContainer.style.display = 'none';

                modal.parentNode.insertBefore(toggleDiv, modal.nextSibling);

                //add fadeIn effect when a card is clicked
                if (modal.getAttribute('style') === 'display: none;' || modal.getAttribute('style') === null) {
                    $('.modal-container').fadeIn();
                    $('.modal').fadeIn();
                }

                modalContainer.style.display = 'block';
                modal.style.display = 'block';

                button.onclick = function() { //event listener for 'x' button
                        $('.modal-container').fadeOut();
                        $('.modal').fadeOut();
                        document.querySelector('.modal-info-container').remove();
                        enableButton(prevButton);
                        enableButton(nextButton);
                };
            })
        }

        prevButton.addEventListener('click', () => {
            enableButton(nextButton);
            if (parent.className === 'card-img-container') {   //if an image is clicked
                hideModal(prevButton);
                grandparent.previousElementSibling.firstElementChild.firstElementChild.click();
            } else if (grandparent.className === 'card') {    //if info is clicked
                hideModal(prevButton);
                grandparent.previousElementSibling.firstElementChild.firstElementChild.click();
           } else if (parent.className === 'card') {         //if space around the image is clicked
                hideModal(prevButton);
                parent.previousElementSibling.firstElementChild.firstElementChild.click();
           } else if (parent.className === 'gallery') {       //if empty space around is clicked
                hideModal(prevButton);
                targetDiv.previousElementSibling.firstElementChild.firstElementChild.click();
           }
        })
        nextButton.addEventListener('click', () => {
            if (parent.className === 'card-img-container') {  //if an image is clicked
                enableButton(prevButton);
                hideModal(nextButton);
                grandparent.nextElementSibling.firstElementChild.firstElementChild.click();
           } else if (grandparent.className === 'card') {   //if info is clicked
                hideModal(nextButton);
                grandparent.nextElementSibling.firstElementChild.firstElementChild.click();
           } else if (parent.className === 'card') {       //if space around the image is clicked
              hideModal(nextButton);
            parent.nextElementSibling.firstElementChild.firstElementChild.click();
           } else if (parent.className === 'gallery') {     //if empty space around is clicked
                hideModal(nextButton);
                targetDiv.nextElementSibling.firstElementChild.firstElementChild.click();
            }
        })
    }
};
xhr.open('GET', 'https://randomuser.me/api/?results=12&nat=gb,us');
xhr.send();

const form = document.createElement('form');
form.setAttribute('action', '#');
form.setAttribute('method', "get");

let search = document.createElement('input');
search.setAttribute('type','search');
search.setAttribute('id','search-input');
search.className = "search-input";
search.setAttribute('placeholder','Search...');
form.appendChild(search);

const submit = document.createElement('input');
submit.setAttribute('type','submit');
submit.setAttribute('value', "🔍");
submit.setAttribute('id','search-submit');
submit.className = "search-submit";
form.appendChild(submit);
const parent = document.querySelector('.search-container');
parent.appendChild(form);

let input = document.querySelector('#search-input');
const button = document.querySelector('#search-submit');
const empty = /^(?!\s*$).+/;

//show all the cards when the input is cleared by clicking the little cross inside it
function showCardsCrossPressed () {
    const stringNames = document.querySelectorAll('#name');
    for(let g=0; g < stringNames.length; g++) {
        stringNames[g].parentElement.parentElement.style.display = 'block';
    }
}
input.addEventListener('search', () => {
      showCardsCrossPressed();
})

input.addEventListener ('keyup', () => {
    const isInputNotEmpty = empty.test(input.value);
    const stringNames = document.querySelectorAll('#name');

 for(let g=0; g < stringNames.length; g++) {
     if(isInputNotEmpty) {
         search = input.value.replace(/^\s+/, '').replace(/\s+$/, ''); //search can contain spaces in the beginning
     if (!stringNames[g].innerHTML.includes(search.toLowerCase())){
         stringNames[g].parentElement.parentElement.style.display = 'none';
     } else if (stringNames[g].innerHTML.includes(search.toLowerCase())) {
        stringNames[g].parentElement.parentElement.style.display = 'block';
     }} else if(!isInputNotEmpty){
        stringNames[g].parentElement.parentElement.style.display = 'block';
        }
    }
})
