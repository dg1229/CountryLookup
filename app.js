window.onload = (e) => {
    const nameField = document.querySelector("#searchterm");
    const nameKey = "dg1229-name"
    const storedName = localStorage.getItem(nameKey);

    if (storedName){
        nameField.value = storedName;
    }
    
    nameField.onchange = e=>{ localStorage.setItem(nameKey, e.target.value);};

    document.querySelector("#search").onclick = searchButtonClicked
};

function searchButtonClicked(){
    document.querySelector("#searching").style.visibility = "visible";
    document.querySelector("#content").innerHTML = "<br><br><br><br><i>Please search for a Country to display information</i>";
    let url = "https://restcountries.eu/rest/v2/name/";

    let term = document.querySelector("#searchterm").value;

    if(term.length < 1) return;

    url += term;
    getData(url);
    document.querySelector("#searching").style.visibility = "hidden";
}

function getData(url){
    let xhr = new XMLHttpRequest();

    xhr.onload = dataLoaded;

    xhr.onerror = dataError;

    xhr.open("GET", url);
    xhr.send();
}

function dataLoaded(e){
    let xhr = e.target;

    let obj = JSON.parse(xhr.responseText);

    let selection = obj[0];

    let options = "";
    for(i=0;i<obj.length;i++){
        options += '<option value='+i+'>'+obj[i].name+'</option>';
    }
    if(!(options == "")){
        document.querySelector("#results").innerHTML = options;
    }
    else{
        document.querySelector("#results").innerHTML = "<option value='select'>Invalid search...</option>"
        return;
    }
    document.querySelector("#results").style.visibility = "visible";
    
    updateInterface(selection);
    
    document.querySelector("#results").onchange = function(){
        updateInterface(obj[document.querySelector("#results").value]);
    };
}

function updateInterface(selection){

    //console.log(selection);

    let name = selection.name;
    if(name == ""){
        name = "N/A";
    };
    let flag = selection.flag;
    let capital = selection.capital;
    if(capital == ""){
        capital = "N/A";
    };
    let region = selection.region;
    if(region == ""){
        region = "N/A";
    };
    let population = selection.population;
    if(population == ""){
        population = "N/A";
    };

    let currency = selection.currencies[0].name;
    if(currency == ""){
        currency = "N/A";
    };
    let language = selection.languages[0].name;
    if(language == ""){
        language = "N/A";
    };
    let timezones = selection.timezones;
    if(timezones == ""){
        timezones = "N/A";
    };

    let content = "<h2>"+name+"</h2><img src='"+flag+"'/><p>Capital: "+capital+"<br>Region: "+region+"<br>Population: "+population+"</p>"

    if(document.querySelector("#currency").checked){
        content += "Currency: "+currency+"<br>";
    }
    if(document.querySelector("#lang").checked){
        content += "Language: "+language+"<br>";
    }
    if(document.querySelector("#tzone").checked){
        content += "Timezone(s): "+timezones+"<br>";
    }

    document.querySelector("#content").innerHTML = content;
}

function dataError(e){
    //console.log("An error occured");
}