ready(function() {
    var cards = [ "green", "red", "purple", "blue"];
    var generatedColorIndex = "";
    playGame(cards);
    _('.startGameButton').on('click', function(){
        playGame(ArrayMix(cards));
    });
});

function ArrayMix(a) {
    var d, c, b = a.length;
    while (b) {
        c = Math.floor(Math.random() * b);
        d = a[--b];
        a[b] = a[c];
        a[c] = d
    }
    return a;
}

function playGame(array) {
    var i, generatedColorIndex, numberOfCards = array.length, board = "";

    generatedColorIndex = Math.floor( Math.random( ) * (numberOfCards) ); // Генерируем целое случайное число от 0 до numberOfCards вкл-но
    _(".colorName").html(array[generatedColorIndex]);
    _(".colorName").css("color", array[generatedColorIndex]);

    for (i = 0; i < numberOfCards; i++) {
        board += "<div class='flipper'>" + 
                    "<div class='front'>" + 
                    "</div>" +
                    "<div class='"+array[i]+" back'>" + 
                    "</div>" + 
                 "</div>" + "\n";
    }
    _("#board").html(board);

    _(".flipper").on("click", function(){
        if (_(this).hasClass('opened')) _(this).removeClass('opened');
        else {
            _(".flipper").removeClass('opened');
            _(this).addClass('opened');
        }

        if (_(this).hasClass('opened')) {
            if (_(this).children().next().attr("class").split(' ')[0] == array[generatedColorIndex]) {
                alertBox.open("Congratulations, you made right choice!", true, array);
            }
            else {
                alertBox.open("Unfortunately, you did't make right choice. Try again", false);
            }
        } 
    });
}

var alertBox = {
    container: "",
    overlay: "",
      
    open: function(text, res, arr) {
        //set message
        alertBox.container = document.createElement("DIV");
        alertBox.container.className = "alert-box";
        alertBox.container.innerHTML = "<p>"+text+"</p>";
      	alertBox.container.closeButton = document.createElement("input");
      	alertBox.container.closeButton.setAttribute("type", "button");
      	alertBox.container.closeButton.value = "x";
  		alertBox.container.closeButton.className = "close_block";
      	alertBox.container.appendChild(alertBox.container.closeButton);
        document.body.appendChild(alertBox.container);

        alertBox.overlay = document.createElement("DIV");
        alertBox.overlay.className = "overlay";
        alertBox.overlay.style.width = "100%";
        alertBox.overlay.style.height = "100%";
        alertBox.overlay.style.backgroundColor = '#000000';
        alertBox.overlay.style.top = '0';
        alertBox.overlay.style.left = '0';
        alertBox.overlay.style.opacity = '0.6';
        alertBox.overlay.style.position = 'absolute';
        alertBox.overlay.style.zIndex = '9999';
        document.body.appendChild(alertBox.overlay);

	    _(alertBox.container.closeButton).on("click", function() {
	        alertBox.close(res, arr);
	    });
    },
    close: function(result, cards) {
        alertBox.container.remove();
        alertBox.overlay.remove();
        if (result) playGame(ArrayMix(cards));
    }
}
