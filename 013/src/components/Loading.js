class Loading {
    constructor($target) {
        this.$target = $target;
        this.loading = document.createElement("div");
        this.loading.className = "loading";
        this.loading.classList.add("hidden");
        this.loading.innerText = "loading...";


        this.render();
    }

    toggleLoading() {
        const loading = document.querySelector(".loading");
        loading.classList.toggle("hidden");
    }

    render() {
        this.$target.appendChild(this.loading);
    }
}

export default Loading;