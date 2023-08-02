$(function() {
  // 変数の初期化
  let searchLog = ""; // 検索ワードの履歴を保存する変数
  let currentPage = 1; // 現在表示中のページ番号を保存する変数

  // サーバー接続エラー時の処理を行う関数
  function handleSearchFailure(jqXHR) {
    $(".lists").empty(); // 検索結果の表示領域をクリア
    $(".message").remove(); // メッセージエリアをクリア

     // エラーステータスに応じてメッセージを表示
    if (jqXHR.status === 0) {
      $(".lists").before('<div class="message">検索ワードを入力してください。</div>');// 検索ワードが未入力の場合のエラーメッセージ
    } else if (jqXHR.status === 400) {
      $(".lists").before('<div class="message">エラー：サーバーに接続できません。</div>');// サーバーへの接続エラーの場合のエラーメッセージ
    } else {
      $(".lists").before('<div class="message">予期せぬエラーが発生しました。再度試してください。</div>');// その他のエラーの場合のエラーメッセージ
    }
  }

  // 検索結果を表示する関数
  function displayResults(results) {
    $.each(results, function(index, book) {
      const title = book.title ? book.title : "不明";// タイトルがあれば表示、なければ"不明"を表示
      const author = book["dc:creator"] ? book["dc:creator"] : "作者不明";// 作者があれば表示、なければ"作者不明"を表示
      const publisher = book["dc:publisher"] ? book["dc:publisher"][0] : "不明";// 出版社があれば表示、なければ"不明"を表示
      const listItemHTML = `<li class="lists-item"><div class="list-inner"><p>タイトル：${title}</p><p>作者：${author}</p><p>出版社：${publisher}</p><a href="${book.link["@id"]}" target="_blank">書籍情報</a></div></li>`;// 書籍情報をHTMLとして構築
      $(".lists").append(listItemHTML); // 書籍情報を表示領域に追加
    });
  }

  // 検索成功時の処理を行う関数
  function success(response) {
    const data = response["@graph"][0];// レスポンスデータから検索結果を取得
    $(".message").remove(); // メッセージエリアをクリア
     // 検索結果の件数が0でなければ、該当ページの書籍情報を表示
    if (data["opensearch:totalResults"] !== 0) { 
      const currentPageItems = data.items.slice((currentPage - 1) * 20, currentPage * 20);// 表示するページの書籍情報を抽出
      displayResults(currentPageItems);// 書籍情報を表示する関数を呼び出し
    } else {
      $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>');// 検索結果が0の場合のエラーメッセージ
    }
  }

// 検索ボタンがクリックされた時の処理
  $(".search-btn").on("click", function() {
    const searchWord = $("#search-input").val().trim();// 入力された検索ワードを取得
    
    // 検索ワードが変更された場合、ページ番号と検索ワードの履歴をリセットし、表示領域をクリア

    // リクエストパラメータを設定して、サーバーに検索リクエストを送信
    if (searchWord !== searchLog) {
      currentPage = 1;
      searchLog = searchWord;
      $(".lists").empty();
    }

    $.ajax({
      type: "GET",
      url: "https://ci.nii.ac.jp/books/opensearch/search",
      data: {
        title: searchWord,
        format: "json",
        p: currentPage,
        count: currentPage * 20,
      }
    })
      .done(function(response) {
        success(response);// 検索成功時の処理を呼び出し
        currentPage++;// ページ番号を増加させる
      })
      .fail(function(jqXHR) {
        handleSearchFailure(jqXHR);// サーバーエラー時の処理を呼び出し
      });
  });

  // リセットボタンがクリックされた時の処理
  $(".reset-btn").on("click", function() {
    $(".lists").empty(); // 表示領域をクリア
    $(".message").remove(); // メッセージエリアをクリア
    $("#search-input").val(""); // 検索ボックスを空にする
    searchLog = ""; // 検索ワードの履歴をリセット
    currentPage = 1; // ページ番号をリセット
  });
});