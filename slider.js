(function () {
    function initSlider() {
        const container = document.getElementById("my-slider-widget");
        if (!container) return;

        container.innerHTML = `
            <style>
                #my-slider-widget * { box-sizing: border-box; }

                #my-slider-container {
                    position: relative;
                    width: 100%;
                    height: 350px;
                    max-width: 800px;
                    margin: 0 auto;
                    overflow: hidden;
                    background: #000;
                }

                .myslide {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: opacity 1s ease-in-out;
                }

                .myslide img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .myslide.active {
                    opacity: 1;
                }

                /* Dots */
                #my-slider-dots {
                    position: absolute;
                    bottom: 12px;
                    width: 100%;
                    text-align: center;
                }

                .mydot {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    margin: 0 4px;
                    background: rgba(255,255,255,0.6);
                    border-radius: 50%;
                    cursor: pointer;
                    transition: background 0.3s;
                }

                .mydot.active {
                    background: #fff;
                }

                /* Mobile responsive */
                @media (max-width: 600px) {
                    #my-slider-container {
                        height: 250px;
                    }
                }
            </style>

            <div id="my-slider-container">
                <div class="myslide active"><img src="https://nmhschoolorg.finalsite.com/fs/resource-manager/view/bccd8b69-f8d5-46e1-bb15-517bfb4ac1d9"></div>
                <div class="myslide"><img src="https://nmhschoolorg.finalsite.com/fs/resource-manager/view/a227e1cf-5e0f-4c7c-9c12-11824a616acc"></div>
                <div class="myslide"><img src="https://nmhschoolorg.finalsite.com/fs/resource-manager/view/9c0edfc6-b28a-4862-bc8e-03a695820dc9"></div>

                <div id="my-slider-dots">
                    <span class="mydot active"></span>
                    <span class="mydot"></span>
                    <span class="mydot"></span>
                </div>
            </div>
        `;

        const slides = container.querySelectorAll(".myslide");
        const dots = container.querySelectorAll(".mydot");
        let current = 0;
        const total = slides.length;

        function showSlide(index) {
            slides.forEach((s, i) => s.classList.toggle("active", i === index));
            dots.forEach((d, i) => d.classList.toggle("active", i === index));
            current = index;
        }

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                showSlide(i);
                resetAutoPlay();
            });
        });

        // Autoplay
        let autoPlay = setInterval(() => {
            let next = (current + 1) % total;
            showSlide(next);
        }, 4000);

        function resetAutoPlay() {
            clearInterval(autoPlay);
            autoPlay = setInterval(() => {
                let next = (current + 1) % total;
                showSlide(next);
            }, 4000);
        }
    }

    // Run when DOM ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initSlider);
    } else {
        initSlider();
    }
})();
