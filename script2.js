(function() {
    var more = $(".more");
    var xhr;
    var resultsHtml;
    var nextUrl;
    // console.log($(document).height(), $(window).height());
    $("input").on("keydown", function(e) {
        if (e.keyCode == 13) {
            $(".go").click();
        }
    });
    $(".go").on("click", function() {
        $.ajax({
            url: "https://elegant-croissant.glitch.me/spotify",
            data: {
                q: $("input").val(),
                type: $("select").val()
            },
            success: function(data) {
                data = data.artists || data.albums;
                console.log(data);

                $("h2").html('Results for "' + $("input").val() + '"');

                resultsHtml = "";
                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i].images.length != 0) {
                        resultsHtml += '<div class="result">';
                        resultsHtml +=
                            '<a href="' +
                            data.items[i].external_urls.spotify +
                            '">'+
                            '<img src="' + data.items[i].images[0].url + '">' +
                            '</a>'
                        resultsHtml +=
                            '<div class="name">' +
                            '<a href="' +
                            data.items[i].external_urls.spotify +
                            '">'+
                            data.items[i].name +
                            '</a>'+
                            "</div>";
                        resultsHtml += "</div>";
                    } else {
                        resultsHtml += '<div class="result">';
                        resultsHtml += '<img src="img_placeholder.png">';
                        resultsHtml += "</div>";
                    }
                }
                $("#results").html(resultsHtml);
                // var showMoreButton = location.search.indexOf(
                //     "&scroll=infinate"
                // );
                if (data.next) {
                    console.log("there are next");
                    $("footer").css({
                        display: "block"
                    });
                    nextUrl = data.next.replace(
                        "api.spotify.com/v1/search",
                        "elegant-croissant.glitch.me/spotify"
                    );
                    checkScroll();
                    console.log("calling scroll");
                } else {
                    $("footer").css({
                        display: "none"
                    });
                }
            }
        });
    });

    more.on("click", function(e) {
        if (xhr) {
            xhr.abort();
        }
        xhr = $.ajax({
            url: nextUrl,
            success: function(data) {
                data = data.artists || data.albums;
                resultsHtml = "";
                console.log(data.items.length);
                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i].images.length != 0) {
                        resultsHtml += '<div class="result">';
                        resultsHtml +=
                            '<a href="' +
                            data.items[i].external_urls.spotify +
                            '">'+
                            '<img src="' + data.items[i].images[0].url + '">' +
                            '</a>'
                        resultsHtml +=
                            '<div class="name">' +
                            '<a href="' +
                            data.items[i].external_urls.spotify +
                            '">'+
                            data.items[i].name +
                            '</a>'+
                            "</div>";
                        resultsHtml += "</div>";
                    } else {
                        resultsHtml += '<div class="result">';
                        resultsHtml += '<img src="img_placeholder.png">';
                        resultsHtml += "</div>";
                    }
                }
                $("#results").append(resultsHtml);
                if (data.next) {
                    console.log("there are next");
                    $("footer").css({
                        display: "block"
                    });
                    nextUrl = data.next.replace(
                        "api.spotify.com/v1/search",
                        "elegant-croissant.glitch.me/spotify"
                    );
                    checkScroll();
                    console.log("calling check");
                } else {
                    $("footer").css({
                        display: "none"
                    });
                }
            }
        });
    });

    function parseQueryString() {
        var qs = location.search.slide(1);
        var nvps = qs.split("&");
        var plarsed = {};

        nvps.forEach(function() {
            nvp = nvp.split("=");
            parsed[nvp[0]] = nvp[1];
        });
        return parsed;
    }

    function checkScroll() {
        setTimeout(function() {
            console.log($(document).height());
            console.log($(window).height());
            if (
                $(document).scrollTop() ==
                $(document).height() - $(window).height()
            ) {
                console.log("reached the bottom");
                $(".more").click();
            } else {
                checkScroll();
            }
        }, 1000);
    }
})();
