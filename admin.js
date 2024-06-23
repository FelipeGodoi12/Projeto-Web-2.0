//Função para obtém os usuários do local storage 
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}
//Salva os usuários no local storage 
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
//Listagem dos usuários
function Listar(users) {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';
    users.forEach((user, index) => {
        const li = document.createElement("li");
        li.innerHTML = `(${user.date}) ${user.name} - ${user.email} <button class="delete" data-index="${index}">Excluir</button>`;
        lista.appendChild(li);
    });
}

//Adiciona um novo usuário 
function addUser(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = new Date().toLocaleString();
    
    const users = getUsers();
    users.push({ name, email, date });
    saveUsers(users);
    Listar(users);
    Limpar();
}
//Função para deletar um determinado usuário -
function deleteUser(event) {
    if (event.target.classList.contains('delete')) {
        const index = event.target.getAttribute('data-index');
        const users = getUsers();
        users.splice(index, 1);
        saveUsers(users);
        Listar(users);
    }
}
//Função para limpar os campos
function Limpar() {
    document.getElementById('form').reset();
}
//Excluí todos os usuários
function clearAll() {
    localStorage.removeItem('users');
    Listar([]);
}

//Pesquisa dos dados
function Buscar(event) {
    const pesquisa = event.target.value.toLowerCase();
    const users = getUsers();
    const filtrados = users.filter(user => 
        user.name.toLowerCase().includes(pesquisa) || 
        user.email.toLowerCase().includes(pesquisa)
    );
    Listar(filtrados);
}

//Funções dos botões 
document.getElementById('form').addEventListener('submit', addUser);
document.getElementById('clearAll').addEventListener('click', clearAll);
document.getElementById('lista').addEventListener('click', deleteUser);
document.getElementById('busca').addEventListener('input', Buscar);
document.getElementById('clear').addEventListener('click', Limpar);

//Renderiza a lista ao carregar a página 
document.addEventListener('DOMContentLoaded', () => {
    Listar(getUsers());
});
