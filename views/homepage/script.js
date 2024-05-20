const login = document.querySelector('#login');
const logout = document.querySelector('#logout');

login.addEventListener('click',() => {
    document.body.style.backgroundColor = 'black';
    console.log('logging in ...');
});
logout.addEventListener('click', () => {
    console.log('logging out ...');
});

