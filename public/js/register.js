async function registerHandler(event) {
    event.preventDefault();
  
    const userName = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (userName && password) {
      const response = await fetch('/api/users',
       {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("Hello response1" , response)
      if (response.ok) {
        console.log("Hello response" , response)
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
};
  
document
    .querySelector('.signup-form')
    .addEventListener('submit', registerHandler);