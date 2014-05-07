angular.module('zentodone')
  .directive('taskCell', function ($animate) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var $bg, $text, width, firstTreshold, secondTreshold

        var preventDefault = function(event) {
          event.preventDefault();
        }

        var onDragStart = function() {
          $bg = angular.element(this)
          $text = $bg.children().first()

          width = $bg.width();
          firstTreshold = 40;
          secondTreshold = width * 0.6

          $text.css('transition', '')
          $bg.removeClass('left right first second')

          $bg.hammer()
            .on('touchmove', preventDefault)
            .on('drag', onDrag)
            .on('dragend', onDragEnd)
        }

        var onDrag = function(event) {
          $text.css('transform', 'translateX(' + event.gesture.deltaX + 'px)');

          var class1, class2

          if (event.gesture.deltaX < 0) {
            class1 = 'right'
          } else if (event.gesture.deltaX > 0) {
            class1 = 'left'
          }

          if (Math.abs(event.gesture.deltaX) > secondTreshold) {
            class2 = ' second'
          } else if (Math.abs(event.gesture.deltaX) > firstTreshold) {
            class2 = ' first'
          }

          $bg
            .removeClass('right left first second'.replace(class1, '').replace(class2,''))
            .addClass((class1 || '') + ' ' + (class2 || ''))
        }

        var onDragEnd = function(event) {
          $bg.hammer()
            .off('touchmove', preventDefault)
            .off('drag', onDrag)
            .off('dragend', onDragEnd)

          var action, move

          if (event.gesture.deltaX > secondTreshold) {
            action = attrs.swipeLongRight
            move = 'task-cell-inner-right'
          } else if (-event.gesture.deltaX > secondTreshold) {
            action = attrs.swipeLongLeft
            move = 'task-cell-inner-left'
          } else if (event.gesture.deltaX > firstTreshold) {
            action = attrs.swipeRight
            move = 'task-cell-inner-right'
          } else if (-event.gesture.deltaX > firstTreshold) {
            action = attrs.swipeLeft
            move = 'task-cell-inner-left'
          } else {
            move = 'task-cell-inner-back'
          }

          $animate.addClass($text, move, function() {
            if (!action) {
              $text
                .removeClass(move)
                .css('transform', '')
              return
            }
            $animate.leave(element, function() {
              scope.$apply(action)
            })
            scope.$digest()
          })
        }

        element.hammer()
          .on('dragstart', onDragStart)
      }
    };
  });

