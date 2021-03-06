(function () {
    $(document).ready(function () {
        var arr = []
        while (arr.length < $(".arc").length) {
            var randomnumber = Math.floor(Math.random() * 16) + 1;
            if (arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
        }
        var contWidth = $(".arc-container").width(),
            numArcs = $(".arc").length,
            arcArea = (contWidth - 2 * numArcs) * (numArcs <= 10 ? numArcs * 10 : 65) / 100, //% of area to be filled with arcs
            arcStartAngle = (Math.floor(Math.random() * 4) + 1) * 22.5,//generate a randome ange between 0 to 90 degree
            arcStartThickness = 30 - numArcs * 2,
            arcDiff = apDifference(arcStartThickness, numArcs, arcArea),
            tmpWidth = contWidth-50;
        // console.log(arcStartThickness, numArcs, arcArea);
        $.each($(".arc"), function (i, el) {
            setTimeout(function(){
                var arcAngle = i ? (i % 2 ? arcStartAngle + (i - 1) * 22.5 + 180 : arcStartAngle + i * 22.5) : arcStartAngle,
                arcThickness = ((numArcs - i - 1) * arcDiff) / 2 + arcStartThickness;
                $(el).css({
                    "transform": "translate(-50%, -50%) rotate(" + arcAngle + "deg)",
                    "border-width": arcThickness,
                    "border-color": changeColor("#33556D", i * 10),
                    "width": tmpWidth,
                    "height": tmpWidth,
                    "visibility": "visible"
                }).data({
                    "rotation": arcAngle,
                    index: i
                });
                $(".arc-trigger-holder").eq(i).slideDown().css({
                    "display": "flex"
                });
                tmpWidth -= arcThickness + 12;
            }, i*100);
        })

        $(".arc, .arc-trigger").on("mouseenter", function (e) {
            e.stopPropagation();
            var $el = $(this).is(".arc-trigger") ? $("#" + $(this).attr("for")).next(".arc") : $(this);
            $el.prev(".arc-radio").prop("checked", true);
        }).on("mouseleave", function (e) {
            e.stopPropagation();
            var $el = $(this).is(".arc-trigger") ? $("#" + $(this).attr("for")).next(".arc") : $(this);
            $el.parent().closest(".arc").trigger("mouseenter");
            $el.prev(".arc-radio").prop("checked", false);

        }).filter(".arc-trigger").off("click").on("click", function (e) {
            e.stopPropagation();
            console.log("click", this);
            if (!$(e.target).is(".arc-radio")) {
                var $el = $(this).is(".arc-trigger") ? $("#" + $(this).attr("for")).next(".arc") : $(this);
                var $prevEl = $(".arc-selected").removeClass("arc-selected");
                // $prevEl.css({
                //     "transform": "translate(-50%, -50%) rotate(" + (parseInt($prevEl.data("rotation"))) + "deg)"
                // })

                $(".arc-desc .desc").removeClass("open").slideUp();

                $("."+$(e.target).prop("for")).slideDown(500, function(e){
                    $(this).addClass("open")
                });

                $(".arc-trigger-holder").removeClass("disabled");

                $(e.target).closest(".arc-trigger-holder").addClass("disabled");

                $el.addClass("arc-selected").css({
                    "transform": "translate(-50%, -50%) rotate(" + (parseInt($el.data("rotation")) + 360) + "deg)"
                }).data("rotation", (parseInt($el.data("rotation")) + 360));
            }
        });

        function apDifference(a, n, s) {
            // Arithmatic Progression Difference calculation
            var a = a || 30; //starting number
            var n = n || 10; //Number of steps
            var s = s || 100; //sum of numbers
            var d = 0; //Difference
            //formula:
            d = (2 * s / n - 2 * a) / (n - 1)
            //console.log(d);
            return d;
        }
        // alg to calculate rotatin of an element
        function matrixToAngle(tr) {
            var values = tr.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var c = values[2];
            var d = values[3];

            var scale = Math.sqrt(a * a + b * b);

            console.log('Scale: ' + scale);

            // arc sin, convert from radians to degrees, round
            var sin = b / scale;
            // next line works for 30deg but not 130deg (returns 50);
            // var angle = Math.round(Math.asin(sin) * (180/Math.PI));
            var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
            return angle;
        }
        // alg to darken/lighten a color in a certain ratio
        function changeColor(col, amt) {
            var usePound = false;

            if (col[0] == "#") {
                col = col.slice(1);
                usePound = true;
            }
            var num = parseInt(col, 16);
            var r = (num >> 16) + amt;
            if (r > 255) r = 255;
            else if (r < 0) r = 0;

            var b = ((num >> 8) & 0x00FF) + amt;
            if (b > 255) b = 255;
            else if (b < 0) b = 0;

            var g = (num & 0x0000FF) + amt;
            if (g > 255) g = 255;
            else if (g < 0) g = 0;

            return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
        }

    })
})()