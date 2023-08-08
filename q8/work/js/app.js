$(function() {
  let searchLog = ""; // 検索ワードの履歴を保存する変数
  let currentPage = 1; // 現在表示中のページ番号を保存する変数
  const itemsPerPage = 20; // 1ページあたりの件数

  // 検索エラー処理を行う関数
  function handleSearchFailure(jqXHR) {
    $(".lists").empty(); // 検索結果の表示領域をクリア
    $(".message").remove(); // メッセージエリアをクリア

    if (jqXHR.status === 0) {
      $(".lists").before('<div class="message">検索ワードを入力してください。</div>');// 検索ワードが未入力の場合のエラーメッセージ
    } else if (jqXHR.status === 400) {
      $(".lists").before('<div class="message">エラー：サーバーに接続できません。</div>');// サーバーへの接続エラーの場合のエラーメッセー
    } else {
      $(".lists").before('<div class="message">予期せぬエラーが発生しました。再度試してください。</div>'); // その他のエラーの場合のエラーメッセージ
    }
  }

  // 検索成功時の処理を行う関数
  function success(response) {
    const data = response["@graph"][0];

    if (data["opensearch:totalResults"] != 0) {
      $(".message").remove(); // 検索結果がある場合、メッセージを削除
      data.items.map((book) => {
        // 書籍情報の取得と表示
        const title = book.title ? book.title : "不明";
        const author = book["dc:creator"] ? book["dc:creator"] : "作者不明";
        const publisher = book["dc:publisher"] ? book["dc:publisher"][0] : "不明";
        const listItemHTML = `<li class="lists-item"><div class="list-inner"><p>タイトル：${title}</p><p>作者：${author}</p><p>出版社：${publisher}</p><a href="${book.link["@id"]}" target="_blank">書籍情報</a></div></li>`;
        $(".lists").prepend(listItemHTML);
      });
      currentPage++; 
    } else {
      $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>');
    }
  }

  // 検索ボタンのクリックイベント
  $(".search-btn").on("click", function() {
    const searchWord = $("#search-input").val().trim();

    // 新しい検索ワードの場合はページ番号をリセット
    if (searchWord !== searchLog) {
      currentPage = 1;
      searchLog = searchWord;
      $(".lists").empty(); // 検索結果表示エリアをクリア
    }

    // 検索実行
    $.ajax({
      type: "GET",
      url: "https://ci.nii.ac.jp/books/opensearch/search",
      data: {
        title: searchWord,
        format: "json",
        count: itemsPerPage, // count パラメーターを追加
        p: currentPage,
        
      }
    })
      .done(function(response) {
        success(response); // 検索成功時の処理を実行
      })
      .fail(function(jqXHR) {
        handleSearchFailure(jqXHR); // 検索エラー時の処理を実行
      });
  });

  // リセットボタンのクリックイベント
  $(".reset-btn").on("click", function() {
    $(".lists").empty(); // 検索結果表示エリアをクリア
    $(".message").remove(); // メッセージエリアをクリア
    $("#search-input").val(""); // 検索ワード入力欄をクリア
    searchLog = ""; // 検索ワード履歴をクリア
    currentPage = 1; // ページ番号をリセット
  });
});