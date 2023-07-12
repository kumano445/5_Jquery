$(function() {
  let searchLog = ""; // ひとつ前の検索ワードを保持する変数
  let pageCount = 1; // ページカウントの初期値を設定
  let previousResults = []; // 過去の検索結果を保持する配列

  function handleSearchSuccess(response) {
    $(".message").remove();
    $(".lists").empty();

    if (response && response["@graph"] && response["@graph"][0].items) {
      const books = response["@graph"][0].items;
      previousResults = previousResults.concat(books); // 過去の検索結果に新しい結果を追加
      const displayedResults = previousResults.slice(0, pageCount * 20); // 表示する結果数を調整

      $.each(displayedResults, function(index, book) {
        const title = book.title ? book.title : "不明";
        const author = book["dc:creator"] ? book["dc:creator"] : "作者不明";
        const publisher = book["dc:publisher"] ? book["dc:publisher"][0] : "不明";
        const listItemHTML = `<li class="lists-item"><div class="list-inner"><p>タイトル：${title}</p><p>作者：${author}</p><p>出版社：${publisher}</p><a href="${book.link["@id"]}" target="_blank">書籍情報</a></div></li>`;
        $(".lists").prepend(listItemHTML);
      });
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
      console.error("HTTP Status:", jqXHR.status);
    } else if (jqXHR.status === 404) {
      $(".lists").before('<div class="message">ページが見つかりません。</div>');
      console.error("HTTP Status:", jqXHR.status);
    } else {
      $(".lists").before('<div class="message">ネットワークエラーが発生しました。再度試してください。</div>');
      console.error("HTTP Status:", jqXHR.status);
    }
  }

  $(".search-btn").on("click", function() {
    const searchWord = $("#search-input").val();

    if (searchWord.trim() !== "") {
      $(".lists").empty();
      if (searchWord !== searchLog) {
        pageCount = 1;
        previousResults = []; // 新しい検索ワードが入力された場合は前回の検索結果をリセット
        searchLog = searchWord;
      }
      $.ajax({
        type: "GET",
        url: "https://ci.nii.ac.jp/books/opensearch/search",
        data: {
          title: searchWord,
          format: "json",
          p: pageCount,
          count: 20
        }
      })
        .done(function(response) {
          handleSearchSuccess(response);
          pageCount++;
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
    searchLog = "";
    pageCount = 1;
    previousResults = [];
  });
});
