$(function(){
  $(".drawer_button").click(function(){
    // .drawer_buttonをクリックすると
    $(this).toggleClass("active");
    // .toggleClass()は、要素に「指定のクラスがあれば削除して、無ければ付ける」事ができるメソッド。そのためthisである.drawer_button"をクリックすると.drawer_button"にクラス名active"が付与される。
    $(".drawer_bg").fadeToggle();
    // fadeToggleはフェードイン、フェードアウトを交互に行うメソッド。上記のボタンをクリックすることで表示されたりされなかったりする。
    $("nav").toggleClass("open")
    // .drawer_buttonをクリックするとnavにクラス名openが付与。
  });
  $(".drawer_bg").click(function(){
    // .drawer_bgをクリックすると
    $(this).hide();
    // thisであるdrawer_bg"が隠れる。
    $(".drawer_button").removeClass("active");
    // .drawer_buttonのクラス名activeが削除。
    $("nav").removeClass("open")
    // navにクラス名openが削除。
  })
});
  
