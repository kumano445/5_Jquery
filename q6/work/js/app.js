$(".select-box").on("change", function() {
      // .select-boxの中のものを選ぶと変更すると下記の作業が表示される。
  var selectedValue = $(this).val();
      // 変数をしてしておりHTMLタグ内に記述されているvalue属性を取得したり変更する。
  var foodItems = $(".food-list li");
    if (selectedValue === "all") {
        // もしselectedValue とallは厳密に等しのなら
      foodItems.show();
        // show(要素を表示状態にするメソッド)はtrueで.food-list liは全て表示される。
    } else {
      $.each(foodItems, function(index, item) {
          // indexとitemは、$.each()関数内で使用される引数。
        var categoryType = $(item).data("category-type");
          // $(item).data("category-type")は、item要素から"data-category-type"属性の値を取得するのでそれぞれのカテゴリー要素を取得。
      if (selectedValue === categoryType) {
            // category-typeとselectedValueを比較し
        $(item).show();
            // 一致するなら呼び出して要素を表示。
      } else {
          $(item).hide();
             // 一致しないなら非表示。
        }
      });
    }
});
