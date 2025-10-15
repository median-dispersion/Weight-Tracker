export default class IconElement extends HTMLElement {

    // --------------------------------------------------------------------------------------------
    // Public

    // ============================================================================================
    // Constructor
    // ============================================================================================
    constructor() {

        // Call the parent constructor
        super();

        // Get the source attribute
        const source = this.getAttribute("src");

        // Check if a source was provided
        if (source) {

            // Fetch the source data
            fetch(source)

            // Handle the HTTP response
            .then(response => {

                // Check if the HTTP did not return 200 OK
                if (!response.ok) {

                    // Throw an error
                    throw new Error(`HTTP error! Status: ${response.status}.`);

                }

                // Parse the response data as text
                return response.text();

            })

            // Handle parsed response text
            .then(text => {

                // Use the DOM parser to parse the response text as HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, "text/html");

                // Select the SVG data from the parsed HTML
                const svg = doc.querySelector("svg");

                // Check if no SVG data was selected
                if (!svg) {

                    // Throw an error
                    throw new Error("No SVG data!");

                }

                // Append the svg data to this element
                this.appendChild(svg);

            })

            // Handle errors while loading the source data
            .catch(error => {

                // Output error message to the console
                console.error(error);

            });

        }

    }

}