$(function() {
  $(".modal_open_button").click(function() {
    // 対象modal_open_button(OPENボタン)のボタンをクリックすると
    $(".modal_win").fadeIn()
// モーダルウィンドウのをフェードインできます。
  });
  $(".modal_close_button").click(function() {
    // .modal_close_button（Xのボタン）をクリックすると
    $(".modal_win").fadeOut()
    // モーダルウィンドウのをフェードアウト(閉じる)ことができます。
  })
})