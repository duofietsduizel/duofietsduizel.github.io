(function ($) {
    "use strict"; // Start of use strict

    function show(id, message) {
        $(`#${id}ModalMessage`).text(message);
        $(`#${id}Modal`).modal("show");
    }

    $("form.needs-validation").submit(function (event) {
        this.classList.add("was-validated");
    });

    $("form").submit(function (event) {
        event.preventDefault();

        if (this.checkValidity() === false) {
            return;
        }

        fetch(this.action, {
            method: this.method,
            body: new FormData(this),
            headers: {
                "Accept": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                show("success", "Uw aanmelding is in goede orde ontvangen. We nemen zo spoedig mogelijk contact op!")
            } else {
                response.json().then(data => {
                    if ("errors" in data) {
                        show("error", data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        show("error", "Er is iets mis gegaan bij het invullen van het formulier");
                    }
                });
            }
        }, reason => {
            show("error", "Er is iets mis gegaan bij het invullen van het formulier");
        }).catch(reason => {
            show("error", "Er is iets mis gegaan bij het invullen van het formulier");
        }).finally(onFinally => {
            $(this).closest(".modal").modal('hide');
        });
    });
})(jQuery);

function daySelected() {
    let $days = $("input.checkbox-day:checkbox");
    let required = $days.filter(":checked").length <= 0;

    $days.each(function () {
        $(this).prop('required', required);
    });
}