(function ( $ ) {
   $.fn.stickWith = function ( options ) {
      
      var settings = $.extend({
         top: 0,
      }, options);
      
      return this.each(function () {
         var $this    = $( this );
         var $window  = $( window );

         var swapPos  = $this.offset().top - settings.top; 
         var fixed    = false;
         var fixedCSS = {position: 'fixed',
                         top:       settings.top,
       		  left:      $this.offset().left };
         var absoluteCSS = {position: 'absolute',
                            top:      $this.css('top'),
       		     left:     $this.css('left'),
                            right:    $this.css('right'),
                            bottom:   $this.css('bottom') }; 

         $window.scroll(function () { //called often, must be efficient 
            var shouldBeFixed = $window.scrollTop() > swapPos;
            if (shouldBeFixed && !fixed) {
               fixed = true;
               $this.css(fixedCSS);
            } else if (!shouldBeFixed && fixed) {
               fixed = false;
               $this.css(absoluteCSS);
            }
         })
      })
   };
})( jQuery );
