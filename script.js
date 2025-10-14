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

const successMessage = "<h2>Чудово!</h2><p>Дякую за заповнену форму. Дані отримано, а це значить, що незабаром ваше замовлення відправиться до вас.</p>";
const forgotReceiptMessage = "<h2>Ой, ви дещо забули</h2><p>Будь ласка, завантажте квитанцію</p>";
const errorMessage = "<h2>Ой, щось пішло не так</h2><p>Будь ласка, спробуйте ще раз.</p>";

async function handleSubmit(event) {
    event.preventDefault();
    const status = document.getElementById("my-form-status");
    const form = event.target;
    const data = new FormData(form);

    const currentUrl = window.location.href;

    const uploadBtn = document.querySelector('#my-form-2 .file-upload-btn');
    const submitBtn = form.querySelector('.submit-btn');

    if (!form['post-payment'].checked && data.get('receipt').size === 0) {
        status.style.display = 'block';
        status.innerHTML = forgotReceiptMessage;
        return;
    }

    // Add loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        // Remove loading state
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');

        if (response.ok) {
            status.style.display = 'block';
            status.innerHTML = successMessage + "<p>Щось забули? Завжди можна <a href=\"" + currentUrl + "\">заповнити ще раз</a></p>";
            form.reset();
            form.style.display = 'none';

            uploadBtn.textContent = 'Завантажте квитанцію';
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = errorMessage;
                }
            });
        }
    }).catch(error => {
        // Remove loading state on error
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        
        status.innerHTML = errorMessage;
    });
}
