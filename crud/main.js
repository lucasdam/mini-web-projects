'use strict'

// Funções para abrir e fechar o Modal
const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal')
        .classList.remove('active')
}

/* Getter e Setter do localStorage */
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient))

/* DELETE - Exclui o cliente */
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

/* UPDATE - Atualiza o cliente */
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

/* READ - Leitura dos clientes */
const readClient = () => getLocalStorage()

/* CREATE - Adiciona o cliente */
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

/* Limpa campos do modal */
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = '')
}

/* Capturando informações digitadas no modal */
const saveClient = () => {
    if (isValidFields()) {
        const client = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            city: document.getElementById('city').value
        }
        const index = document.getElementById('name').dataset.index
        if (index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

/* Cria a linha do cliente que está sendo adicionado */
const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.city}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector('#table-client>tbody').appendChild(newRow)
}

/* Limpa a tabela de clientes */
const clearTable = () => {
    const rows = document.querySelectorAll('#table-client>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

/* Atualiza a tabela de clientes */
const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

/* Preenche os campos na tela */
const fillFields = (client) => {
    document.getElementById('name').value = client.name
    document.getElementById('email').value = client.email
    document.getElementById('phone').value = client.phone
    document.getElementById('city').value = client.city
    document.getElementById('name').dataset.index = client.index
}

/* Edita as informações do cliente */
const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

/* Verifica se foi pressionado o botão de Editar ou Excluir e chama sua respectiva função */
const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.name}`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('save')
    .addEventListener('click', saveClient)

document.querySelector('#table-client>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancel')
    .addEventListener('click', closeModal)