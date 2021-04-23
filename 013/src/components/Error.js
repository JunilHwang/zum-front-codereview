class Error {
    constructor($target) {
        this.$target = $target;
        this.errorData = null;

        this.render();
    }

    setState(nextData) {
        this.errorData = nextData;
        this.render();
    }

    render() {
        if (!this.errorData) return;
        this.$target.innerHTML = "";
        const errorSection = document.createElement("section");
        errorSection.className = "error_section";

        const statusCode = document.createElement("p");
        statusCode.className = "status_code";
        statusCode.innerText = `error 발생 ${this.errorData.status ? this.errorData.status : ""}`;

        const errorMesaage = document.createElement("p");
        errorMesaage.className = "error_message";
        errorMesaage.innerText = this.errorData.message;

        errorSection.appendChild(statusCode);
        errorSection.appendChild(errorMesaage);

        this.$target.appendChild(errorSection);
    }
}

export default Error;