/*=====================================================
*
*   A Mini JavaScript Framework
*   (c) Ruslan Salimov 2015
*
======================================================*/

(function(window, undefined) {

     ready = function(fn) {
      if (document.readyState != 'loading'){
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    }

    _ = function(selector) {
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

        /* Возвращаем объект с методами */
        return e;
    };

})(window);