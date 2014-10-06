/*!
 * jQuery wizard - Wizard Plugin
 * Original author: Miro Koczka
 * Version 0.1
 * Date: 2014-10-06
 */

;(function($) {

    'use strict';

    var pluginName = 'wizard',
        defaults = {
            // TODO: catch invalid input
            activeSlide: 1,
            namespace: 'pp-wizard',
            navigation: true,
            buttons: true
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.sections = null;

        this.init();
    }

    Plugin.prototype.init = function() {
        this.sections = this.getSections();
        this.slideIndex = this.options.activeSlide - 1;

        this.toggleVisibleSlide(this.slideIndex);

        if (this.options.navigation) {
            this.$navigation = $('<ul />').addClass(this.options.namespace + '-navigation');
            this.insertNavigation();
            this.initNavigationEvents();
        }
    };

    Plugin.prototype.toggleVisibleSlide = function(index) {
        var self = this;
        this.sections.each(function() {
            var $this = $(this);
            if ($this.index() === index) {
                $this.addClass(self.options.namespace + '-show');
                $this.removeClass(self.options.namespace + '-hide');
            } else {
                $this.addClass(self.options.namespace + '-hide');
                $this.removeClass(self.options.namespace + '-show');
            }
        });
    };

    Plugin.prototype.initNavigationEvents = function() {
        var self = this;
        this.$navigation.on('click', 'li', function() {
            var $this = $(this);
            self.$navigation.find('li').removeClass(self.options.namespace + '-active');
            $this.addClass(self.options.namespace + '-active');
            self.toggleVisibleSlide($this.index() + 1);
        });
    };

    Plugin.prototype.insertNavigation = function() {
        var self = this,
            items = '';

        this.sections.each(function(index, item) {
            var $item = $(item),
                activeClass = $item.index() === self.slideIndex ? self.options.namespace + '-active' : '';
            items += '<li class="' + activeClass + '">' + $item.attr('title') + '</li>';
        });

        this.$element.prepend(this.$navigation.html(items));
    };

    Plugin.prototype.getSections = function() {
        return this.$element.children('section');
    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);