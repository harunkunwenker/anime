/**
 * Adi.js
 */

;(function($) {

  'use strict';

  var Adi;

  $.adi = function(args) {

    /**
     * Merge defaults with user options
     */

    var options = $.extend({}, Adi.defaults, args);
    return new Adi(options);
  };

  /**
   * Constructor
   */

  Adi = function(args) {

    /**
     * Merge this with user options
     */

    $.extend(this, args);

    if (this._check()) {
      this._init();
      this.active();
    }

    if (!this._check()) {
      this.inactive();
    }
  };

  /**
   * Check for $.adblock
   */

  Adi.prototype._check = function() {
    return $.adblock === undefined
  };

  /**
   * Start plugin	 
   */

  Adi.prototype._init = function() {
    this._append();
  };

  /**
   * Set template
   */

  Adi.prototype._setTemplate = function(title, content) {

    return '<div class="jquery-adi">' +
      '<div class="jquery-adi_content">' +
      '<button class="jquery-adi_close"></button>' +
      '<h2>' + title + '</h2>' +
      '<p>' + content + '</p>' +
      '</div>' +
      '</div>';
  };

  /**
   * Append html
   */

  Adi.prototype._append = function(callback) {

    this.$el = $(this._setTemplate(this.title, this.content)).appendTo($(document.body)).addClass(this.theme);
    this._show();
  };

  /**
   * Show modal
   */

  Adi.prototype._show = function() {

    var that = this;

    this.$el.show();
    this._center();
    this._controls();

    this.onOpen(this.$el);
  };

  /**
   * Modal controls
   */

  Adi.prototype._controls = function() {

    var that = this;

    function close() {
      that.$el.hide();
      that.onClose(that.$el);
    }

    this.$el.on('click', '.jquery-adi_close', close);
    $(document).on('keyup', function(e) {
      if (e.keyCode == 27)
        close();
    });
  };

  /**
   * Center modal
   */

  Adi.prototype._center = function() {
    var $modal = this.$el.find('.jquery-adi_content');
    $modal.css('margin-top', -Math.abs($modal.outerHeight() / 2));
  };

  /**
   * Defaults
   */

  Adi.defaults = {
    title: '¡Adblock detectado!',
    content: 'Hemos observado que tienes un Ad Blocker activado. Ya sabemos que es muy cómodo, ¡¡¡¡Pero nos estás haciendo una faena!!!.',
    theme: 'light',
    onOpen: function() {},
    onClose: function() {},
    active: function() {},
    inactive: function() {}
  };

})(jQuery);

/*==========================
      End plugin
===========================*/

$(document).ready(function() {

  $.adi({
    theme: 'dark',
    onOpen: function(el) {
      /* $.adi working with animate.css */
      el.find('.jquery-adi_content').addClass('animated bounceInDown')
    },
    onClose: function(el) {
      /**
       * Redirect
       * ========
       * window.location.href('http://some-website')
       * 
       * Dont let user to see content / reload page
       * ==========================================
       * window.location.reload(true);
       */
    },
    inactive: function() {

      var tpl = '<h3>Vale tío, G.</h3>' +
        '<img src="//media.giphy.com/media/POWvddaQEHrgc/giphy.gif" />';

      $('.container').append(tpl);

      console.log('Adblock no detectado :)');
    },
    active: function() {

      var tpl = '<h3>Eres muy malo, G</h3>' +
        '<img src="//media.giphy.com/media/4lhJQOACaIfWU/giphy.gif" />';

      $('.container').append(tpl);

      console.log('Adblock detectado :(')
    }
  });

});