class Poster {
  constructor(Poster) {
    let self = this;
    this.Poster = Poster;
    this.posterList = Poster.find(".poster-list");
    this.posterItems = Poster.find(".poster-item");
    this.firstPosterItem = this.posterItems.first();
    this.lastPosterItem = this.posterItems.last();
    this.prevBtn = this.Poster.find(".poster-prev-btn");
    this.nextBtn = this.Poster.find(".poster-next-btn");
    this.setting = {
        "width":"760", // 轮播图宽度(比如此例子为三张图片可视区域宽度)
        "height":"248", // 轮播图高度(比如此例子为三张图片可视区域高度)
        "posterWidth":"610", // 当前图片宽度
        "posterHeight":"248", // 当前图片高度
        "scale":"0.8", // 非当前图片缩放比例
        "speed":"1000", // 动画时长
        "isAutoplay":"true", // 是否自动播放
        "dealy":"1000" // 切换间隔
    }
    $.extend(this.setting,this.getSetting())
    this.setFirstPosition();
    this.setSlicePosition();
    this.rotateFlag = true;
    this.prevBtn.bind("click",function(){
        if(self.rotateFlag){
            self.rotateFlag = false;
            self.rotateAnimate("left")
        }
    });
    this.nextBtn.bind("click",function(){
        if(self.rotateFlag){
            self.rotateFlag = false;
            self.rotateAnimate("right")
        }
    });
    if(this.setting.isAutoplay){
        this.autoPlay();
        this.Poster.hover(function(){clearInterval(self.timer)},function(){self.autoPlay()})
    }
  }
  autoPlay () {
    this.prevBtn.click();
    let that = this;
    this.timer =  window.setInterval(function(){
        that.prevBtn.click();
    },that.setting.dealy)
  }
  rotateAnimate (type) {
      let that = this;
      let zIndexArr = [];
      if(type == "left"){
        this.posterItems.each(function(){
            let self = $(this),
            prev = $(this).next().get(0)?$(this).next():that.firstPosterItem,
            width = prev.css("width"),
            height = prev.css("height"),
            zIndex = prev.css("zIndex"),
            opacity = prev.css("opacity"),
            left = prev.css("left"),
            top = prev.css("top");
            if(top === '0px') { // 切换图片时记录当前图片href设置到固定框href
              $('.j-curr-poster-item').attr('href', self.attr('href'))
            }
            zIndexArr.push(zIndex);
            self.animate({
                "width":width,
                "height":height,
                "left":left,
                "opacity":opacity,
                "top":top,
            },that.setting.speed,function(){
                that.rotateFlag = true;
            });
        });
        this.posterItems.each(function(i){
            $(this).css("zIndex",zIndexArr[i]);
        });
      }
      if(type == "right"){
        this.posterItems.each(function(){
            let self = $(this),
            next = $(this).prev().get(0)?$(this).prev():that.lastPosterItem,
                width = next.css("width"),
                height = next.css("height"),
                zIndex = next.css("zIndex"),
                opacity = next.css("opacity"),
                left = next.css("left"),
                top = next.css("top");
                if(top === '0px') { // 切换图片时记录当前图片href设置到固定框href
                  $('.j-curr-poster-item').attr('href', self.attr('href'))
                }
                zIndexArr.push(zIndex);
            self.animate({
                "width":width,
                "height":height,
                "left":left,
                "opacity":opacity,
                "top":top,
            },that.setting.speed,function(){
                that.rotateFlag = true;
            });
        });
        this.posterItems.each(function(i){
            $(this).css("zIndex",zIndexArr[i]);
        });
      }
  }
  setFirstPosition () {
      this.Poster.css({"width":this.setting.width,"height":this.setting.height});
      this.posterList.css({"width":this.setting.width,"height":this.setting.height});
      let width = (this.setting.width - this.setting.posterWidth) / 2;
      this.firstPosterItem.css({
          "width":this.setting.posterWidth,
          "height":this.setting.posterHeight,
          "left":width,
          "zIndex":Math.ceil(this.posterItems.size()/2),
          "top":this.setVertialType(this.setting.posterHeight)
      });
  }
  setSlicePosition () {
      let _self = this;
      let sliceItems = this.posterItems.slice(1),
          level = Math.floor(this.posterItems.length/2),
          leftItems = sliceItems.slice(0,level),
          rightItems = sliceItems.slice(level),
          posterWidth = this.setting.posterWidth,
          posterHeight = this.setting.posterHeight,
          Btnwidth = (this.setting.width - this.setting.posterWidth) / 2,
          gap = Btnwidth/level,
          containerWidth = this.setting.width;
      let i = 1;
      let leftWidth = posterWidth;
      let leftHeight = posterHeight;
      let zLoop1 = level;
      leftItems.each(function(index,item){
          leftWidth = posterWidth * _self.setting.scale;
          leftHeight = posterHeight*_self.setting.scale;
          $(this).css({
              "width":leftWidth,
              "height":leftHeight,
              "left": Btnwidth - i*gap,
              "zIndex":zLoop1--,
              "opacity": 0.8,
              "top":_self.setVertialType(leftHeight)
          });
          i++;
      });
      let j = level;
      let zLoop2 = 1;
      let rightWidth = posterWidth;
      let rightHeight = posterHeight;
      rightItems.each(function(index,item){
          let rightWidth = posterWidth * _self.setting.scale;
          let rightHeight = posterHeight*_self.setting.scale;
          $(this).css({
              "width":rightWidth,
              "height":rightHeight,
              "left": containerWidth -( Btnwidth - j*gap + rightWidth),
              "zIndex":zLoop2++,
              "opacity": 0.8,
              "top":_self.setVertialType(rightHeight)
          });
          j--;
      });
  }
  getSetting () {
      let settting = this.Poster.attr("data-setting");
      if(settting.length > 0){
          return $.parseJSON(settting);
      }else{
          return {};
      }
  }
  setVertialType (height) {
      let algin = this.setting.algin;
      if(algin == "top") {
          return 0
      }else if(algin == "middle"){
          return (this.setting.posterHeight - height) / 2
      }else if(algin == "bottom"){
          return this.setting.posterHeight - height
      }else {
          return (this.setting.posterHeight - height) / 2
      }
  }
}