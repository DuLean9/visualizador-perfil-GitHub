const inputSearch = document.querySelector("#input-search");
const btnSearch = document.querySelector("#btn-search");


function handleSearch() {
    const searchValue = inputSearch.value

    if (searchValue) {
        console.log('O valor é:', searchValue);
        
    } else {
        alert('Digite um usuário no GitHub')
    }
};

btnSearch.addEventListener('click', handleSearch);


inputSearch.addEventListener('keyup', (e) => {

    if (e.key === 'Enter') {
        handleSearch()
    }
    
});
