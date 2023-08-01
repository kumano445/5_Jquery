$(function() {
  let searchLog = "";
  let currentPage = 1;

  function handleSearchFailure(jqXHR) {
    $(".lists").empty();
    $(".message").remove();

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

  function success(response) {
    const data = response["@graph"][0];
    $(".message").remove();
    if (data["opensearch:totalResults"] !== 0) {
      const currentPageItems = data.items.slice((currentPage - 1) * 20, currentPage * 20);
      displayResults(currentPageItems);
    } else {
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
        count: currentPage * 20,
      }
    })
      .done(function(response) {
        success(response);
        currentPage++;
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
