const charContainer = document.querySelector('.chars-container');
const nameInput = document.querySelector('#name')
const speciesFilter = document.querySelector('#species')
const genderFilter = document.querySelector('#gender')
const statusFilter = document.querySelector('#status')
const loadMore = document.querySelector('#load-more')

const API = 'https://rickandmortyapi.com/api'

const defaultFilters = {
    name: '',
    species: '',
    gender: '',
    status: '',
    page: 1

}

async function getCharacters({ name, species, gender, status, page = 1 }) {

    const response = await fetch(`${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`)

    //Convertendo string 
    const characters = await response.json()
    return characters.results
}

async function render({ characters }) {
    characters.forEach((character) => {

        return charContainer.innerHTML += `
        <div class="char">
        <img src="${character.image}" alt="">
            <div class="char-info">
                <h3>${character.name}</h3>
            <span>${character.species}</span>
            </div>
        </div>
        `

    })
}

function filterChange(type, event) {
    return async () => {
        defaultFilters[type] = event.target.value
        charContainer.innerHTML = ''
        const characters = await getCharacters(defaultFilters)
        render({ characters })
    }
}

async function lMore() {
    defaultFilters.page += 1
    const characters = await getCharacters(defaultFilters)
    render({ characters })
}

function addEventListener() {
    //Trantando opções de name(busca) com keyup.
    nameInput.addEventListener('keyup', async (event) => {
        filterChange('name', event)()
    })

    //Trantando opções de species de acordo com seu option.

    speciesFilter.addEventListener('change', async (event) => {
        filterChange('species', event)()
    })

    //Trantando opções de gender de acordo com seu option
    genderFilter.addEventListener('change', async (event) => {
        filterChange('gender', event)()
    })

    //Trantando opções de status de acordo com seu option
    statusFilter.addEventListener('change', async (event) => {
        filterChange('status', event)()
    })

    loadMore.addEventListener('click', lMore)

}



async function main() {
    const characters = await getCharacters(defaultFilters)
    addEventListener()
    render({ characters })
}

main()

