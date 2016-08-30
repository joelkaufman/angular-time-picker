(function(module) {

  function timePicker() {

    return {
      link: function(scope, el, attrs) {

        var activeFace = el.find('.face-set.hour'),
          min = false,
          am = false,
          mouse = false;



        $$('.face-set').data('hand-ang', 0);
        $$('.face-set.min').data('hand-ang', 1);


        minMode(true);
        minMode(false);
        angular.element(document).on('mouseup',function() {
          if (mouse && !min) minMode(true);
          mouse = false;
        });


        el.find('.face-wrap').on('mousedown',function() {
          mouse = true;
        }).
        on('mousedown', handleMove)

        angular.element(document).on('mousemove', handleMove);
        $$('.face-set.min').addClass('face-off');
        $$('.time .part.min').on('click', minMode.bind(this, true));
        $$('.time .part.hour').on('click', minMode.bind(this, false));
        $$('.am-pm-btn.am').on('click', setAmPm.bind(this, true));
        $$('.am-pm-btn.pm').on('click', setAmPm.bind(this, false));
        $$('.time .am-pm').on('click', function() {
          setAmPm(!am);
        });
        $$('*').css('transition', 'none');
        setTimeout(function() {
          $$('*').css('transition', false);
        })



        angular.element(document).on('mouseup',function(){
          if(mouse && !min) minMode(true);
          mouse=false;
        });


       function $$(q){
          return el.find(q);
        }

        function setHandle(face, a, l, anim) {
          if (a == null) a = face.data('hand-ang');
          if (l == 'hidden') l = face.hasClass('min') ? 7 : 4;
          if (l == null) l = 5.5;
          var bl = a % 1 == 0 ? l - 0.25 : l;
          var deg = a * 30;
          face.data('hand-ang', a)
          face.find('.handle').css({
            transform: 'rotate(' +
              (deg).toFixed(20) +
              'deg) translateY(' +
              -l +
              'em)'
          }).toggleClass('anim', anim);
          face.find('.handle-bar').css({
            transform: 'rotate(' +
              (deg).toFixed(20) +
              'deg) scaleY(' +
              bl +
              ')'
          }).toggleClass('anim', !!anim);
        }


        function minMode(yes) {
          var cl = yes ? 'min' : 'hour';
          min = yes;
          activeFace.addClass('face-off');
          setHandle(activeFace, null, 'hidden', true);
          activeFace = $$('.face-set.' + cl).removeClass('face-off');
          setHandle(activeFace, null, null, true);
          $$('.time .active').removeClass('active');
          $$('.time .part.' + cl).addClass('active');
        }



        function setHour(hour) {
          if (hour == 0) hour = 12;
          $$('.time .hour').text(hour);
          setHandle($$('.face-set.hour'), hour, null, false);
        }

        function ang(x, y) {
          return Math.acos(x / Math.sqrt(x * x + y * y));
        }

        function setMin(min) {
          if (min == 60) min = 0
          $$('.time .min').text(min.pad(2));
          setHandle($$('.face-set.min'), min / 5, null, false);
        }

        function setAmPm(to_am) {
          am = to_am;
          $('.am-pm-btn.am').toggleClass('active', am);
          $('.am-pm-btn.pm').toggleClass('active', !am);
          $('.time .am-pm').text(am ? 'AM' : 'PM');
        }

        function handleMove(e) {
          if (!mouse) return;
          e.preventDefault();
          var $this = el.find('.face-wrap');
          var pos = $this.offset();
          var cent = {
            left: $this.outerWidth() / 2 + pos.left,
            top: $this.outerHeight() / 2 + pos.top
          };
          console.log(cent);
          var hrs = Math.atan2(e.pageY - cent.top, e.pageX - cent.left) / Math.PI * 6 + 3;
          console.log(hrs);
          hrs += 12
          hrs %= 12
          if (min) {
            setMin((hrs * 5).round());
          } else {
            setHour((hrs).round());
          }
        }

      },
      templateUrl: '/src/template.html'
    }

  }



  module.directive('timePicker', timePicker);



}(angular.module('time.picker', [])))