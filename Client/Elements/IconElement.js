export default class IconElement extends HTMLElement {

    // --------------------------------------------------------------------------------------------
    // Public

    // ============================================================================================
    // Constructor
    // ============================================================================================
    constructor() {

        // Call the parent constructor
        super();

    }

    // ============================================================================================
    // Connected callback
    // ============================================================================================
    async connectedCallback() {

        // Get the source attribute
        const source = this.getAttribute("src");

        // Check if a source was provided
        if (source) {

            // Try loading the source data
            try {

                // Fetch the source data
                const response = await fetch(source);

                // Check if the HTTP request did not return 200 OK
                if (!response.ok) {

                    // Throw an error
                    throw new Error(`HTTP status: ${response.status}!`);

                }

                // Parse the response data as text
                const text = await response.text();

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
                this.append(svg);
            
            // Handle errors while loading the source data
            } catch (error) {

                // Output error message to the console
                console.error(error);

            }

        }

    }

}