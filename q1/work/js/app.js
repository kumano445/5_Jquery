$(function() {
　$("#q1").css("color", "green");
  //id=q1のものに対し、.cssはCSS値を取得or書き換える。"color"は文字の色、"green"は文字の色を緑に変える。

　$("#q2").on("click", function() {
      // id=q2に対し、ボタンをクリックすると動作が変わる。
    $(this).css("background", "pink")
      // thisはidを取得しているので、q2のことになる。.cssはCSS値を取得or書き換える。先ほどのボタンをクリックすると動作が変わるのはbackgroundの色がピンクに変わります。
　});


　$("#q3").on("click", function() {
    // id="q3"のボタンをクリックすると下記の動作をする。
　　$(this).fadeOut(3000)
    // thisはidを取得しているので、q3のことになる。q3をクリックするとfadeOutフェードアウトが３秒間の間にされる。3000は3X10の3乗のことを表し、3秒となる。
　});
　$("#q4").on("click", function() {
    // id="q4"のボタンをクリックすると下記の動作をする。
    $(this).addClass("large")
    // thisはidを取得しているので、q4にことになる。q4をクリックすると大きくなる。addClassは属性を追加するコード。largeは大きくなるという意味のためクリックするとボタンが大きくなる。
　});
　$("#q5").on("click", function() {
        // id="q5"のボタンをクリックすると下記の動作をする。
    $(this).prepend("DOMの中の前").append
    ("DOMの中の後").before("DOMの前").after
    ("DOMの後")
        // thisはidを取得しているので、q5のことになる。q5クリックすると文字が追加されす。prependは対象要素内の先頭に要素を追加するメソッド。appendは指定した子要素の最後にテキスト文字やHTML要素を追加することができるメソッド。beforeは対象の要素外の先頭に任意のHTML要素を追加することができるメソッド。afterは対象とする「要素外」への追加ができるメソッド。
　});
　$("#q6").on("click", function() {
    // id="q6"のボタンをクリックすると下記の動作をする。
    $(this).animate({
    "margin-top": 100,
    "margin-left": 100
    }, 2000)
        // thisはidを取得しているので、q6のことになる。q6クリックすると上が100px、左に100pxの間隔をあけながらアニメーションで2秒かけて動く。animateは特定のHTML要素のCSSプロパティを連続して変化させることでアニメーションを実現する。クリックすると"margin-top": 100,と"margin-left": 100の間隔が開くような動きをする。2E3は2X10の3乗になるため2000になる。2000は2秒を表すため2秒かけて"margin-top": 100,と"margin-left": 100の間隔が開くような動きをする。
　});
　$("#q7").on("click", function() {
        // id="7"のボタンをクリックすると下記の動作をする。
    console.log(this)
        // thisはidを取得しているので、q7のことになる。q7クリックするとコンソールにidのノードが表示される。console.log()は任意の値を出力する。thisはq7のことになるためクリックをするとidのノードが出力される。
　});
　$("#q8").on({
    mouseenter: function() {
        // mouseenterはマウスが対象の要素に乗ったときに発生するイベント。
    　$(this).addClass("large")
            // thisはidを取得しているので、q8にことになる。q8のボタンの上にマウスを乗せるとすると大きくなる。addClassは属性を追加するコード。largeは大きくなるという意味のためクリックするとボタンが大きくなる。
    },
    mouseleave: function() {
        // mouseenterはマウスが対象の要素に乗ったときに発生するイベント。
    　$(this).removeClass("large")
             // thisはidを取得しているので、q8にことになる。q8のボタンの上にマウスを乗せるとすると大きくなっていたのがなくなる。removeClassはHTML要素の「class属性」に付与されたクラスを削除するメソッド。largeは大きくなるという意味のため、この場合マウスがボタンから外れると大きくなくなる。
    }
　});
　$("#q9 li").on("click", function() {
        // id="9 li"のボタンをクリックすると下記の動作をする。
    alert($(this).index())
        // thisはidを取得しているので、q9 liのにことになる。index() は特定の要素のインデックス番号を取得することができるメソッド。複数の要素に対してインデックス番号に応じて処理を分岐させたい場合に使います。
        // 引数に指定した this はクリックされたオブジェクトが代入されおり、index() はクリックされた要素#q9 liを持つリストの何番目にあるのかを返されます。
　});
　$("#q10 li").on("click", function() {
        // id="10 li"のボタンをクリックすると下記の動作をする。
    var indexClicked = $(this).index();
        // varは変数を宣言し、$(this).index();を代入している。
        // thisはidを取得しているので、q10 liのにことになる。index() は特定の要素のインデックス番号を取得することができるメソッド。複数の要素に対してインデックス番号に応じて処理を分岐させたい場合に使います。
        console.log($("#q11 li").eq(indexClicked));
        // 「eq()」は、複数のHTML要素の中からインデックス番号を指定することで特定の要素だけを取得できる。
　　$("#q11 li").eq(indexClicked).addClass("large-text");
        // aがq10 liの要素の数を取得しています。10 liのボタンをクリックするとaddClassは属性を追加するのでlarge-textはテキストが大きくなるので、#q11 liの文字が大きくなります。
　})
});
