$(function(){
  $(".nav li").click(function(){
    // .nav liに対応するボタンをクリックすると、
    const clickedIndex = $(".nav li").index(this);
    // 変数を宣言、代入。引数にthisを指定し、クリックした順番を変数に格納。
    $(".description li").addClass("is-hidden");
    // .description liのボタンを押すとクラス名is-hiddenが付与。
    $(".description li").eq(clickedIndex).removeClass
    // eq()メソッドのパラメータにインデックスを指定することで指定した位置の要素を指定することができます。index()の引数にthisを指定すれば、クリックした要素の順番が取得できます。クリックしてis-hiddenが削除されたものが表示されます。
    ("is-hidden");
  })
});







// $(function(){
  // $(".nav li").click(function(){
    // .nav liに対応するボタンをクリックすると、
    // var a = $(".nav li").index(this);
    // 変数を宣言、代入。引数にthisを指定し、クリックした順番を変数に格納。
    // $(".description li").addClass("is-hidden");
    // .description liのボタンを押すとクラス名is-hiddenが付与。
    // $(".description li").eq(a).removeClass("is-hidden");
    // eq()メソッドのパラメータにインデックスを指定することで指定した位置の要素を指定することができます。index()の引数にthisを指定すれば、クリックした要素の順番が取得できます。クリックしてis-hiddenが削除されたものが表示されます。
  // })
// });







// .is-hidden {
  // display: none;
  /* cssでページA~Eを全て隠す役割を持っている。 */
// }
