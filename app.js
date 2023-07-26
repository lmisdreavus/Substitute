var databases = {
    "pokemon": null,
    "move": null,
    "ability": null
};

fetch('pokemon.json')
    .then(response => response.json())
    .then(data => { databases.pokemon = data; });

fetch('move.json')
    .then(response => response.json())
    .then(data => { databases.move = data; });

fetch('ability.json')
    .then(response => response.json())
    .then(data => { databases.ability = data; });

function showSuggestions(event) {
    var input = document.getElementById("search").value.toLowerCase();
    var suggestions = document.getElementById("suggestions");

    // Enter 키를 눌렀을 때
    if (event.key === 'Enter') {
        suggestions.innerHTML = '';
        search();
        event.preventDefault();  // 폼 제출을 방지
        return;
    }

    while(suggestions.firstChild) {
        suggestions.removeChild(suggestions.firstChild);
    }

    for(var category in databases) {
        var database = databases[category];

        if(database) {
            for(var name in database) {
                if(name.toLowerCase().startsWith(input) && input !== '') {
                    var div = document.createElement("div");
                    div.textContent = name;
                    div.setAttribute("class", "list-group-item list-group-item-action");
                    div.addEventListener("click", function() {
                        document.getElementById("search").value = this.textContent;
                        search();
                        suggestions.innerHTML = '';
                    });
                    suggestions.appendChild(div);
                }
            }
        }
    }
}

    function search() {
        var input = document.getElementById("search").value.toLowerCase();
        var result = document.getElementById("result");
    
        while(result.firstChild) {
            result.removeChild(result.firstChild);
        }
    
        for(var category in databases) {
            var database = databases[category];
    
            if(database) {
                var data = database[input];
                if(data) {
                    if (category === 'pokemon') {
                        var text1 = document.createElement("p");
                        text1.textContent = data.text1;
                        result.appendChild(text1);
    
                        var table = document.createElement('table');
                        table.className = 'table table-striped';
    
                        var trHead = document.createElement('tr');
                        var trData = document.createElement('tr');
    
                        for(var key in data) {
                            if (key !== 'text1' && key !== 'text2') {
                                var th = document.createElement('th');
                                th.textContent = key;
                                trHead.appendChild(th);
    
                                var td = document.createElement('td');
                                td.textContent = data[key];
                                trData.appendChild(td);
                            }
                        }
    
                        table.appendChild(trHead);
                        table.appendChild(trData);
                        result.appendChild(table);
    
                        var text2 = document.createElement("p");
                        text2.textContent = data.text2;
                        result.appendChild(text2);
                    }
                    else {
                        for(var key in data) {
                            var p = document.createElement("p");
                            p.textContent = key + " : " + data[key];
                            result.appendChild(p);
                        }
                    }
                }
            }
        }
    }
document.getElementById("search-button").addEventListener("click", search);
