/*=====================================================
*
*   _RoiJS : A Mini JavaScript Framework
*   (c) Ruslan Salimov 2015
*
======================================================*/

(function(window) {

    function ready(fn) {
      if (document.readyState != 'loading'){
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    }

    function _(selector) {
        var e = {};
        e.selector = selector;

        if(typeof selector === 'object'){
            e.element = e.selector
        } else{
            var allElements = document.querySelectorAll(e.selector);
            if(allElements.length == 1) {e.element = document.querySelector(e.selector);
            } else { e.elements = allElements; }
        }
        /* Event FUNCTIONS */
        e.on = function(type,callback){
            if(e.elements){
                for (var i=0; i < e.elements.length; i++){
                    e.elements[i]['on' + type] = callback;
                }
            }
            else e.element['on' + type] = callback;
            return e;
        }
        /* BASIC FUNCTIONS */
        e.html = function(content){
            if(content != undefined)
              return e.element.innerHTML = content;
            else
              return e.elements || e.element;
        }
                e.class = function(className){
            if(!className) return e.element.getAttribute('class');
            else if(e.elements){
                for (var i=0; i < e.elements.length; i++){
                    e.elements[i].className += ' ' + className;
                }
            } else{
                e.element.className += ' ' + className;      
            } return e;
        }
        e.removeClass = function(className){
            if(e.elements){
                for (var i=0; i < e.elements.length; i++){
                    var otherClasses = e.elements[i].className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    e.elements[i].setAttribute('class', otherClasses.trim());
                }
            }
            else{
                var otherClasses = e.element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                e.element.setAttribute('class', otherClasses.trim());
            } return e;
        }
        e.toggleClass = function(className){
            if (e.element.classList) { 
                e.element.classList.toggle(className);
            } else {
                var classes = e.element.className.split(' ');
                var existingIndex = classes.indexOf(className);
                if (existingIndex >= 0) {
                    classes.splice(existingIndex, 1);
                } else { classes.push(className);
                    e.element.className = classes.join(' ');
                }
            } return e;
        }
        e.hasClass = function(className) {
        if (!className) return e.element.classList;
            if(e.elements){
                for (var i=0; i < e.elements.length; i++){
                    result = e.elements[i].classList.contains(className);
                    if (result == false) break;
                }
            }
            else result = e.element.classList.contains(className);
        return result;
        }
        e.addClass = function(className) {
        if(e.elements){
                for (var i=0; i < e.elements.length; i++){
                    e.elements[i].classList.add(className);
                }
            }
            else e.element.classList.add(className);
        return e;
        }
        e.css = function(name,value){
            if(e.elements){
                for (var i=0; i < e.elements.length; i++){
                    e.elements[i].style[name] = value;
                }
            } else{
                if(!value) return e.element.style[name];
                e.element.style[name] = value;
            } return e;
        }
        e.attr = function(name,value){
            if(!value) { return e.element.getAttribute(name);
            } else if(e.elements){
                for (var i=0; i < e.elements.length; i++){
                    e.elements[i].setAttribute(name,value);
                }
            } else{
                e.element.setAttribute(name,value);
            } return e;
        }
        e.text = function(value){ 
            if(!value) return e.element.textContent;

            else {
                e.element.textContent = value;
            } return e;
        }
        e.next = function(){
            e.element = e.element.nextElementSibling;
            return e;
        }
        e.prev = function(){
            e.element = e.element.previousElementSibling;
            return e;
        }
        e.hide = function(){
            if(!e.elements){
                e.element.style.display = 'none';
            } else {
                for (var i=0; i < e.elements.length; i++){
                    e.elements[i].style.display = 'none';
                }
            }
            return e;
        }
        e.show = function(){
            if(e.elements){
                for (var i=0; i < e.elements.length; i++){
                    e.elements[i].style.display = '';
                }
            } else {
                e.element.style.display = '';
            } return e;
        }
        e.after = function(htmlString){ 
            e.element.insertAdjacentHTML('afterend', htmlString);
            return e;
        }
        e.replaceWith = function(htmlString){
            e.element.outerHTML = htmlString;
            return e;
        }
        e.before = function(htmlString){ 
            e.element.insertAdjacentHTML('beforebegin', htmlString);
            return e;
        }
        e.height = function(){
            return e.element.offsetHeight;
        }
        e.width = function(){
            return e.element.offsetWidth;
        }
        e.first = function(){
            if(e.elements) {e.element = e.elements[0];}
            return e;
        }
        e.parent = function(){
            e.element = e.element.parentNode;
            return e;
        }
        e.children = function(key){
            if(!key) key = 0;
            e.element = e.element.childNodes[key];
            return e;
        }
        e.remove = function () {
            return this.forEach(function () {
                return e.element.parentNode.removeChild(e.element);
            });
        };
        return e;
    };

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
        var i, generatedColorIndex, numberOfCards = array.length, board = "", res = false;

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
                    alertBox.open("Congratulations, you made right choice!");
                    res = true;
                }
                else {
                    alertBox.open("Unfortunately, you did't make right choice. Try again");
                }
            } 
        });

        _(".close_block").on("click", function() {
            alertBox.close(res, array);
        });
    }

    var alertBox = {
        container: "",
        overlay: "",
          
        open: function(text) {
            //set message
            alertBox.container = _(".alert-box");
            alertBox.container.toggleClass("hide");
            alertBox.container.children(1).html(text);

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
        },
        
        close: function(result, cards) {
            alertBox.container.parent().toggleClass("hide");
            alertBox.overlay.remove();
            if (result) playGame(ArrayMix(cards));
        }
    }

    ready(function() {
        var cards = [ "green", "red", "purple", "blue"];
        var generatedColorIndex = "";
        playGame(cards);
        _('.startGameButton').on('click', function(){
            playGame(ArrayMix(cards));
        });
    });
 })(window);