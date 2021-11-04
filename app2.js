/*
var request = new XMLHttpRequest()
request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText);
        console.log(data);
        const pictureUrl = data[0]['url'];
        document.getElementById("cat").innerHTML = '<img src="' + pictureUrl + '">';
    }
}
request.open('GET', url, true);
request.send();
*/

document.getElementById('client-id-input').value = clientIdCredential
document.getElementById('client-secret-input').value = clientSecretCredential
var accessToken

var form = document.getElementById('login-form')
form.addEventListener('submit', function(e) {
    e.preventDefault()
    const clientId = document.getElementById('client-id-input').value
    const clientSecret = document.getElementById('client-secret-input').value
    var loginForm = document.getElementById('login')
    var displayTokenDiv = document.getElementById('display-token')
    var tokenRequest = new XMLHttpRequest()
    tokenRequest.onreadystatechange = function() {
        if (tokenRequest.readyState == 4 && tokenRequest.status == 200) {
            var data = JSON.parse(tokenRequest.responseText)
            accessToken = data.access_token
            console.log(data)
            console.log(accessToken);
            displayTokenDiv.innerHTML = accessToken
            loginForm.classList = 'inactive'
            displayTokenDiv.classList = 'active'
        }
    }
    tokenRequest.open('POST', 'https://accounts.spotify.com/api/token', true)
    tokenRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    tokenRequest.setRequestHeader('Authorization', 'Basic ' + btoa(clientId + ':' + clientSecret))
    tokenRequest.send('grant_type=client_credentials')
})

var albumRequest = document.getElementById('album-request')
var searchResult
albumRequest.addEventListener('submit', function(e) {
    e.preventDefault()
    var requestResultsDiv = document.getElementById('requests-results')
    requestResultsDiv.innerHTML = ''
    var searchRequest = new XMLHttpRequest()
    searchRequest.onreadystatechange = function() {
        if (searchRequest.readyState == 4 && searchRequest.status == 200) {
            var searchResult = JSON.parse(searchRequest.responseText)
            var searchedItem = searchResult[Object.keys(searchResult)[0]]['items'][0]['name']
            console.log(searchResult);
            console.log(searchedItem);

            var items = searchResult[Object.keys(searchResult)[0]]['items']
            items.forEach(item => {
                var container = document.createElement('div')
                container.setAttribute('class', 'album')
                var picture = document.createElement('img')
                var title = document.createElement('div')
                var artist = document.createElement('div')

                picture.setAttribute('src', item['images'][2]['url'])
                title.innerHTML = item['name']
                artist.innerHTML = item['artists'][0]['name']
                console.log(item);
                console.log(item['images'][2]);
                container.appendChild(picture)
                container.appendChild(title)
                container.appendChild(artist)
                requestResultsDiv.appendChild(container)
            });
        }
    }
    const query = document.getElementById("search").value
    const type = 'album'
    var searchUrl = "https://api.spotify.com/v1/search?q=" + query + "&type=" + type
    searchRequest.open('GET', searchUrl, true)
    searchRequest.setRequestHeader('Content-Type', 'application/json')
    searchRequest.setRequestHeader('Authorization', 'Bearer ' + accessToken)
    searchRequest.send()
})