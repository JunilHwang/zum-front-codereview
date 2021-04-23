export const initLazyLoading = () => {
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const $image = new Image();
            const $card = entry.target.parentNode;
            const src = entry.target.dataset.src || entry.target.src;

            $card.removeChild($card.firstElementChild);
            $image.src = src;
            $image.alt = "기사사진";
            $card.insertBefore($image, $card.firstElementChild);


            io.unobserve(entry.target)

        })
    }, { rootMargin: "0px 0px 200px 0px" });
    initObserver(io);
}

const initObserver = (io) => {
    const placeholders = document.querySelectorAll("img");
    placeholders.forEach(placeholder => io.observe(placeholder));

}