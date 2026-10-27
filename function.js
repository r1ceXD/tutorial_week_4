const pages = {
    home: "index.html",
    televisions: "televisions.html",
    about: "about_us.html"
};

// Function to direct to different pages based on the parameter
function switch_page(page) {
    const destination = pages[page];

    if (!destination) {
        console.error(`Unknown page: ${page}`);
        return;
    }

    window.location.href = destination;
}

// Function to return to the home page when the logo is clicked
function go_to_home() {
    switch_page("home");
}

// Updates the navigation to show which page is currently open
function set_current_page(link) {
    const current_file = window.location.pathname.split("/").pop() || "index.html";
    const is_current_page = pages[link.dataset.page] === current_file;

    link.classList.toggle("active", is_current_page);

    if (is_current_page) {
        link.setAttribute("aria-current", "page");
    }
}

// Mouse feedback
function add_mouse_feedback(link) {
    link.addEventListener("mouseenter", () => {
        link.style.backgroundColor = "#f4d06f";
    });

    link.addEventListener("mouseleave", () => {
        link.style.backgroundColor = "";
    });
}

// Waits for HTML to be fully parsed and allows each value to be given based on the element
document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector("[data-logo]");

    if (logo) {
        logo.addEventListener("click", (event) => {
            event.preventDefault();
            go_to_home();
        });
    }

    // Redirects to the correct page when clicked and also calls the functions
    document.querySelectorAll("[data-page]").forEach((link) => {
        set_current_page(link);
        add_mouse_feedback(link);

        link.addEventListener("click", (event) => {
            event.preventDefault();
            switch_page(link.dataset.page);
        });
    });
});