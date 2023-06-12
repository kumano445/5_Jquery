$(function() {
  $(".search-btn").on("click", function(){
    var searchWord = $("#search-input").val();
    var pageCount = 1;

    var settings = {
      url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      method: "GET",
    };

    $(".message").text(""); // メッセージを初期化

    $.ajax(settings)
      .done(function(response) {
        if (books.length > 0) {
  $.each(books, function(index, book) {
    var title = book["dc:title"] ? book["dc:title"] : "不明";
    var author = book["dc:creator"] ? book["dc:creator"] : "不明";
    var publisher = book["dc:publisher"] ? book["dc:publisher"] : "不明";

    var listItem = $("<li>").text(`タイトル: ${title}, 作者: ${author}, 出版社: ${publisher}`);
    $(".lists").append(listItem);
  });
} else {
  $(".lists").empty();
  $(".message").text("検索結果が見つかりませんでした。別のキーワードで検索してください。");
}
        // 検索成功時の処理
        $(".lists").empty(); // 検索結果を初期化

        if (response["@graph"]) {
          // @graphは、JSON-LD形式でデータが表現されている場合に使用されるキーワード。
          var books = response["@graph"];

          if (books.length > 0) {
            $.each(books, function(index, book) {
              var title = book["dc:title"] ? book["dc:title"] : "不明";
              var author = book["dc:creator"] ? book["dc:creator"] : "不明";
              var publisher = book["dc:publisher"] ? book["dc:publisher"] : "不明";
          
              var listItem = $("<li>").text(`タイトル: ${title}, 作者: ${author}, 出版社: ${publisher}`);
              $(".lists").append(listItem);
            });
          } else {
            $(".lists").empty();
            $(".message").text("検索結果が見つかりませんでした。別のキーワードで検索してください。");
          }
        } 
      })
      .fail(function(err) {
        // 検索失敗時の処理
        $(".message").text("検索結果が見つかりませんでした。別のキーワードで検索してください。");
      });
  });

  $(".reset-btn").on("click", function() {
    $(".lists").empty(); // 検索結果を初期化
    $(".message").text(""); // メッセージを初期化
    $("#search-input").val(""); // 検索ワードをクリア
  });
});

// 変数settingsに設定情報などを格納
// const settings = {
  // 実行するURL。実行するURLのことをエンドポイントと言います。
  // url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
  // サーバーに送るメソッド。GETは情報を取得したい場合のメソッド。
  // "method": "GET",
  // }

  // Ajaxの実行
  //.doneが通信成功した時の処理、”response”が引数となっていて通信した結果を受け取っている
  // messageエラー発生時にエラーメッセージが表示されるフィールド。
  // $(".search-btn").on("click", function(){
    // $("#search-input"). val();
  // })
  // $(".message")
  // $.ajax(settings).done(function (response) {

      // メモ：タイトルtitle	 作者(著作)dc:creator	出版社dc:publisher　書籍情報link
  // メモ：itemsレスポンスに含まれる図書・雑誌へのパーマリンクを列挙。最大でopensearch:itemsPerPageの数まで繰り返す。


  //.failが通信に失敗した時の処理、”err”にサーバーから送られてきたエラー内容を受け取っている。
  // }).fail(function (err) {
    //メモ：三項演算子 条件式 ? trueの処理 : falseの処理　エラー内容を表示。
  // });

  // $(function() {
    // $(".reset-btn")
  // })

//考え方メモ
//① 検索ワードにキーワードを入力。
//②検索ボタンを押す。
// ③検索結果にタイトル、作者、出版社の書籍情報が出る。
// ④リセットを押すと全て消える。
//⑤ 「？」などの検索が失敗すると「検索結果が見つかりませんでした。別のキーワードで検索して下さい。」が表示される。

