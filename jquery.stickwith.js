/* Stick With takes absolutely positioned elements and changes them to 
 *   fixed position elements before they are about to scroll off the top
 *   of the page. When the user scrolls back up they become absolutely
 *   positioned again.
 * Options: top - the minimum number of pixels the element should
 *                stay away from the top of the viewport. */
(function ( $ ) {
   $.fn.stickWith = function ( options ) {
      
      var settings = $.extend({
         top: 0,   // css top property. used when element's position is fixed
      }, options);
      
      return this.each(function () {
         var $this    = $( this );
         var $window  = $( window );

	 // number of pixels down the page we should change to fixed position
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

         $window.scroll(function () {  //called often, must be efficient 
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
