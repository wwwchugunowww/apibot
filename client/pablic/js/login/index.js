const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    const data = {
        login: login,
        password: password
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch('http://localhost:5000/user/login', requestOptions);
        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            window.location.href = '/admin';
        } else {
            console.error('Ошибка при аутентификации');
        }
    } catch (error) {
        console.error(error);
    }
});



// const merchantData = document.getElementById("");


// const loginForm = document.getElementById("login-form");

// loginForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const login = document.getElementById("login").value;
//   const password = document.getElementById("password").value;

//   const data = {
//     login: login,
//     password: password,
//   };

//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };

//   try {
//     const response = await fetch(
//       "http://localhost:5000/user/login",
//       requestOptions
//     );
//     if (response.ok) {
//       const { token, name } = await response.json();

//       // Сохраняем токен и имя пользователя в localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("userName", name);

//       // Перенаправляем на страницу администратора
//       window.location.href = "/admin";
//     } else {
//       console.error("Ошибка при аутентификации");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });
