$(function() {
  function handleSearchSuccess(response) {
    $(".message").remove();
    $(".lists").empty();

    if (response && response["@graph"] && response["@graph"][0]["items"]) {
      const books = response["@graph"][0]["items"];
      $.each(books, function(index, book) {
        const title = book.title ? book.title : "不明";
        const author = book["dc:creator"] ? book["dc:creator"] : "不明";
        const publisher = book["dc:publisher"] ? book["dc:publisher"][0] : "不明";
        const listItemHTML = '<li class="lists-item"><div class="list-inner"><p>タイトル：' + (title ? title : "不明") + '</p><p>作者：' + (author ? author : "不明") + '</p><p>出版社：' + (publisher ? publisher : "不明") + '</p><a href="' + (book.link["@id"] + '" target="_blank">書籍情報</a></div></li>');
        $(".lists").prepend(listItemHTML);
      });
    } else {
      $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>');
    }
  }

  function handleSearchFailure() {
    $(".lists").empty();
    $(".message").remove();
    $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>');
  }

  $(".search-btn").on("click", function() {
    const searchWord = $("#search-input").val();

    if (searchWord) {
      $(".lists").empty();
      $.ajax({
        url: "https://ci.nii.ac.jp/books/opensearch/search",
        method: "GET",
        data: {
          title: searchWord,
          format: "json",
          p: 2,
          count: 20
        }
      })
      .done(function(response) {
        handleSearchSuccess(response);
      })
      .fail(function() {
        handleSearchFailure();
      });
    }
  });

  $(".reset-btn").on("click", function() {
    $(".lists").empty();
    $(".message").remove();
    $("#search-input").val("");
  });
});
