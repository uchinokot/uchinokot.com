---
title: "自作キーボード: Corne Cherry Light"
date: "2023-08-17"
---

2023年6月末からCorne Cherry Lightを使っている。
![](https://i.gyazo.com/d0c2c620a44011a799d70bd270fe0c16.jpg)

この自作キーボードには大変満足している。
最初の頃、キーマップに慣れるまで時間がかかったが、1ヶ月ほどで快適に使えるようになった。

キーボードの自作に挑戦するのは、今回が初めてである。大学時代、Arduinoを使用した電子工作でハンダ付けの経験はあるが、それから時間が経っており、実質的には初心者のような状態だった。

## キーボード選定

以前、メインで使用していたのは[BAROCCO MD770 JP](https://archisite.co.jp/products/mistel/barocco-md770-jp/)だが、矢印キーの配置や、キースイッチ（静音赤軸）の感触に違和感があった。

新しいキーボードの条件:
* 左右分離型
* 手が小さいので、効率的にキーにアクセスできる
* 初心者でもハンダ付けがしやすい

この条件を満たすCorne Cherry Lightを選び、制作した。

購入したもの一覧:
* Corne Cherry Light: https://shop.yushakobo.jp/products/corne-cherry-light
  * 「マットブラック」のオプションを選択
* キースイッチ: [WS Switch Series - WS Silent Tactile 35pcs](https://shop.yushakobo.jp/products/6140)
  * タクタイルスイッチを試したかったのでこちらを選択した。サイレントというのも魅力的だった。
  * スイッチの選択肢は多く、どれが自分に合っている判断が難しい...。今後も様々なものを試してみたい。
* キーキャップ:
  * [無刻印104 キートップセット PBT Black](https://shop.yushakobo.jp/products/a0300bp?_pos=2&_sid=afaf2349c&_ss=r)
    * 無刻印に惹かれて選択
  * （組み立て後に購入）[esa ﾄﾘ DOYSキーキャップ (白) - esa - BOOTH](https://esa.booth.pm/items/2221978)
    * esaﾄﾘがかわいい
    * 親指のキーを間違えて押すことがあったが、キーキャップを変えたことでその頻度が減少した
* TRRSケーブル: https://www.amazon.co.jp/dp/B01MXCKHAM
* マグネット式のUSBケーブル: https://www.amazon.co.jp/dp/B08R9T831W?th=1

道具も持っていなかったため、[自作キーボードを作るために必要な工具 - 自作キーボード温泉街の歩き方](https://salicylic-acid3.hatenablog.com/entry/tool-lubrication)を参考に、必要なものを一式購入した。

## ビルドログ
基本的には[ビルドガイド](https://github.com/foostan/crkbd/blob/main/corne-light/doc/v1/buildguide_jp.md)に沿って進めれば良い。

### キースイッチのピン
> キースイッチは3ピンのものをおすすめします。 ※ 5ピンを使用する場合でも、プラスチックの足を切り離して3ピンにできます。

今回、5ピンのキースイッチを選択したが、特に足を切り離す必要はなかった。

### ハンダ付け
ハンダこての温度は320℃に設定した。ただ、適切な温度が分かっていないので次回までは調べたい。

TRRSジャックが若干斜めになってしまったため、作業をやり直した。
最初はハンダ吸い取り線でハンダを取り除こうと試みたが、取れなかった。
そのため、[自作キーボードを作るために必要な工具 - 自作キーボード温泉街の歩き方](https://salicylic-acid3.hatenablog.com/entry/tool-lubrication)で紹介されていた[エンジニア ハンダ吸取器 SS-02](https://www.amazon.co.jp/dp/B002MJMXD4?th=1)を購入し、これを使用してハンダを取り除き、再度取り付けた。

[購入したハンダこて台](https://www.amazon.co.jp/dp/B000TGNWCS?th=1)は安定性が高く、使い勝手が良かった。

## キーマップについて
最初、キーマップは[Remap](https://remap-keys.app/)で設定した。

![](https://i.gyazo.com/43e39b71e7069dcb7f98ab2b4f362dc4.png)

しかし、「英数」「かな」キーにホールドでレイヤー切り替えを追加した結果、「タップ + ホールドしたときにタップ + タップと認識され、誤入力となる」という問題が頻繁に発生した。

具体的な状況は以下である。

* かな入力に切り替え
* `（` を入力するため、ホールド（レイヤー切り替え） + キー押下
* ホールドが判定されず「い」が入力される

この問題を解決するためには、QMK Firmwareをビルドし、細かな設定を調整する必要がある。
ビルドとフラッシュの手順は https://docs.qmk.fm/#/newbs を参照し進めた。

キーコードについては、https://docs.qmk.fm/#/keycodes_basic?id=basic-keycodes を参考にしながら設定した。1つ1つキーを自分で探して入力したので、少し手間がかかった。

最終的な `keymap.c` と `config.h` の設定は以下。
https://github.com/uchinokot/dotfiles/tree/master/keyboards/crkbd

> 「タップ + ホールドしたときにタップ + タップと認識される」問題

この問題は `QUICK_TAP_TERM` の使用により、連続入力を制限することで解決した。
https://docs.qmk.fm/#/tap_hold?id=quick-tap-term

特定のキーに限定しているため影響範囲は狭く、今のところこの設定での不都合は感じていない。

## 参考記事
* [Corne Cherry向けにQMK Firmwareをビルドするために学んだこととキーマップの紹介](https://zenn.dev/konokenj/articles/37e025e8f99240)
* [QMKの「タップ」と「ホールド」を極める - golden-luckyの日記](https://golden-lucky.hatenablog.com/entry/2021/03/06/182958)
