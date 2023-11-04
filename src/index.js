import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix';
import { fetchBreeds, fetchCat } from './cat-ip.js'
import './styles.css'

const selectElement = document.querySelector('.breed-select');
const infoElement = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');

selectElement.classList.add('is-hidden');
errorElement.classList.add('is-hidden');
infoElement.classList.add('is-hidden');

list();
function list() {
    fetchBreeds().then(
            data => {
        selectElement.innerHTML = catList(data)
                new SlimSelect({
                    select: '.breed-select',
                    settings: { placeholderText: 'Please choose a cat!',},
            });
                loaderElement.classList.add('is-hidden')
                selectElement.classList.remove('is-hidden')    
            })
        .catch(newError);
}

function catList(data) {
    const markup = data.map(({ name, id }) => { return `<option value="${id}">${name}</option>` })
    markup.unshift(`<option data-placeholder="true"></option>`);
  return markup.join('');
}

selectElement.addEventListener('change', onSelect);

function onSelect(event) {
    loaderElement.classList.replace('is-hidden', 'loader');
    selectElement.classList.add('is-hidden');
    infoElement.classList.add('is-hidden');

    const breedId = event.currentTarget.value;
    fetchCat(breedId)
    .then(data => {
        loaderElement.classList.replace('loader', 'is-hidden');
        selectElement.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        
        infoElement.innerHTML = `<img src="${url}" width='400' alt="${breeds[0].name}">
        <div><h1>'${breeds[0].name}'</h1><p>${breeds[0].description}</p>
        <p><b>Temperament: </b>${breeds[0].temperament}</p></div>`
        infoElement.classList.remove('is-hidden');
    })
    .catch(newError);
};

function newError(errorElement) {
    selectElement.classList.remove('is-hidden');
    loaderElement.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 3000,
        width: '400px',
        fontSize: '24px'
    });
};