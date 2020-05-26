class TitleBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `<h1>Search Movie</h1>`;
    }
}

customElements.define("title-bar", TitleBar);