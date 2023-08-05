$(function() {
  let searchLog = ""; // 検索ワードの履歴を保存する変数
  let currentPage = 1; // 現在表示中のページ番号を保存する変数

  function handleSearchFailure(jqXHR) {
    $(".lists").empty(); // 検索結果の表示領域をクリア
    $(".message").remove(); // メッセージエリアをクリア

    if (jqXHR.status === 0) {
      $(".lists").before('<div class="message">検索ワードを入力してください。</div>');
    } else if (jqXHR.status === 400) {
      $(".lists").before('<div class="message">エラー：サーバーに接続できません。</div>');
    } else {
      $(".lists").before('<div class="message">予期せぬエラーが発生しました。再度試してください。</div>');
    }
  }

  function displayResults(results) {
    $.each(results, function(index, book) {
      const title = book.title ? book.title : "不明";
      const author = book["dc:creator"] ? book["dc:creator"] : "作者不明";
      const publisher = book["dc:publisher"] ? book["dc:publisher"][0] : "不明";
      const listItemHTML = `<li class="lists-item"><div class="list-inner"><p>タイトル：${title}</p><p>作者：${author}</p><p>出版社：${publisher}</p><a href="${book.link["@id"]}" target="_blank">書籍情報</a></div></li>`;
      $(".lists").append(listItemHTML);
    });
  }

   // 検索成功時の処理を行う関数
  function success(response) {
    const data = response["@graph"][0];

    if (data["opensearch:totalResults"] != 0) {
      $(".message").remove(); // 検索結果がある場合、メッセージを削除
      data.items.map((book)=>{
        // 書籍情報の取得と表示
        const title = book.title ? book.title : "不明";
        const author = book["dc:creator"] ? book["dc:creator"] : "作者不明";
        const publisher = book["dc:publisher"] ? book["dc:publisher"][0] : "不明";
        const listItemHTML = `<li class="lists-item"><div class="list-inner"><p>タイトル：${title}</p><p>作者：${author}</p><p>出版社：${publisher}</p><a href="${book.link["@id"]}" target="_blank">書籍情報</a></div></li>`;
        $(".lists").prepend(listItemHTML);
      })
      currentPage++; 
    }else {
      $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>');
    }
  }

  $(".search-btn").on("click", function() {
    const searchWord = $("#search-input").val().trim();

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
      }
    })
      .done(function(response) {
        success(response);
      })
      .fail(function(jqXHR) {
        handleSearchFailure(jqXHR);
      });
  });

  $(".reset-btn").on("click", function() {
    $(".lists").empty();
    $(".message").remove();
    $("#search-input").val("");
    searchLog = "";
    currentPage = 1;
  });
});