/*
    * Version : 1.0
    * Author : @mohamedpierre
*/ 

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const result = document.getElementById('result');
// input event
search.addEventListener('input',  () => {
    searchStates(search.value, "notEnter"); // optional
});

// // TODO :  keyup event
search.addEventListener('keyup', ($event) =>{
    if($event.keyCode === 13){
        searchStates(search.value, "enter");
        console.log('1')
    }
    console.log('2')
})

// search states.json and filter it
const searchStates = async (searchText,isEnter) => {
    const response = await fetch('../data/stateless.json');
    const states = await response.json();
    var limitArrayToFive = [];
    
    // get matches to current text input
    let matches = states.filter(state => {
        const regex = new RegExp(`(${searchText})`, 'gi');//gi = global, case insensitive
        return state.name.match(regex) || state.abbr.match(regex)
    });
    console.log('3')

    if(searchText === '') {
        matches = limitArrayToFive = []
    }

    if(isEnter === "enter") {
        outputHtmlList(matches,"all");
    console.log('3')
    return;
    }
    
    for (let i = 0; i < matches.length; i++) {
        if(i === 5) break;
        limitArrayToFive.push(matches[i]);            
    }
    outputHtmlList(limitArrayToFive, "justFive");//optional
    console.log('4')
}

// show results in HTML
const outputHtmlList = (matches,isAllResults) => {
    if(matches.length > 0){
        const html = matches.map(match => `
                <h1>${match.name} (${match.abbr}) <span class="text-light">${match.capital}</span></h1>
               <small>Lat: ${match.lat} / Long: ${match.long}</small>
               <hr>
        `).join('');

        matchList.innerHTML = html;
        if(isAllResults === "all"){
            result.innerHTML = html;
            emptyList();
            clearInput();
        }
    } else {
        if(isAllResults === "all"){
            result.innerHTML = '';
        }
        matches = [];
        emptyList();
    }
}


const emptyList = () => {
    matchList.innerHTML = '';
}

const clearInput = () =>{
    search.value = '';
}