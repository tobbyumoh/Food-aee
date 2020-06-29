const form = document.querySelector('#input-form');
const searchList = document.querySelector('.searchList');
const inputFoods = document.querySelector('#inputFoods');
const message = document.querySelector(".message");
const clearSearch = document.querySelector('.clearSearchList');

loadEventListeners();

function loadEventListeners() {

    //DOM load Event
    document.addEventListener('DOMContentLoaded', getFoods);


    form.addEventListener('submit', addFood)


    searchList.addEventListener('click', removeFood);


    clearSearch.addEventListener('click', clearFoods);

}


//Get Foods from local storage
function getFoods() {
    let foods;
    if (localStorage.getItem('foods') === null) {
        foods = [];
    } else {
        foods = JSON.parse(localStorage.getItem('foods'));
    }

    foods.forEach(function(food) {

        const li = document.createElement('li');

        li.className = 'collection-item';

        li.appendChild(document.createTextNode(food))

        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-remove mr-auto"></i>'

        li.appendChild(link);

        searchList.appendChild(li);

        message.textContent = '';

    });
}



//add Food
function addFood(e) {

    if (inputFoods.value === '') {
        inputFoods.classList.add('is-invalid');


    } else {
        inputFoods.classList.remove('is-invalid');

        const li = document.createElement('li');

        li.className = 'collection-item';

        li.appendChild(document.createTextNode(inputFoods.value.toLowerCase()));

        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-remove mr-auto"></i>'

        li.appendChild(link);

        searchList.appendChild(li);



        //store food in local storage
        storeFoodInLocalStorage(inputFoods.value);

        showResults();

        fetchFoodRecipe();

        inputFoods.value = '';

        message.textContent = '';

    }

    e.preventDefault();

}

//store Food function

function storeFoodInLocalStorage(food) {
    let foods;
    if (localStorage.getItem('foods') === null) {
        foods = [];
    } else {
        foods = JSON.parse(localStorage.getItem('foods'));
    }

    foods.push(food);

    localStorage.setItem('foods', JSON.stringify(foods));
}


//Remove Food

function removeFood(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {

        if (confirm("Are you sure u want to delete?")) {
            e.target.parentElement.parentElement.remove();

            //remove food item from local storage
            removeFoodFromLocalStorage(e.target.parentElement.parentElement);

        }

    }
}


//remove food item from local storage
function removeFoodFromLocalStorage(foodItem) {
    let foods;
    if (localStorage.getItem('foods') === null) {
        foods = [];
    } else {
        foods = JSON.parse(localStorage.getItem('foods'));
    }

    foods.forEach(function(food, index) {
        if (foodItem.textContent === food) {
            foods.splice(index, 1);

        }

    });

    localStorage.setItem('foods', JSON.stringify(foods));
}

function clearFoods() {

    while (searchList.firstChild) {
        searchList.removeChild(searchList.firstChild);
        message.textContent = "Your food recipe search list will appear here...";
    }

    clearFoodsFromLocalStorage();

}


function clearFoodsFromLocalStorage() {
    localStorage.clear();
}

//display searched result
const showResults = () => {

    const displaySearch = document.querySelector(".displaySearch");
    const showResults = document.getElementById("showResults");


    displaySearch.textContent = `You searched for: '${inputFoods.value.toLowerCase()}'`;
    if (showResults.style.display === "none") {
        showResults.style.display = "block";

    } else {
        showResults.style.display = "block"
    }
};

const toggleMode = () => {
    const toggleBtn = document.querySelector(".toggleBtn");
    const element = document.body;


    if (toggleBtn.textContent == "Light Mode") {
        element.classList.toggle("dark-mode");
        toggleBtn.textContent = "Dark Mode";
    } else {
        toggleBtn.textContent = "Light Mode";
        !element.classList.toggle('dark-mode');
    }
};



//Fetch data from food recipe Api (js)
function fetchFoodRecipe() {


    const id = "95bec68a";
    const apikey = "840cc0deadbcf75537491882e1c4d4f6";

    fetch(`https://api.edamam.com/search?q=${inputFoods.value}&app_id=${id}&app_key=${apikey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);



            for (i = 0; i < data.hits.length; i++) {
                document.querySelector('.card-columns').innerHTML += `<div class="card">
                                    <div class="card-img">
                                        <img src="${data.hits[i].recipe.image}" style="width: 354px;height:250px;" class="card-img-top img-fluid" loading="lazy" alt="" target="_blank">
                                    </div>
                                    <div class="card-body">
                                        <div class="card-title">
                                            <h5 class="font-weight-bolder text-center">${data.hits[i].recipe.label} \n</h5>
                                            <hr>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">${data.hits[i].recipe.ingredientLines}</li>
                                        
                                        </ul>
                                        <div class="card-body" >
                                            <span>How to cook: </span> <a href="${data.hits[i].recipe.url}" class="card-link">${data.hits[i].recipe.url}</a>
                                        </div>
                                    </div>
                               </div>

                             `;


            }
        })
        .catch(err => console.log(err));

}


//Fetch data from food recipe Api (jquery)