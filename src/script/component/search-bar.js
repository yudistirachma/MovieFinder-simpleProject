class SearchBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Movie Title.." aria-label="Recipient's username" aria-describedby="basic-addon2" id="search-input">
            <div class="input-group-append">
                <button class="btn btn-dark" type="button" id="searchButton">Button</button>
            </div>
        </div>`;
    }
}

customElements.define("search-bar", SearchBar);