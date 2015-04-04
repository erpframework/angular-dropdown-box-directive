(function(){

	'use strict';

	var app = angular.module('Application', []);

	app.controller('ApplicationController', [function(){

	}]);

})(angular);;(function(angular) {

        'use strict';

        angular.module('Application').directive('dropdownBox', ['$document', function($document) {

            return {
                scope: {
                    target: '@target',
                    placement: '@',
                    arrow: '@'
                },
                restrict: 'A',
                link: function(scope, elem, attrs) {


                    //Settings
                    var settings = {
                        containerClass: 'dropdown-box',
                        buttonClass: 'dropdown-box-button',
                        contentClass: 'dropdown-box-content',
                        arrowClass: 'arrow',
                        eventName: 'dropdown-box-backdrop',
                        placement: 'left|top|bottom|right',
                        distance: angular.isDefined(attrs.mouseover) ? 11 : 20,
                        identify: 'dropdown-box' + parseInt(Math.random() * 1000000)
                    };



                    //Create container
                    var element = {
                            container: angular.element('<div/>', {
                                class: settings.containerClass,
                                id: settings.identify
                            }),
                            button: elem,
                            content: angular.element('#' + scope.target).addClass(settings.contentClass),
                            arrow: angular.element('<div/>', {
                                class: settings.arrowClass
                            })
                        },
                        eventName = angular.isDefined(attrs.mouseover) ? 'mouseover.' + settings.eventName : 'click.' + settings.eventName;



                    //Clear events and remove class in
                    function clear(event) {

                        console.log(event);

                        if (event && event.which === 3) {
                            return;
                        }
                        if (element.container.hasClass('in')) {
                            element.container.removeClass('in');
                            angular.element($document).off(eventName);
                        }
                    }

                    //Toggle class 
                    function toggle() {
                        //Remove Class and event
                        if (element.container.hasClass('in')) {
                            element.container.removeClass('in');
                            angular.element($document).off(eventName);
                        }
                        //Add Class and event
                        else {
                            element.container.addClass('in');

                            console.log(angular.element($document));

                            angular.element($document).trigger(eventName);

                            angular.element($document)
                                .on(eventName, clear)
                                .on(eventName, eventExceptions.call(), function(e) {
                                    //Achar o nome do evento para manipular TODO
                                    e.stopPropagation();
                                });
                        }
                    }


                    //Return the ids and classes that are exceptions in event backdrop (document)
                    function eventExceptions() {
                        return '#' + settings.identify + ' > .' + settings.buttonClass + ', #' + settings.identify + ' > .' + settings.contentClass;
                    }

                    //Validate placement
                    function validatePlacement() {
                        if (scope.placement) {
                            return (settings.placement.split('|').indexOf(scope.placement)) > -1 ? true : false;
                        }
                        return false;
                    }

                    //Config position of content
                    function setPosition() {
                        switch (scope.placement) {

                            case 'right':
                                element.content.css({
                                    'left': element.button.outerWidth() + settings.distance,
                                    'top': ((element.content.outerHeight() / 2) - (element.button.outerHeight() / 2)) * -1
                                });
                                break;

                            case 'left':
                                element.content.css({
                                    'right': element.button.outerWidth() + settings.distance,
                                    'top': ((element.content.outerHeight() / 2) - (element.button.outerHeight() / 2)) * -1
                                });
                                break;

                            case 'top':
                                element.content.css({
                                    'bottom': element.button.outerHeight() + settings.distance,
                                    'right': (element.button.outerWidth() / 2) * -1
                                });
                                break;

                            case 'bottom':
                                element.content.css({
                                    'left': (element.button.outerWidth() / 2) * -1,
                                    'top': element.button.outerHeight() + settings.distance
                                });
                                break;
                        }
                    }


                    //Placement
                    scope.placement = validatePlacement() ? scope.placement : 'right';
                    scope.arrow = scope.arrow === 'false' ? false : true;

                    //Content
                    if (scope.arrow) {
                        element.content.addClass(scope.placement);
                        element.content.prepend(element.arrow);
                    }

                    //Insert container before button element
                    element.button.before(element.container);

                    //Insert button element into container  
                    element.button.addClass(settings.buttonClass).appendTo('#' + settings.identify);

                    //Insert target into container
                    element.container.append(element.content);

                    setPosition();


                    if (angular.isDefined(attrs.mouseover)) {
                        elem.on('mouseover', toggle);
                    } else {
                        elem.on('click', toggle);
                    }
                }
            };
        }]);

    })(angular);