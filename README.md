# alba.A 公式ホームページ

## 01・OWNERの最終整理（2026年10月6日）

HTML・CSS・JavaScriptだけで動作する静的な1ページサイトです。既存の配色、共通タイポグラフィ、写真枠、予約導線を維持しています。

現在の構成は **HERO → 01 A MOMENT TO PAUSE → 02 ALBA.A STYLE → 03 REST, NIGHT & MORNING → 04 MENU → 05 VOICE → 06 OWNER → 07 SALON & ACCESS → 08 INSTAGRAM → RESERVATION** です。

01はPCで「左にラベル・見出し、右に本文」、スマートフォンで縦一列にしています。PCでは画面の高さに応じて一画面程度の上下余白を取り、本文と締めの間を56px空けています。スマートフォンの配置は維持しています。共感の本文を4行に絞り、締めの言葉はRESTのメッセージと同じ文字サイズです。独立したコンセプト紹介とその筆記体装飾は削除し、大切な思想をOWNERの文章へ統合しました。OWNERは「だからこそalba.Aが〜」の段落を削除し、思想と最後の呼びかけも通常本文と同じ文字に揃え、余白だけで区切っています。右下の署名は維持しています。

PC（1440px）・スマートフォン（375px）で最上部から最下部まで連続表示して確認しました。320 / 375 / 390 / 600 / 768 / 900 / 1024 / 1440 / 1920pxで横はみ出し、セクション番号、アンカーリンク、01の文字サイズの階層を検証しています。指定外の各セクションは、番号を除くHTMLと表示スタイルを変更前と照合しました。スマートフォン実機の確認は未実施です。

LINEは未設定です。正式URL設定後に実機で友だち追加先を確認してください。以前の検証で、テストURLの全CTAへの反映と外部タブへの遷移を確認していますが、実際のアカウントへの予約操作は行っていません。

## 最初に

`index.html` をブラウザーで開くと確認できます。写真・未確認情報はプレースホルダーです。実際の写真はまだ含まれていません。添付Instagramスクリーンショットは色・雰囲気と確認できるサロン情報の参考として使用し、デザイン案の人物・料金・口コミは転載していません。

LINE URLは未設定です。未設定時の予約ボタンはページ内の「準備中」案内へ移動します。本人確認済みURLを設定してから公開してください。JavaScriptを無効にした場合も本文とナビゲーションは表示され、Instagramからの確認案内を表示します。

## ファイル構成

```
alba-a/
├── index.html          ページの文章、構造、検索・SNS用設定
├── css/style.css       色、文字サイズ、余白、スマートフォン対応
├── js/config.js        LINE・InstagramのURL
├── js/script.js        ナビゲーション、URL反映、表示アニメーション
├── images/favicon.svg  仮の「a」アイコン。正式ロゴと交換可能
├── .nojekyll           GitHub Pagesでそのまま配信する設定
└── README.md           この説明書
```

## 写真の差し替え方法

1. 使用許可を確認した写真を `images` フォルダーに保存します。例：`hero.jpg`。半角英数字のファイル名がおすすめです。
2. `index.html` をテキストエディターで開き、「メインビジュアル」などのコメントを探します。
3. 対応する `photo-placeholder` の div 全体（中に入っている placeholder-label も含む）を以下のような img に置き換えます。直後の別セクションまで消さないようにしてください。

メイン写真の例：
```html
<img class="hero-photo" src="images/hero.jpg"
     alt="自然光が入るalba.Aのサロンでドライヘッドスパを行う様子"
     width="1000" height="1200" fetchpriority="high">
```

施術写真の例：
```html
<img class="spa-photo reveal" src="images/treatment.jpg"
     alt="頭をやさしくほぐすドライヘッドスパの施術風景"
     width="1200" height="1000" loading="lazy">
```

オーナー本人の写真は `class="portrait reveal"`、室内は `class="interior"` を引き継ぎます。altは実際の写真内容に合わせて変更してください。人物の顔が切れる場合はCSSに `object-position: 50% 30%;` のように指定して調整します。

REST, NIGHT & MORNINGの写真は `class="morning-photo reveal"` を引き継ぎ、夜・朝・休息を感じる、使用許可を確認した写真を使用してください。推奨は縦長1000×1200px程度です。写真はまだ提供されていないため、すべて差し替え枠のままです。

### お客様の声を差し替える方法

`index.html` の `id="voice"` が、独立したVOICEセクションです。`voice-list` の中に、画像と引用を一組にした `voice-entry` が2件あります。

1. 許可済みの手書きアンケート画像を `images/voice-01.jpg`、`images/voice-02.jpg` などの名前で保存します。
2. 該当する `photo-placeholder voice-photo` の div 全体を、`class="voice-photo"` を引き継いだ img に置き換えます。
3. 同じ `voice-entry` 内の `voice-quote` に、正確な原文から短く引用した文章を入れます。確認済みの引用を入れる際は、`<p class="voice-quote">` とその終了タグを `<blockquote class="voice-quote">` と `</blockquote>` に変更できます。意味を変えたり、新しい感想を作ったりしないでください。
4. 画像の名前・連絡先・その他の個人情報が公開されないよう、掲載範囲を本人と確認します。読みにくい画像だけにせず、引用はHTMLの文字として残します。
5. 3件目を追加する場合は `voice-entry` 全体を1件複製し、画像ファイル名・引用を変更します。余白を保つため、2〜3件程度を目安にしてください。

アンケート画像の例（幅と高さは実際の画像に合わせて変更）：

```html
<img class="voice-photo" src="images/voice-01.jpg"
     alt="掲載許可をいただいたお客様の手書きアンケート"
     width="1000" height="1200" loading="lazy">
```

アンケートの文字が切れないよう、画像のトリミングと読みやすさをPC・スマートフォンの両方で確認してください。VOICEにある「※お客様個人のご感想です。感じ方には個人差があります。」の注記は残します。

### 用意したい写真

|場所|写真候補|推奨サイズ・注意|
|---|---|---|
|HERO / `hero-photo`|自然光のある実際の施術風景、またはサロン室内|縦長1000×1200px程度。アーチの中で主役が切れない構図|
|ALBA.A STYLE / `spa-photo`|頭に触れる手元、施術中の様子|1200×1000px程度|
|REST, NIGHT & MORNING / `morning-photo`|夜・朝・休息を感じる写真|縦長1000×1200px程度。サロンの窓辺など|
|VOICE / `voice-photo`|掲載許可済みの手書きアンケート2件|文字を読める解像度。原文・引用・公開範囲を確認|
|OWNER / `portrait`|オーナーご本人の自然な表情|縦長900×1100px程度|
|SALON & ACCESS / `interior`|室内・施術ベッド|横長1200×700px程度。所在地を特定するものに注意|
|SNS共有用|使用許可のある代表写真|1200×630px程度|

JPEG・WebPなどを使用し、1枚200〜500KB程度を目安に軽くするとスマートフォンでも快適です。スクリーンショットや生成されたデザイン案を実際のサロン写真として掲載しないでください。

## テキスト変更方法

`index.html` 内の表示文を変更します。`[営業時間確認]` など、角括弧で囲んだ箇所を検索すると未確認の項目が見つかります。タグ（`<p>`や`</p>`など）は残して中の文章を変更してください。コースを増やす場合は `class="menu-item"` の article 全体をコピーし、見出しの `id` と記事の `aria-labelledby` を同じ新しい値に変更します。各記事は番号・時間（menu-meta）、名称・構成・料金（menu-summary）、説明（menu-description）に分かれています。

オーナーの想いは本人に確認し、名前・経歴・資格などは確認済みの内容だけを記載してください。口コミは実際に許可を得た原文だけを掲載し、未取得の口コミや効果は作成しないでください。Instagramの過去投稿をそのまま転載せず、サロンの考え方や個人の感想を、医学的効果の保証と混同しない表現を維持してください。現状の文面も公開前に本人に確認してください。Instagram画像にある「10月1日」は年・最新状況を確認できないため、公開日に関する確定情報としては掲載していません。

## LINE URL変更方法

`js/config.js` の空欄だけを変更します。

```js
window.ALBA_CONFIG = {
  lineUrl: "https://lin.ee/本人確認済みのID",
  instagramUrl: "https://www.instagram.com/dryheadspa_alba.a/"
};
```

上記のLINEは説明用です。本人から受け取った正しいURLに置き換えてください。HTTPSのURLを設定すると、ヘッダー・ファーストビュー・メニュー・最下部・スマートフォン固定ボタンにまとめて反映されます。すべて新しいタブで開きます。空欄や不正なURLは準備中表示になります。公開前にスマートフォンで友だち追加先の名称が正しいか確認してください。

## Instagram URL変更方法

同じ `js/config.js` の `instagramUrl` を変更します。JavaScript無効時のリンクは `index.html` のInstagramセクションにある `href` も変更してください。ボタンには「Instagramで読む」と表示しています。自動投稿取得や外部埋め込みは使用していません。

## 色・余白・アニメーション

01の締めは `.problem-ending`、OWNERの思想は `.owner-belief`、最後の呼びかけは `.owner-message` で調整できます。すべて同じ左端に整列し、個別のインデントは設けていません。

`css/style.css` 冒頭の `:root` で配色・文字・余白を変更できます。見出しは端末にある明朝体、本文はゴシック体を使用します。

|共通クラス・変数|編集する内容|
|---|---|
|`.section-title` / `--title-size`・`--title-leading`・`--title-tracking`|HEROと01〜08の主要日本語見出し|
|`.section-label` / `--label-size`・`--label-gap`|01〜08の英字ラベルとその下の余白|
|`.section-shell` / `--section-space`・`--width`|01〜08の上下余白・共通の最大幅|
|`.prose` / `--copy-width`・`--paragraph-gap`|本文の最大幅と段落間の余白|
|`--heading-gap`・`--column-gap`|見出し下の余白と2列レイアウトの間隔|
|`.title-line`|単語途中で折り返さない見出しのまとまり|

見出しを変更する際は、title-line内の文章が長すぎないか320px幅でも確認してください。セクションごとの文字サイズ追加を避け、共通変数で調整します。最終RESERVATIONの見出しのみ別のサイズです。

OWNER右下の署名だけにGoogle Fontsの[Allura](https://fonts.google.com/specimen/Allura)を使い、細さ・傾き・横幅を調整しました。左上のブランドロゴは従来のGeorgiaのままです。Mrs Saint Delafieldは署名の代替フォントにも使用しているため、読み込みを維持しています。外部フォントが読み込めない場合は代替の筆記体で表示されます。

900px以下では、小さなMENUと2本線からアイボリーの全画面ナビゲーションを開きます。スクロール後はヘッダーを小さくし、ページ最上部で元に戻します。展開中は背景スクロール・背景へのキーボード移動を抑え、Escapeキーでも閉じられます。

600px以下の固定LINEボタンは幅最大276px・高さ44pxです。HEROの予約ボタンを通過すると現れ、最終予約ボタンが画面に入ると隠れます。メニュー展開中も隠れます。JavaScript無効時は通常のナビゲーションとページ内CTAを使えますが、この追従ボタンは表示しません。OSの「視差効果を減らす」等の設定ではアニメーションを抑制します。

## GitHub Pagesでの無料公開方法

1. GitHubにログインし、新しい **Public（公開）** リポジトリを作ります。名前の例は `alba-a` です。
2. **Add file → Upload files** で、この `alba-a` フォルダーの**中身**をアップロードします。最上位に `index.html` が来るようにします。`alba-a/index.html` のような二重構造にしないでください。
3. `css`、`js`、`images` の各フォルダーを構造ごとアップロードし、変更を保存（Commit changes）します。`.nojekyll` が表示されない場合はAdd file → Create new fileで同名の空ファイルを追加できます。
4. リポジトリの **Settings → Pages** を開きます。
5. Build and deployment の Sourceで **Deploy from a branch** を選び、Branchを **main**、フォルダーを **/(root)** にして **Save** を押します。
6. 配信完了後、同じ画面に表示されるURLを開きます。一般的な形式は `https://ユーザー名.github.io/alba-a/` です。反映には時間がかかる場合があります。
7. スマートフォンで各リンク・LINE予約・写真を確認します。今後の更新は対象ファイルを編集し、変更を保存すると反映されます。

公開リポジトリ内のファイルは誰でも閲覧できます。詳細住所・お客様の未許可写真・個人情報・参考スクリーンショットはアップロードしないでください。本サイトに詳細住所や地図は含まれていません。GitHubへのアップロードや実際の公開はまだ行っていません。

公式手順：[GitHub Pagesの公開元を設定する](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## SEO・SNS共有・favicon

title、description、OGPの基本テキスト、見出し構造、日本語指定、表示幅指定を実装済みです。公開URL決定後、`index.html` のhead内のコメント位置に次を追加します。URLはすべて自分の公開URLに置き換えます。

```html
<link rel="canonical" href="https://ユーザー名.github.io/alba-a/">
<meta property="og:url" content="https://ユーザー名.github.io/alba-a/">
<meta property="og:image" content="https://ユーザー名.github.io/alba-a/images/ogp.jpg">
<meta property="og:image:alt" content="alba.Aのサロン風景">
<meta name="twitter:card" content="summary_large_image">
```

`ogp.jpg` は許可済み写真を用意してから設定してください。写真未提供のため現状は画像用OGPを設定していません。faviconは `images/favicon.svg` を交換できます。PNGの場合はheadの `type` を `image/png` に、`href` を新しいファイル名に変更します。

## オーナー本人に公開前に確認してもらう項目

- [ ] 「強く押さない。やさしく、ゆっくり。」などの施術方針と実際の施術が一致しているか
- [ ] OWNERの想いと、休息・夜・翌朝のストーリーが本人の考えに沿っているか
- [ ] Instagramの「自分を休ませるための小さなヒントや、alba.Aの日々」という紹介文
- [ ] 今回提供された4メニューの名称・施術構成・時間・料金が公開時点でも正しいか
- [ ] 税込／税別、追加料金の条件
- [ ] カウンセリングを含む来店から退店までの所要時間
- [ ] 営業時間
- [ ] 定休日
- [ ] 支払い方法
- [ ] 公式LINE URLとリンク先アカウント
- [ ] 掲載する住所範囲（現状：福井市東郷のみ）と予約後の案内方法
- [ ] 駐車場の案内方法
- [ ] すべての写真の使用許可（撮影者・写っている本人双方）
- [ ] 手書きアンケート画像・短い引用の正確な原文・掲載許可・匿名表記の希望
- [ ] アンケート内の氏名・連絡先などを含む、画像の公開範囲
- [ ] セラピストの名前・プロフィール・経歴・資格・挨拶文
- [ ] 移転・リニューアルオープンの日付、現在の営業状況
- [ ] 女性専用・完全貸切・駐車場ありの表記と、サイト全体の文章
- [ ] 正式ロゴ・favicon、公開URL、SNS共有画像
- [ ] 全プレースホルダーの差し替え、写真のalt文、予約ボタンの実機動作

公開前は `確認`、`準備中`、`掲載予定`、`[` などでページ内を検索し、残りがないか確認してください。
