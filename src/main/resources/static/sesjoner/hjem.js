<!--------------------INNHENTING AV BILER-------------------->
const api = "/api/sesjoner";
$(function () {
    hentMotorvogner();
});

function hentMotorvogner() {
    $.get(api + "/hentAlle", function(data) {
        formaterMotorvogner(data);
    }).fail(function(jqXHR) {
        const json = $.parseJSON(jqXHR.responseText);
        $("#feilMelding").html(json.message);
    });
}

function formaterMotorvogner(motorvogner) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Personnr</th><th>Navn</th><th>Adresse</th><th>Kjennetegn</th><th>Merke</th><th>Type</th><th></th><th></th>" +
        "</tr>";

    for(let motorvogn of motorvogner) {
        ut += "<tr>" +
            "<td>" + motorvogn.personNr + "</td>" + "<td>" + motorvogn.navn + "</td>" + "<td>" + motorvogn.adresse + "</td>" +
            "<td>" + motorvogn.kjennetegn + "</td>" + "<td>" + motorvogn.merke + "</td>" + "<td>" + motorvogn.type + "</td>" +
            "<td> <a class='btn btn-primary' href='endre.html?id="+motorvogn.id+"'>Endre</a></td>" +
            "<td> <button class='btn btn-danger' onclick='slettEnMotorvogn("+motorvogn.id+")'>Slett</button></td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#motorvognRegister").html(ut);
}

function slettMotorvogner() {
    $.get(api + "/slettAlle", function() {
        hentMotorvogner();
    }).fail(function(jqXHR) {
        const json = $.parseJSON(jqXHR.responseText);
        $("#feilMelding").html(json.message);
    });

    /*$.ajax({
        url: api + "/slettAlle",
        method: "DELETE",
        success: hentMotorvogner,
        error: function(jqXhr, textStatus, errorMessage) {
            $("#feilMelding").html(errorMessage);
        }
    });*/
}

function slettEnMotorvogn(id) {
    $.get(api + "/slettEn?id=" + id, function(){
        hentMotorvogner();
    }).fail(function(jqXHR) {
        const json = $.parseJSON(jqXHR.responseText);
        $("#feilMelding").html(json.message);
    });
}

function loggUt() {
    $.get(api + "/loggUt", function() {
        window.location.href = "index.html";
    });
}