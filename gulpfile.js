document.addEventListener("DOMContentLoaded", function () {
    const showMenuTrigger = document.querySelector("#js-triggers li:nth-child(1) a");
    const showModalTrigger = document.querySelector("#js-triggers li:nth-child(2) a");
    const modalPanel = document.querySelector(".modal-panel");

    // Create modal background dynamically
    const modalBackground = document.createElement("div");
    modalBackground.classList.add("modal-background");

    // Menu toggling logic
    const mainMenu = document.querySelector("nav ul.main-menu");
    showMenuTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      mainMenu.classList.toggle("show");
    });

    // Modal toggling logic
    showModalTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      modalPanel.classList.toggle("show");
      document.body.classList.toggle("modal-open");

      if (modalPanel.classList.contains("show")) {
        document.body.appendChild(modalBackground);
      }
    });

    modalBackground.addEventListener("click", function () {
      modalPanel.classList.remove("show");
      document.body.classList.remove("modal-open");
      if (document.body.contains(modalBackground)) {
        document.body.removeChild(modalBackground);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        modalPanel.classList.remove("show");
        document.body.classList.remove("modal-open");
        if (document.body.contains(modalBackground)) {
          document.body.removeChild(modalBackground);
        }
      }
    });
  });
