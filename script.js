$(document).ready(function(){

    $(".table").hide();
    $(".info").hide();

    var n;
    var href;

    function readSomeLines(){
        file="data/" + href.substr(1) + ".csv";
        $.ajax({
            url: file,
            dataType: "text",
            success: function (data) {
                var table;
                if (n === 0) {
                    table = "<table class=" + href.substr(1) + ">";  //tu pozmieniac
                    table += "<thead></thead>";
                    table += "<tbody></tbody>";
                    table += "</table>"
                    $(href).html(table);
                }
                var rows = data.split(/\r?\n|\r/);
                for (i = n; i < n + 25 && i < rows.length; i++) {
                    var row = rows[i].split(",");
                    table = "<tr>";
                    for (var j = 0; j < row.length; j++) {
                        if (i === 0)
                            table += "<th>" + row[j] + "</th>";
                        else
                            table += "<td>" + row[j] + "</td>";
                    }
                    table += "</tr>";
                    if (i === 0)
                        $("." + href.substr(1) + " > thead").prepend(table);
                    else
                        $("." + href.substr(1) + " > tbody:last-child").append(table);
                }
            }
        })
    }

    function readAllLines(){
        file = "data/" + href.substr(1) + ".csv";
        $.ajax({
            url: file,
            dataType: "text",
            success: function (data) {
                var table;
                var rows = data.split(/\r?\n|\r/);
                for (i = n; i < rows.length; i++) {
                    var row = rows[i].split(",");
                    table = "<tr>";
                    for (var j = 0; j < row.length; j++)
                        table += "<td>" + row[j] + "</td>";
                    table += "</tr>";
                    $("." + href.substr(1) + " > tbody:last-child").append(table);
                }
                $("." + href.substr(1)).DataTable({
                    paging:false,
                });
                $("thead").css("cursor","pointer");
            }
        })
    }

    function showTable(){
        $('#home').hide();
        $('.table').hide();
        $('.info').hide();
        readSomeLines();
        $(href).show();
        $(href+"_info").show();
    }

    $(".menu_home").click(function(e) {
        e.preventDefault();
        $('.table').hide();
        $('.info').hide();
        $('button').hide();
        $('#home').show();
    });

    function handleScroll (e){
        e.preventDefault();
        if ($(document).height() - $(window).height() === $(window).scrollTop()) {
            n += 25;
            readSomeLines();
        }
    }

    $(".menu").click(function(e) {
        $('button').show();
        $(href+"_info").show();
        e.preventDefault();
        n=0;
        href=$(this).attr('href');
        $("table").remove();
        showTable();
        $(window).on('scroll',handleScroll);
    });

    $("button").on('click',function(e){
        e.preventDefault();
        n += 25;
        readAllLines();
        $(window).off('scroll', handleScroll);
        $("button").hide();
    })
});