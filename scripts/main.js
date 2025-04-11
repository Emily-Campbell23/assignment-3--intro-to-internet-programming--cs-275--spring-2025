document.addEventListener("DOMContentLoaded", function () {
    const showMenuTrigger = document.querySelector("#js-triggers li:nth-child(1) a");
    const showModalTrigger = document.querySelector("#js-triggers li:nth-child(2) a");
    const modalPanel = document.querySelector(".modal-panel");
    const nav = document.querySelector("nav");

    const modalBackground = document.createElement("div");
    modalBackground.classList.add("modal-background");

    // Toggle nav visibility
    showMenuTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      nav.classList.toggle("show");
    });

    // Modal toggle
    showModalTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      modalPanel.classList.toggle("show");
      document.body.classList.toggle("modal-open");

      if (modalPanel.classList.contains("show")) {
        document.body.appendChild(modalBackground);
      }
    });

    // Close modal when background clicked
    modalBackground.addEventListener("click", function () {
      modalPanel.classList.remove("show");
      document.body.classList.remove("modal-open");
      if (document.body.contains(modalBackground)) {
        document.body.removeChild(modalBackground);
      }
    });

    // Close modal on Escape key
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
