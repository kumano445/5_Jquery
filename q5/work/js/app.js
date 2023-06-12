$(function() {
  $(".dropdwn li").hover(function() {
    // dropdwn liにマウスカーソルが重なった時の処理
    $(this).children("ul").stop().slideDown() 
    // 子要素であるul指定、stopは引数なしで利用すると、現在再生しているアニメを停止し次のアニメを実行するのでslideDownは隠れている要素を縦方向に拡大して表示したままになる。
  }, function() {
    // dropdwn liにマウスカーソルが離れた時の処理
      $(this).children("ul").stop().slideUp()
      // 子要素であるul指定、stopは引数なしで利用すると、現在再生しているアニメを停止し次のアニメを実行するのでslideDownは要素を縦方向に縮小して隠す。
  })
});
