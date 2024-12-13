const collapsibles = document.querySelectorAll(".collapsible");
        collapsibles.forEach((collapsible) => {
            collapsible.addEventListener("click", function () {
                collapsibles.forEach((otherCollapsible) => {
                    if (otherCollapsible !== this) {
                        const otherContent = otherCollapsible.nextElementSibling;
                        otherContent.style.display = "none";
                    }
                });

                const content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        });