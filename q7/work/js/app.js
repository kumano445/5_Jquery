$(function(){
  $(".btn__submit").on("click", function() {
    console.log("名字");
  //文字を入力すると「名字」が表示される。
  console.log($("#family__name").val());
  // valによりHTMLタグ内に記述されているvalue属性を取得したり変更できます。
  console.log("名前");
  // 文字を入力すると「名前」が表示される。
  console.log($("#given__name").val());
  // valによりHTMLタグ内に記述されているvalue属性を取得したり変更できます。
  console.log("生年月日");
  // 文字を入力すると「生年月日」が表示される。
  console.log($(".year").val() + "年" + $(".month").val() + "月" + $(".day").val() + "日");
  // valによりHTMLタグ内に記述されているvalue属性を取得したり変更できます。
  console.log("性別");
  // 文字を入力すると「性別」が表示される。
  console.log($('[name="gender"]:checked').val());
  // name="genderでチェックボックスがクリックされる度に、チェックの入っているボックスの数を取得して表示します。
  // valはname="genderのvalによりHTMLタグ内に記述されているvalue属性を取得。
  console.log("職業");
  // 文字を入力すると「職業」が表示される。
  console.log($(".occupation").val());
  // valによりHTMLタグ内に記述されているvalue属性を取得したり変更できます。
  console.log("アカウント名");
  // 文字を入力すると「アカウント名」が表示される。
  console.log($("#account__name").val());
  // valによりHTMLタグ内に記述されているvalue属性を取得したり変更できます。
  console.log("メールアドレス");
    // 文字を入力すると「メールアドレス」が表示される。
  console.log($("#email").val());
  // valによりHTMLタグ内に記述されているvalue属性を取得したり変更できます。
  console.log("パスワード");
  // 文字を入力すると「パスワード」が表示される。
  console.log($("#password").val());
  // valによりHTMLタグ内に記述されているvalue属性を取得したり変更できます。
  console.log("確認用パスワード");
  // 文字を入力すると「確認用パスワード」が表示される。
  console.log($("#duplication__password").val());
  // valによりHTMLタグ内に記述されているvalue属性を取得したり変更できます。
  console.log("住所");
  // 文字を入力すると「住所」が表示される。
  console.log($("#address").val());
  // valによりHTMLタグ内に記述されているvalue属性を取得したり変更できます。
  console.log("電話番号");
  // 文字を入力すると「電話番号」が表示される。
  console.log($("#tel").val());
  // valによりHTMLタグ内に記述されているvalue属性を取得したり変更できます。
  console.log("購読情報");
  // 文字を入力すると「購読情報」が表示される。
  $('[name="subscription"]:checked').each(function() {
      console.log($(this).val())
      // name="subscription"でチェックボックスがクリックされる度に、チェックの入っているボックスの数を取得して表示します。
      // valによりHTMLタグ内に記述されているvalue属性を取得したり変更できます。
  })
})
});