export default class HeaderElement extends HTMLElement {

    // --------------------------------------------------------------------------------------------
    // Public

    // ============================================================================================
    // Constructor
    // ============================================================================================
    constructor() {

        // Call parent constructor
        super();

    }

    // ============================================================================================
    // Connected callback
    // ============================================================================================
    connectedCallback() {

        // Get the initial scroll offset
        this.#scroll = window.scrollY;

        // Handle the initial scroll offset
        this.#handleScroll();

        // Add a scroll event listener
        window.addEventListener("scroll", this.#handleScroll);

    }

    // --------------------------------------------------------------------------------------------
    // Private

    // ============================================================================================
    // Handle scroll event
    // ============================================================================================
    #handleScroll = () => {

        // Get the current scroll offset, calculate the scroll delta from the last scroll event and determent the scroll direction
        const scroll = window.scrollY;
        const delta = Math.abs(scroll - this.#scroll);
        const direction = scroll < this.#scroll ? "up" : "down";

        // Update the scroll properties
        this.#delta = direction != this.#direction ? 0 : this.#delta + delta;
        this.#scroll = scroll;
        this.#direction = direction;

        // Check if the page is scrolled down at least 4 px
        if (this.#scroll > 4) {

            // Check if the header is not floating
            if (!this.classList.contains("header--floating")) {

                // Add the floating class
                this.classList.add("header--floating");

            }

        // If the page is at the top
        } else {

            // Check if the header is floating
            if (this.classList.contains("header--floating")) {

                // Remove the floating class
                this.classList.remove("header--floating");

            }

        }

        // If the page was scrolled more than the threshold
        if (this.#delta > this.#threshold) {

            // Check if the page was scrolled up
            if (this.#direction == "up") {

                // Check if the header is currently hidden
                if (this.classList.contains("header--hidden")) {

                    // Display the header by removing the hidden class
                    this.classList.remove("header--hidden");

                }

            // Check if the page was scrolled down
            } else {

                // Check if the header is currently visible
                if (!this.classList.contains("header--hidden")) {

                    // Hide the header
                    this.classList.add("header--hidden");

                }

            }

        }

    };

    // Scroll properties
    #scroll = 0;
    #delta = 0;
    #direction = 0;
    #threshold = 64;

}