console.log('Client side javascript file is xxxxxx!')

const weatherForm = document.getElementById("wikiBtn")
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('click', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'

    fetch('/page').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log('sssss')
                    messageOne.innerHTML = data.error.map(function(x) { 
                        
                        if(x.thumbnail){
                            image = `<img src='${x.thumbnail.source}' align='right'>`
                        } else {
                            image = ''
                        }
                        console.log(x.thumbnail)
                        if(x.title && x.extract) { return `
                    <div class="card border-dark mb-3" >
                        <div class="card-header"><h3><a href='http://en.wikipedia.org/?curid=${x.pageid}' target="_blank">${x.title}</a></h3></div>
                        <div class="card-body card-text-secondary">
                        <div class="card-body text-dark">
                        <p class="card-text">${image}${x.extract}</p>
                        </div>
                        </div>
                    </div>
                 `} else { return '' } } ).join('\n') 

            } else {
                messageOne.textContent = data.error
                console.log(data)
            }
        })
    })
})
