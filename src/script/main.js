import $ from "jquery";

function main() {
    const renderMovie = (movies) => {
        $("#movie-list").html('');
        $.each(movies, function (i, data) {
            $("#movie-list").append(`
            <div class="col-md-4 mb-3">
                <div class="card" style="width: 18rem;">
                    <img src="${data.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                        <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                    </div>
                </div>
            </div>
            `)
        })
    }

    function movieSearch() {
        return fetch(`http://omdbapi.com/?apikey=29a8d624&s=${$('#search-input').val()}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.Response == "True") {
                    return renderMovie(responseJson.Search);
                } else {
                    console.log(responseJson);
                    return $("#movie-list").html(`
                    <div style="margin : auto">
                    <h3>${responseJson.Error}</h3>
                    </div>
                    `);
                }
            })
            .catch(error => {
                alert(error);
            });

    }

    $('#searchButton').on('click', () => {
        movieSearch();
        $('#search-input').val('');
    });

    $('#search-input').on('keyup', (event) => {
        if (event.which === 13) {
            movieSearch();
            $('#search-input').val('');
        }
    });

    $("#movie-list").on('click', '.see-detail', function () {
        // console.log($(this).data('id'));
        var key = $(this).data('id');

        function movieId() {
            // membuat instance dari XMLHttpRequest
            const xhr = new XMLHttpRequest();

            // menetapkan callback jka fungsi response sukses dan error
            xhr.onload = function () {
                const movieJson = JSON.parse(this.responseText);
                console.log(movieJson);
                if (movieJson.Response == "True") {
                    $('.modal-body').html(`
                     <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${movieJson.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md-8 ml-auto">
                                <ul class="list-group">
                                    <li class="list-group-item"><h5 class="card-title">${movieJson.Title}</h5></li>
                                    <li class="list-group-item"><h6>${movieJson.Released}</h6></li>
                                    <li class="list-group-item"><h6>${movieJson.Genre}</h6></li>
                                    <li class="list-group-item"><p class="card-text"></p>${movieJson.Plot}</li>
                                </ul>
                            </div>
                        </div>
                     </>
                    `)
                } else {
                    alert(movieJson.Error)
                }
            };

            xhr.onerror = function (error) {
                alert(error);
            };

            // membuat GET resquest dan menetapkan target URL
            xhr.open("GET", `http://omdbapi.com/?apikey=29a8d624&i=${key}`);
            // mengirim request
            xhr.send();
        }
        movieId();
    });




}
export default main;