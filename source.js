const photo = 50;
function get(url) {
    return new Promise(function(succeed, fail) {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.addEventListener("load", function() {
            if (request.status < 400)
                succeed(request.response);
            else
                fail(new Error("Request failed: " + request.statusText));
        });
        request.addEventListener("error", function() {
            fail(new Error("Network error"));
        });
        request.send();
    });
}
get("https://jsonplaceholder.typicode.com/photos")
    .then((data) => JSON.parse(data))
    .then(data => {
        console.log(data);
        
        let images = data.slice(0, photo);
        let cardsHolder = document.getElementById('card-template');
        
        cardsHolder.innerHTML = '';

        images.map((image, index) => {

            cardsHolder.insertAdjacentHTML('beforeEnd',`<article class="Card">
            <h2 class="Card-description" style="background-image:url(${image['thumbnailUrl']})">
                <a class="Card-title" href="${image['url']}">                
            ${image['title']}
                </a>
            </h2>
        </article>`)
        });


    })