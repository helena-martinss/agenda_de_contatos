document.getElementById('form-agenda').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const contactList = document.getElementById('contact-list');
    const newContact = document.createElement('li');
    const favoriteList = document.getElementById('favorite-list');

    newContact.classList.add('contact-item');
    newContact.innerHTML = `
        <div class="contact-header">
            <i class="bi bi-person-fill"></i>
            <span>${nome}</span>
            <i class="bi bi-caret-down-fill"></i>
            <i class="bi bi-heart"></i>
        </div>
        <div class="contact-details">
            <p>Telefone: ${telefone}</p>
            <p>Email: ${email}</p>
        </div>
    `;

    newContact.querySelector('.bi-caret-down-fill').addEventListener('click', function() {
        const details = newContact.querySelector('.contact-details');
        details.classList.toggle('open');
    });

    contactList.appendChild(newContact);
    document.getElementById('form-agenda').reset();

    newContact.querySelector('.bi-heart').addEventListener('click', function() {
        const heartIcon = this;

        // Alternar o ícone do coração
        if (heartIcon.classList.contains('bi-heart')) {
            heartIcon.classList.remove('bi-heart');
            heartIcon.classList.add('bi-heart-fill');
        } else {
            heartIcon.classList.remove('bi-heart-fill');
            heartIcon.classList.add('bi-heart');
        }

        const newFavorite = newContact.cloneNode(true);
        favoriteList.appendChild(newFavorite);

        // Manter o estado do ícone de coração no clone
        const clonedHeartIcon = newFavorite.querySelector('.bi-heart, .bi-heart-fill');
        if (heartIcon.classList.contains('bi-heart-fill')) {
            clonedHeartIcon.classList.add('bi-heart-fill');
            clonedHeartIcon.classList.remove('bi-heart');
        } else {
            clonedHeartIcon.classList.add('bi-heart');
            clonedHeartIcon.classList.remove('bi-heart-fill');
        }

        // Adicionar evento ao ícone de detalhes nos favoritos
        newFavorite.querySelector('.bi-caret-down-fill').addEventListener('click', function() {
            const details = newFavorite.querySelector('.contact-details');
            details.classList.toggle('open');
        });

        // Adicionar evento ao ícone de coração nos favoritos
        clonedHeartIcon.addEventListener('click', function() {
            newFavorite.remove(); // Remove o contato dos favoritos ao clicar no coração

            // Atualizar o ícone de coração na aba de contatos
            if (heartIcon.classList.contains('bi-heart-fill')) {
                heartIcon.classList.remove('bi-heart-fill');
                heartIcon.classList.add('bi-heart');
            }
        });
    });
});
