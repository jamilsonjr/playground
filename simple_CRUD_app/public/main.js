const update = document.querySelector('#update-button')
update.addEventListener('click', _ =>{
    // Send put request 
    fetch('/quotes', {
        method:'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Jamilson Junior',
            quote: 'Instinct is a lie, told by a fearful body, hopping to be wrong.'
        })
    })    
})