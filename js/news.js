function loadDatas() {

    const apikey = "vvws03lAbJRjokuzn4dV32ZO8ehy8TO3";
    fetch(`https://api.nytimes.com/svc/topstories/v2/food.json?api-key=${apikey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let output = '';

            for (i = 0; i < data.results.length; i++) {
                output += `  <div class ="card" >
                                <div class="card-img"> <img src ="${data.results[i].multimedia[3].url}" alt = " " class="w-100" style="width: 354px;height:250px;" loading="lazy"> </div>

                                    <div class="card-body news-body">

                                        <h5> <a href = "" style=" color:black;" target="_blank">${data.results[i].title}</a></h5>
                                        <hr>
                                        <p style=" color:darkgray;">${data.results[i].abstract}</p>
                                    <div class="mt-4 news-bottom">
                                        <span>${data.results[i].byline}</span> 
                                        <span class="offset-2 mr-2"></span>

                                    </div>        
                                </div> 

                             </div>

                 `;

                document.querySelector('.card-columns').innerHTML = output;
            }
        })
        .catch(err => console.log(err));



}




$(document).ready(function() {
    const toggleBtn = $(".toggleBtn");

    const element = document.body;

    toggleBtn.on('click', function() {
        if (toggleBtn.text("Light Mode")) {
            element.classList.toggle("dark-mode");
            toggleBtn.text("Dark Mode");
        } else {
            toggleBtn.text("Light Mode");

        }
    });


});