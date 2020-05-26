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
    })
    $('#search-input').on('keyup', (event) => {
        if (event.which === 13) {
            movieSearch();
            $('#search-input').val('');
        }
    })


}
export default main;