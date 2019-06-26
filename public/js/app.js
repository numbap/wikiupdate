console.log('Client side javascript file is xxxxxx!')

const weatherForm = document.getElementById("wikiBtn")
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('click', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'

    fetch('http://localhost:3000/page').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log('sssss')

                
                // messageOne.textContent = 'data.error.length'

                //messageOne.textContent = `${data.error.map(function(){
                //    return 'Hello' }).join('') }<h3>ffffff</h3>`
                    messageOne.innerHTML = data.error.map(function(x) { 
                        
                        if(x.thumbnail){
                            image = `<img src='${x.thumbnail.source}' align='right'>`
                        } else {
                            image = ''
                        }
                        console.log(x.thumbnail)
                        if(x.title && x.extract) { return `
                    <div class="col-md-12">
                    <h3><a href='http://en.wikipedia.org/?curid=${x.pageid}' target="_blank">${x.title}</a></h3>
                    <p>${image}${x.extract}</p>

                    <p></p>
                    </div>
                 `} else { return '' } } ).join('\n') 

            } else {
                // console.log(data)
                // messageOne.textContent = data.error.forEach(function(x) { '<h3>' + x.title + '</h3>\n<p>' + x.extract + '/p\n' } )
                // messageOne.textContent = `${data.error.map(function(){
                //     return 'Hello' }).join('') }<h3>dddddd</h3>`

                messageOne.textContent = data.error
                console.log(data)
            }
        })
    })
})