document.querySelector('#swapToSignup').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#login').classList.add('hidden');
    document.querySelector('#signup').classList.remove('hidden');
});

document.querySelector('#swapToLogin').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#signup').classList.add('hidden');
    document.querySelector('#login').classList.remove('hidden');
});

document.querySelector('#loginButton').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;
    // console.log(email, password);
    const response = await fetch('/api/login', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
        }),
        method: 'POST',
    });
    if (response.ok) {
        alert('Logged in successfully');
        window.location.assign('/');
    }else{
        alert('Failed to login')
        console.log(response)
    }
});

document.querySelector('#signupButton').addEventListener('click', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#signupUsername').value;
    const email = document.querySelector('#signupEmail').value;
    const password = document.querySelector('#signupPassword').value;
    // console.log(email, password);
    const response = await fetch('/api/signup', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
        method: 'POST',
    });
    if (response.ok) {
        alert('Logged in successfully');
        window.location.assign('/');
    }else{
        alert('Failed to login')
        console.log(response)
    }
});
