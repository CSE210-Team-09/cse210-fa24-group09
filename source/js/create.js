function goHome() {
    window.location.href = '../html/home.html';
}

function saveAndReturn() {
    const title = document.getElementById('text-input').value;
    const code = document.getElementById('code-input').value;
    const comment = document.getElementById('comment-input').value;

    // Need to call create_journal from data.js to pass the information over
}
