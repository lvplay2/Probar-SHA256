async function hashPassword(password, salt) {
    const text = password + salt;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword() {
    const storedHash = document.getElementById('stored-hash-input').value;
    const salt = document.getElementById('salt-input').value;
    const inputPassword = document.getElementById('password-input').value;
    const disableSalt = document.getElementById('disable-salt').checked;

    let hashedInput;
    if (disableSalt) {
        hashedInput = await hashPassword(inputPassword, '');
    } else {
        hashedInput = await hashPassword(inputPassword, salt);
    }

    if (hashedInput === storedHash) {
        document.getElementById('output').innerText = "¡Éxito! Contraseña correcta.";
    } else {
        document.getElementById('output').innerText = "Error: Contraseña incorrecta. Vuelve a intentarlo.";
    }
}