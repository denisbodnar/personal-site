document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("my-form-2");

    if (form) {
        form.addEventListener("submit", handleSubmit);
    }

    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const postPaymentCheckbox = document.getElementById('post-payment');
    const uploadReceiptDiv = document.getElementById('upload-receipt');

    if (postPaymentCheckbox && uploadReceiptDiv) {
        // Initial state
        uploadReceiptDiv.style.display = postPaymentCheckbox.checked ? 'none' : 'block';

        postPaymentCheckbox.addEventListener('change', function() {
            uploadReceiptDiv.style.display = this.checked ? 'none' : 'block';
        });
    }

    // Logic to display uploaded file name on the button
    const receiptInput = document.getElementById('receipt');
    const uploadBtn = document.querySelector('#my-form-2 .file-upload-btn');

    if (receiptInput && uploadBtn) {
        receiptInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                uploadBtn.textContent = this.files[0].name;
            } else {
                uploadBtn.textContent = 'Завантажте квитанцію';
            }
        });
    }
});

async function handleSubmit(event) {
    event.preventDefault();
    const status = document.getElementById("my-form-status");
    const form = event.target;
    const data = new FormData(form);

    const uploadBtn = document.querySelector('#my-form-2 .file-upload-btn');

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
            uploadBtn.textContent = 'Завантажте квитанцію';
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
