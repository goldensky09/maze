(function () {
    $(document).ready(function () {
        var arr = []
        while (arr.length < $(".arc").length) {
            var randomnumber = Math.floor(Math.random() * 16) + 1;
            if (arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
        }
        var contWidth = $(".container").width(),
            numArcs = $(".arc").length,
            arcArea = (contWidth - 7.75 * 2 * numArcs)*(numArcs <= 10 ? numArcs*10 : 65)/100, //85% of area to be filled with arcs
            //arcArea = (contWidth-2*numArcs),
            arcStartThickness = 45 - numArcs*2,
            arcDiff = apDifference(arcStartThickness, numArcs, arcArea);
        console.log(arcStartThickness, numArcs, arcArea);
        $.each($(".arc"), function (i, el) {
            $(el).css("transform", "rotate(" + arr[i] * 22.5 + "deg)")
            $(el).css("border-width", ((numArcs - i - 1) * arcDiff) / 2 + arcStartThickness);
            $(el).css("border-color", changeColor("#333333", i * 10));
        })

        $(".arc").on("mouseenter", function(e){
            e.stopPropagation();
            console.log("mouse in", this);
            $(this).prev(".arc-radio").prop("checked", true);
        }).on("mouseleave", function(e){
            e.stopPropagation();
            console.log("mouse out", this);
            $(this).parent().closest(".arc").trigger("mouseenter");
            $(this).prev(".arc-radio").prop("checked", false);
            
        })

        function apDifference(a, n, s) {
            // Arithmatic Progression Difference calculation
            var a = a || 30; //starting number
            var n = n || 10; //Number of steps
            var s = s || 100; //sum of numbers
            var d = 0; //Difference
            //formula:
            d = (2 * s / n - 2 * a) / (n - 1)
            console.log(d);
            return d;
        }

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