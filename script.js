(function() {
    var more = $(".more");
    var xhr;
    var resultsHtml;
    var nextUrl;

    $(".go").on("click", function() {
        $.ajax({
            url: "https://elegant-croissant.glitch.me/spotify",
            data: {
                q: $("input").val(),
                type: $("select").val()
            },
            success: function(data) {
                data = data.artists || data.albums;

                $("h2").html('Results for "' + $("input").val() + '"');

                resultsHtml = "";
                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i].images.length != 0) {
                        resultsHtml += '<div class="result">';
                        resultsHtml +=
                            '<img src="' + data.items[i].images[0].url + '">';
                        resultsHtml +=
                            '<div class="name">' +
                            data.items[i].name +
                            "</div>";
                        resultsHtml += "</div>";
                    } else {
                        resultsHtml += '<div class="result">';
                        resultsHtml += '<img src="img_placeholder.png">';
                        resultsHtml += "</div>";
                    }
                    $("#results").html(resultsHtml);
                    if (data.next) {
                        console.log("there are next");
                        $("footer").css({
                            display: "block"
                        });
                        nextUrl = data.next.replace(
                            "api.spotify.com/v1/search",
                            "elegant-croissant.glitch.me/spotify"
                        );
                    } else {
                        $("footer").css({
                            display: "none"
                        });
                    }
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
            // data: {
            //   q: $('input').val(),
            //   type: $('select').val()
            // },
            success: function(data) {
                data = data.artists || data.albums;
                resultsHtml = "";
                console.log(data.items.length);
                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i].images.length != 0) {
                        resultsHtml += '<div class="result">';
                        resultsHtml +=
                            "<img src=" + data.items[i].images[0].url + ">";
                        resultsHtml +=
                            '<div class="name">' +
                            data.items[i].name +
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
                } else {
                    $("footer").css({
                        display: "none"
                    });
                }
            }
        });
    });
})();
