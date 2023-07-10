$(function() {
  let searchLog = ""; // ひとつ前の検索ワードを保持する変数
  let pageCount = 1; // ページカウントの初期値を設定
  let searchResults = []; // 検索結果を保持する配列

  function handleSearchSuccess(response) {
    $(".message").remove();

    if (response && response["@graph"] && response["@graph"][0].items) {
      const books = response["@graph"][0].items;

    if (pageCount === 1) {
      $(".lists").empty();
      searchResults = []; // 検索結果をリセット
    }

      $.each(books, function(index, book) {
        const title = book.title ? book.title : "不明";
        const author = book["dc:creator"] ? book["dc:creator"] : "作者不明";
        const publisher = book["dc:publisher"] ? book["dc:publisher"][0] : "不明";
        const listItemHTML = `<li class="lists-item"><div class="list-inner"><p>タイトル：${title}</p><p>作者：${author}</p><p>出版社：${publisher}</p><a href="${book.link["@id"]}" target="_blank">書籍情報</a></div></li>`;
        $(".lists").prepend(listItemHTML);
        searchResults.push(book); // 検索結果を配列に追加
      });
    if (books.length === 20) {
      const loadMoreButton = '<button class="load-more-btn">もっと表示</button>';
      $(".lists").append(loadMoreButton);
    }
    } else {
      $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>');
    }
  }

  function handleSearchFailure(jqXHR) {
    $(".lists").empty();
    $(".message").remove();
    console.log(jqXHR.status);
    if (jqXHR.status === 0) {
      $(".lists").before('<div class="message">正常に通信できませんでした。インターネットの接続を確認してください。</div>');
    } else if (jqXHR.status === 400) {
      $(".message").remove();
      $(".lists").before('<div class="message">リクエストされたページが見つかりません。</div>');
    } else if (jqXHR.status === 404) {
      $(".message").remove();
      $(".lists").before('<div class="message">ページが見つかりません。</div>');
    } else {
      $(".message").remove();
      $(".lists").before('<div class="message">ネットワークエラーが発生しました。再度試してください。</div>');
    }
  }

  $(".search-btn").on("click", function() {
    const searchWord = $("#search-input").val();

    if (searchWord) {
      $(".lists").empty();
      if (searchWord === searchLog) {
        pageCount++;
      } else {
        pageCount = 1;
        searchLog = searchWord;
      }
      $(document).on("click", ".load-more-btn", function() {
        pageCount++;
        const searchWord = $("#search-input").val();
      $.ajax({
        url: "https://ci.nii.ac.jp/books/opensearch/search",
        method: "GET",
        data: {
          title: searchWord,
          format: "json",
          p: pageCount,
          count: 20
        }
      })
      .done(function(response) {
        handleSearchSuccess(response);
      })
      .fail(function(jqXHR) {
        handleSearchFailure(jqXHR);
      });
    } else {
      $(".lists").empty();
      $(".message").remove();
      $(".lists").before('<div class="message">検索ワードを入力してください。</div>');
    }
  });

  $(".reset-btn").on("click", function() {
    $(".lists").empty();
    $(".message").remove();
    $("#search-input").val("");
    searchResults = []; // 検索結果をクリア
  });
});
