document.querySelector('#logout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const response = await fetch('/api/logout');
    if (response.ok) {
        window.location.assign('/');
    }
});

//Logout Timer
let logoutTimer;
const logoutMS = 15 * 60 * 1000;

const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(async () => {
        await fetch('/api/logout');
        window.location.assign('/');
    }, logoutMS);
};

window.addEventListener('click', () => {
    resetLogoutTimer();
    console.log('timer reset')
})
window.addEventListener('keypress', () => {
    resetLogoutTimer();
    console.log('timer reset')

})
console.log('logout occurs after 15 minutes idle')
logoutTimer = setTimeout(async () => {
    await fetch('/api/logout');
    window.location.assign('/');
}, logoutMS);