$(function ()
    { $(".select-box").on("change", function () 
    // .select-boxの中のものを選ぶと変更すると下記の作業が表示される。
        { var b = $(this).val(), c = $(".food-list li"); 
        // 変数でbはthisよりvalによりHTMLタグ内に記述されているvalue属性を取得したり変更する。
        // ※cは.food-listのliのタグ全てを指す。
          "all" === b ? c.show() : $.each(c, function (e, a) 
          // allのタグがb以降と厳密に等しい。比較条件がb.
          // c(.food-list li).show(要素を表示状態にするメソッド)はtrueで.food-list liは全て表示される。
          // .each(c, function (e, a) は下記の内容が繰り返されて表示されます。
          // ※show(要素を表示状態にするメソッド)
          // ※eachは「HTML要素・配列・オブジェクトなどに対して繰り返し処理を行うメソッド」
          { var d = $(a).data("category-type"); b === d ? $(a).show() : $(a).hide() 
          // 変数でdはaでdata("category-type")で取得したものになる。
          // ※dataはHTML要素内に付与されたdata属性に対して、取得・設定・変更ができる。
          // bとdは厳密に等しい。比較条件がb。
          // (a).show()で取得したaのcategory-type同じなら表示。
          // $(a).hide() 取得したaのcategory-type同じな隠れる。
          }) 
        }) 
    });