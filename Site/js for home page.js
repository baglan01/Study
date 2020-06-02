/*function login(){
	prompt("Log in ");
}

function join(){
	prompt("Join ");
}
*/

autoSlider();
var timer;
var left = 0;
function autoSlider(){
	timer = setTimeout(function (){
		var slide = document.getElementById('slide');
		left -= 512;
		if(left < -2048){
			left = 0;
			clearTimeout(timer);
		}
		slide.style.left = left + 'px';
		autoSlider();
	}, 2500);
}





let comments2 = [];
loadComments();

document.getElementById('comment-add').onclick = function(){
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');

    let comment = {
        name : commentName.value,
        body : commentBody.value,
        time : Math.floor(Date.now() / 1000)
    }

    commentName.value = '';
    commentBody.value = '';

    comments2.push(comment);
    saveComments(); 
    showComments();
}

function saveComments(){
    localStorage.setItem('comments2', JSON.stringify(comments2));
}

function loadComments(){
    if (localStorage.getItem('comments2')) comments2 = JSON.parse(localStorage.getItem('comments2'));
    showComments();
}

function showComments (){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments2.forEach(function(item){
        out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
        out += `<p class="alert alert-primary" role="alert">${item.name}</p>`;
        out += `<p class="alert alert-success" role="alert">${item.body}</p>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }








/*
document.getElementById('slider-left').onclick = sliderLeft;
var left = 0;
function sliderLeft(){
	var polosa = document.getElementById('polosa');
	left -= 512;
	if (left < -1024) {
		left = 0
	} 
	polosa.style.left = left + 'px';

}*/



$(document).ready(function(){
 
        var $menu = $("#menu");
 
        $(window).scroll(function(){
            if ( $(this).scrollTop() > 100 && $menu.hasClass("default") ){
                $menu.removeClass("default").addClass("fixed");
            } else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
                $menu.removeClass("fixed").addClass("default");
            }
        });//scroll
    });






$(document).ready(documentReady);

function documentReady() {
  var MAX_SNOW = 300;
  var MAX_SNOW_SIZE = 10;
  var MAX_SNOW_SPEED = 2;

  snowStart();

  function snowStart() {
    // console.log("// Snow animation start");
    createSnows();
  }

  function createSnows() {

    var container = $("#snow-animation-container");

    for (var i = 0; i < MAX_SNOW; i++) {
      var appendItem = getRandomItem(i);
              container.append(appendItem);
      var animateItem = $(".snow" + String(i));
      var randomTime = Math.random() * MAX_SNOW_SPEED;
      goAnimate(animateItem, i, randomTime);
      goAnimate2(animateItem);
    };

    // console.log("// Create snows");
  }

  function goAnimate(item, id, randomTime) {
    TweenMax.to(item, randomTime, {
      css: {
        marginTop: "=100"
      },
      ease: Linear.easeNone,
      onComplete: function() {
        var topPosition = item.css("margin-top").replace("px", "");
        if (topPosition > $(window).height()) {
          changePosition(item);
          randomTime = Math.random() * MAX_SNOW_SPEED;
          goAnimate(item, id, randomTime);
        } else {
          goAnimate(item, id, randomTime);
        }

      }
    });
  }

  function goAnimate2(item) {

    var directionTime = 1 + Math.floor(Math.random() * 5);
    var randomDirection = 1 + Math.floor(Math.random() * 4);
    var delayTime = 1 + Math.floor(Math.random() * 3);

    if (randomDirection == 1) {

      TweenMax.to(item, directionTime, {
        css: {
          marginLeft: "+=100"
        },
        ease: Linear.easeOut,
        onComplete: function() {

          TweenMax.to(item, directionTime, {
            css: {
              marginLeft: "-=100"
            },
            delay: delayTime,
            ease: Linear.easeOut,
            onComplete: function() {
              goAnimate2(item);
            }
          });
        }
      });
    } else if (randomDirection == 2) {

      TweenMax.to(item, directionTime, {
        css: {
          marginLeft: "-=100"
        },
        ease: Linear.easeOut,
        onComplete: function() {
          TweenMax.to(item, directionTime, {
            css: {
              marginLeft: "+=100"
            },
            delay: delayTime,
            ease: Linear.easeOut,
            onComplete: function() {

              goAnimate2(item);

            }
          });
        }
      });
    } else if (randomDirection == 3) {

      TweenMax.to(item, directionTime, {
        css: {
          marginLeft: "+=100"
        },
        ease: Linear.easeOut,
        onComplete: function() {
          goAnimate2(item);
        }
      });
    } else if (randomDirection == 4) {

      TweenMax.to(item, directionTime, {
        css: {
          marginLeft: "-=100"
        },
        ease: Linear.easeOut,
        onComplete: function() {
          goAnimate2(item);
        }
      });
    }
  }

  function changePosition(item) {
    var _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
    var _height = _width;
    var _blur = Math.floor(Math.random() * 5 + 2);
    var _left = Math.floor(Math.random() * ($(window).width() - _width));
    var _top = -$(window).height() + Math.floor(Math.random() * ($(window).height() - _height));

    item.css("width", _width);
    item.css("height", _height);
    item.css("margin-left", _left);
    item.css("margin-top", _top);
    item.css("-webkit-filter", "blur(" + String(_blur) + "px)");
    item.css("-moz-filter", "blur(" + String(_blur) + "px)");
    item.css("-o-filter", "blur(" + String(_blur) + "px)");
    item.css("-ms-filter", "blur(" + String(_blur) + "px)");
    item.css("filter", "blur(" + String(_blur) + "px)");
  }

  function getRandomItem(id) {
    var _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
    var _height = _width;
    var _blur = Math.floor(Math.random() * 5 + 2);
    var _left = Math.floor(Math.random() * ($(window).width() - _width));
    var _top = -$(window).height() + Math.floor(Math.random() * ($(window).height() - _height));
    var _id = id;

    return getSmallSnow(_width, _height, _blur, _left, _top, _id);
  }

  function getSmallSnow(width, height, blur, left, top, id) {
    var item = "<div class='snow" + id + "' style='position:absolute; margin-left: " + left + "px; margin-top: " + top + "px; width: " + width + "px; height: " + height + "px; border-radius: 50%; background-color: white; -webkit-filter: blur(" + blur + "px); -moz-filter: blur(" + blur + "px); -o-filter: blur(" + blur + "px); -ms-filter: blur(" + blur + "px); filter: blur(" + blur + "px);'></div>"
    return item;
  }

}

