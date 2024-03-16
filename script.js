function openImageModal(avatarUrl) {
    const modalContent = document.createElement('div');
    modalContent.innerHTML = `<span class="close" onclick="closeModal()">&times;</span><img src="${avatarUrl}" alt="Profile Picture" style="width: 100%; border-radius: 8px;">`;
    openModal(modalContent);
}

function openUserModal(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(userData => {
            const modalContent = document.createElement('div');
            modalContent.innerHTML = `
                <span class="close" onclick="closeModal()">&times;</span>
                <h2>${userData.name || userData.login}</h2>
                <p><strong>Bio:</strong> ${userData.bio || 'No bio available'}</p>
                <p><strong>Followers:</strong> ${userData.followers}</p>
                <p><strong>Public Repos:</strong> ${userData.public_repos}</p>
                <p><strong>Location:</strong> ${userData.location || 'Unknown'}</p>
                <a href="${userData.html_url}" target="_blank">View Profile</a>
            `;
            openModal(modalContent);
        })
        .catch(error => console.error('Error fetching user data:', error));
}

function openModal(content) {
    const modal = document.getElementById('userModal');
    const modalContent = document.getElementById('userModalContent');
    modalContent.innerHTML = '';
    modalContent.appendChild(content);
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('userModal').style.display = 'none';
}
