function loadDatas() {

    const apikey = "vvws03lAbJRjokuzn4dV32ZO8ehy8TO3";
    fetch(`https://api.nytimes.com/svc/topstories/v2/food.json?api-key=${apikey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let output = '';

            for (i = 0; i < data.results.length; i++) {
                output += `  <div class ="card" >
                                <div class="card-img"> <img src = "${data.results[i].multimedia[3].url}" alt = " " class="w-100" > </div>

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


// const toggleMode = () => {
//     const toggleBtn = document.querySelector(".toggleBtn");
//     const element = document.body;


//     if (toggleBtn.textContent == "Light Mode") {
//         element.classList.toggle("dark-mode");
//         toggleBtn.textContent = "Dark Mode";
//     } else {
//         toggleBtn.textContent = "Light Mode";
//         !element.classList.toggle('dark-mode');
//     }
// };


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

    // $("#bdy").on('load', function() {
    //     const apikey = "vvws03lAbJRjokuzn4dV32ZO8ehy8TO3";
    //     fetch(`https://api.nytimes.com/svc/topstories/v2/food.json?api-key=${apikey}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);

    //             let output = '';

    //             for (i = 0; i < data.results.length; i++) {
    //                 output += `  <div class ="card" >
    //                                 <div class="card-img"> <img src = "${data.results[i].multimedia[3].url}" alt = " " class="w-100" > </div>

    //                                     <div class="card-body news-body">

    //                                         <h5> <a href = "" style=" color:black;" target="_blank">${data.results[i].title}</a></h5>
    //                                         <hr>
    //                                         <p style=" color:darkgray;">${data.results[i].abstract}</p>
    //                                     <div class="mt-4 news-bottom">
    //                                         <span>${data.results[i].byline}</span> 
    //                                         <span class="offset-2 mr-2"></span>

    //                                     </div>        
    //                                 </div> 

    //                              </div>`;

    //                 document.querySelector('.card-columns').innerHTML = output;
    //             }
    //         })
    //         .catch(err => console.log(err));
    // });

});