$(function() {
  let searchLog = ""; // ひとつ前の検索ワードを保持する変数
  let pageCount = 1; // ページカウントの初期値を設定
  let displayedResults = []; // 表示する結果を保持する配列

  function handleSearchSuccess(response) {
    $(".message").remove();
    if (response && response["@graph"] && response["@graph"][0].items) {
      const books = response["@graph"][0].items;
      displayedResults = displayedResults.concat(books); // 新しい結果を表示配列に追加
      displayResults(displayedResults);
      const totalResults = displayedResults.length; // 結果の総件数を取得
      console.log("表示件数:", displayedResults.length, "件"); // 表示された件数をコンソールに出力
      console.log("総件数:", totalResults, "件"); // 総件数をコンソールに出力
    } else {
      $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>');
    }
  }

  function handleSearchFailure(jqXHR) {
    $(".lists").empty();
    $(".message").remove();
    if (jqXHR.status === 0) {
      $(".lists").before('<div class="message">予期せぬエラーが発生しました。再度試してください。</div>');
    } else {
      $(".lists").before(`<div class="message">HTTP Status: ${jqXHR.status}</div>`);
      console.error("HTTP Status:", jqXHR.status);
    }
  }

  function displayResults(results) {
    $(".lists").empty();
    $.each(results, function(index, book) {
      const title = book.title ? book.title : "不明";
      const author = book["dc:creator"] ? book["dc:creator"] : "作者不明";
      const publisher = book["dc:publisher"] ? book["dc:publisher"][0] : "不明";
      const listItemHTML = `<li class="lists-item"><div class="list-inner"><p>タイトル：${title}</p><p>作者：${author}</p><p>出版社：${publisher}</p><a href="${book.link["@id"]}" target="_blank">書籍情報</a></div></li>`;
      $(".lists").prepend(listItemHTML);
    });
  }

  $(".search-btn").on("click", function() {
    const searchWord = $("#search-input").val().trim();
    if (searchWord !== searchLog) {
      pageCount = 1;
      searchLog = searchWord;
      displayedResults = []; // 新しい検索ワードが入力された場合は表示結果配列をリセット
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
        console.error("Request failed:", jqXHR.status);
      });
  });

  $(".reset-btn").on("click", function() {
    $(".lists").empty();
    $(".message").remove();
    $("#search-input").val("");
    searchLog = "";
    pageCount = 1;
    displayedResults = [];
  });
});
