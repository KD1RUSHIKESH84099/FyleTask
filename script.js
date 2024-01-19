let currentPage = 1;

function fetchRepositories() {
    const username = $('#username').val();
    const perPage = $('#perPage').val();
    const searchKeyword = $('#search').val();
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${currentPage}&q=${searchKeyword}`;

    $('#repositories').empty();
    $('#loader').show();

    axios.get(apiUrl, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
        .then(response => {
            $('#loader').hide();
            displayRepositories(response.data);
        })
        .catch(error => {
            $('#loader').hide();
            $('#repositories').html(`<p class="text-danger">Error fetching repositories. Please check the username and try again.</p>`);
        });
}

function displayRepositories(repositories) {
    if (repositories.length === 0) {
        $('#repositories').html(`<p class="text-info">No repositories found for the given user.</p>`);
        return;
    }

    const repositoryList = $('<ul class="list-group"></ul>');
    repositories.forEach(repo => {
        const listItem = $(`<li class="list-group-item">${repo.name}</li>`);
        repositoryList.append(listItem);
    });

    $('#repositories').append(repositoryList);
}

$('#repositories').on('scroll', function () {
    if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        currentPage++;
        fetchRepositories();
    }
});
