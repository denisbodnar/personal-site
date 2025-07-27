document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("my-form");

    if (form) {
        form.addEventListener("submit", handleSubmit);
    }

    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

async function handleSubmit(event) {
    event.preventDefault();
    const status = document.getElementById("my-form-status");
    const form = event.target;
    const data = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Дякую за заповнення форми! Незабаром книжка відправиться до вас";
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Ой, з формою якась халепа";
                }
            });
        }
    }).catch(error => {
        status.innerHTML = "Ой, щось пішло не так";
    });
}