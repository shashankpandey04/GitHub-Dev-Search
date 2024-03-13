function searchUsers() {
    const location = document.getElementById('searchInput').value;
    const apiUrl = `https://api.github.com/search/users?q=location:${location}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = '';

            data.items.forEach(user => {
                const userCard = document.createElement('div');
                userCard.classList.add('user-card');

                const avatar = document.createElement('img');
                avatar.src = user.avatar_url;
                userCard.appendChild(avatar);

                const username = document.createElement('p');
                username.textContent = user.login;
                userCard.appendChild(username);
                fetch(`https://api.github.com/users/${user.login}`)
                    .then(response => response.json())
                    .then(userData => {
                        const bio = document.createElement('p');
                        bio.textContent = userData.bio || 'No bio available';
                        userCard.appendChild(bio);

                        const followers = document.createElement('p');
                        followers.textContent = `Followers: ${userData.followers}`;
                        userCard.appendChild(followers);
                    })
                    .catch(error => console.error('Error fetching user details:', error));

                searchResults.appendChild(userCard);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
