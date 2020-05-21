const countYears = function() {
    const today = new Date();
    const yearsOfExperience = today.getFullYear() - 2017;

    let year = document.getElementById('years');
    year.textContent = String(yearsOfExperience);
}

window.onload = countYears;