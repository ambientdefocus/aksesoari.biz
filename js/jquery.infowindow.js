(function($) {
  var infowindows = [];
  function InfoWindow(opts) {
    this.isOpen = false;
    this.customLayer = $('<div id="customLayer">');
    if(opts.content){
      this.set('content',opts.content);
      $(opts.content).show();
      this.customLayer.append(opts.content);
    }
  }
  $.extend(InfoWindow.prototype, new google.maps.OverlayView(), {
    toggle : function(opts) {
      if(this.isOpen) {
        this.close();
      } else {
        this.open(opts);
      }
    },
    
    open : function(opts){
      $(infowindows).each(function() {
        this.isOpen = false;
      });
      if (opts.marker) {
        this.set('marker',opts.marker);
        this.bindTo('anchorPoint', this.marker);
        this.bindTo('position', this.marker);
      }
      this.setValues(opts);
      this.isOpen = true;
      if (!this.disableAutoPan) {
        var that = this;
        window.setTimeout(function() {
          that.panToView();
        }, 200);
      }
    },
    
    close : function(){
      $("#customLayer").remove();
      this.isOpen = false;
    },
    
    onAdd : function(){
      $("#customLayer").remove();
      var $Pane = $(this.getPanes().floatPane);
      $Pane.append(this.customLayer);
      
    },
    
    onRemove : function(){
      $("#customLayer").remove();
    },
    
    draw : function(){
      var projection = this.getProjection();

      if (!projection) {
        return;
      }
      
      var latLng = (this.get('position'));
      if (!latLng) {
        this.close();
        return;
      }
      var height = this.content.offsetHeight;
      var pos = projection.fromLatLngToDivPixel(latLng);
      var top = pos.y - height - this.iconHeight - this.arrowHeight;
      var left = pos.x - this.arrowLeft - this.arrowWidth/2;
      this.content.style['top'] = this.px(top);
      this.content.style['left'] = this.px(left);
    },
    
    panToView : function() {
      var projection = this.getProjection();

      if (!projection) {
        return;
      }

      if (!this.content) {
        return;
      }

      var height = this.content.offsetHeight + this.arrowHeight;
      var mapDiv = this.map.getDiv();
      var mapHeight = mapDiv.offsetHeight;

      var latLng = this.get('position');
      var centerPos = projection.fromLatLngToContainerPixel(this.map.getCenter());
      var pos = projection.fromLatLngToContainerPixel(latLng);

      var spaceTop = centerPos.y - height;

      var spaceBottom = mapHeight - centerPos.y;

      var needsTop = spaceTop < 0;
      var deltaY = 0;

      if (needsTop) {
        spaceTop *= -1;
        deltaY = (spaceTop + spaceBottom) / 2;
      }

      pos.y -= deltaY;
      latLng = projection.fromContainerPixelToLatLng(pos);
      if (map.getCenter() != latLng) {
        this.map.panTo(latLng);
      }
    },
    
    anchorPoint_changed : function() {
      this.draw();
    },
    
    position_changed : function() {
      this.draw();
    },
    
    px : function(num){
      if (num) {
        return num + 'px';
      }
      return num;
    }
    
  });
  
  
  $.fn.infowindow = function(options) {
    var opts = $.extend({}, $.fn.infowindow.defaults, options);
    
    return this.each(function() {
      opts.content = $(this).clone()[0];
      var infowindow = new InfoWindow(opts);
      infowindows.push(infowindow);
      if(opts.showOn) {
        google.maps.event.addListener(opts.marker, opts.showOn, function() {
          infowindow.toggle(opts);
        });
      }
    });
  };
  $.fn.infowindow.defaults = {
      disableAutoPan: false,
      iconHeight: 34,
      arrowHeight: 0,
      arrowWidth: 0,
      arrowLeft: 0,
      showOn: 'click'
  };
  function debug($obj) {
    if (window.console && window.console.log)
      window.console.log($obj);
  };
})(jQuery);