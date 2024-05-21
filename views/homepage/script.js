const body = document.querySelector('body');
const login = document.querySelector('button');
login.addEventListener('click', () => {
    body.style.background = "radial-gradient(circle, #305673, #305673, #fcfcfc)";
    window. location. href = 'https://staffrelations2024.azurewebsites.net/signin';
});