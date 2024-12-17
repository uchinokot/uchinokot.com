---
title: "KamalでRedmineをデプロイする"
date: "2024-12-17"
---

この記事は [Redmine Advent Calendar 2024](https://adventar.org/calendars/10311) の17日目です。

## はじめに
エンジニアとして、今年の夏からRedmineのプラグイン開発に関わっています。

プロジェクト管理ツールはいろいろと使ったことがありましたが、Redmineは未経験でした。
Redmineを使いこなすために、自分用のRedmineを立ち上げたいと思い、Kamalを使ってデプロイしました。
この記事ではその手順を紹介します。

また、Rails 8からKamalがデフォルトのデプロイツールになったということで、試してみようと思いました。

## Kamalとは
Kamalは37signalsが開発した、Dockerコンテナを利用してアプリケーションをデプロイするツールです。
Railsのデプロイツールとして有名なCapistranoのDockerコンテナ版といった位置づけになります。

### 特長
Kamalの特長は以下の通りです。

- Dockerがインストール可能なUbuntuサーバであれば、どこにでもデプロイ可能
- Railsアプリケーションだけでなく、Dockerベースのアプリケーションに対応
- Blue/Greenデプロイメントによるダウンタイムなしのデプロイ（Kamal Proxyを利用）

デプロイ設定は簡単で、YAMLファイルにアプリケーションの設定内容とデプロイ先サーバのIPアドレスを記載するだけで、DockerインストールからSSL証明書の設定まで自動化されます。

## デプロイ手順
今回の構成は以下の通りです。

- VPS: Ubuntu 20.04.6 LTS、512MB RAM/1 Core CPU
- Redmine Version: 6.0.1.stable
- Database: PostgreSQL 17.2
- Kamal Version: 2.4.0

詳細なコードは [こちら](https://github.com/uchinokot/redmine-kamal) にあります。

### VPSの設定
ConoHaの安いプランでVPSをレンタルしました。公開鍵認証を利用するため、サーバ構築前にSSHキーを登録し、サーバ構築時にそのキーを紐づけます。

また、ConoHaの「セキュリティグループ」で以下のポートを許可しました。

- 22 (SSH)
- 80 (HTTP)
- 443 (HTTPS)

Dockerは未インストールでも、Kamalのセットアップ時に自動でインストールされます。

### DNSの設定
ムームードメインで取得済みのドメインを利用し、サブドメインをVPSのIPアドレスに紐づけました。

### Docker Hubの設定
Kamalのデプロイにはコンテナレジストリが必要です。今回はDocker Hubを利用しました。無料プランではプライベートリポジトリを1つ使用可能です。
「Read/Write」を許可するアクセストークンを取得しました。

### Dockerアプリの用意
[こちら](https://github.com/uchinokot/redmine-kamal/blob/main/Dockerfile) のDockerfileを基にRedmine 6系のイメージを構築しました。プラグインもDockerイメージに組み込んでいます。

### Kamalのインストール
Rubyをメインで使用しているため、以下のコマンドでKamalをインストールしました。他のインストール方法は公式ドキュメントに記載されています。

```bash
$ gem install kamal
```

初期設定ファイルを生成します。

```bash
$ kamal init
```

### Kamalセットアップ
`config/deploy.yml` に以下のように設定を記述しました。最終的なコードは [こちら](https://github.com/uchinokot/redmine-kamal/blob/main/config/deploy.yml) にあります。

#### Proxy設定
```yml
proxy:
  ssl: true
  host: redmine.uchinokot.com
  app_port: 3000
  healthcheck:
    path: /login
```
`app_port` はRailsアプリがポート3000で動作しているため、それに合わせています。
`healthcheck` は `/up` デフォルトなのですが、Redmineに標準で存在する `/login` を指定しています。

#### データベース設定
```yml
accessories:
  db:
    image: postgres:17.2
    host: 160.251.184.187
    env:
      clear:
        POSTGRES_USER: app_user
        POSTGRES_DB: redmine_production
      secret:
        - POSTGRES_PASSWORD
    directories:
      - data:/var/lib/postgresql/data
```
PostgreSQLを使用し、データの永続化には `directories` を指定しました。
`volumes` を使ってもデータの永続化ができるのですが、 `directories` はボリュームをマウントする前にホスト上にディレクトリを作成してくれます。

#### 環境変数
環境変数は [.kamal/secrets](https://github.com/uchinokot/redmine-kamal/blob/main/.kamal/secrets) で管理しています。
`.env` 経由でセットされるようにしているので、各種パスワードを以下のように設定してください。

```
KAMAL_REGISTRY_PASSWORD=Docker Hubで取得したパスワード
POSTGRES_PASSWORD=任意のDBパスワード
```

#### デプロイ実行
設定が完了したら、以下のコマンドでVPSのセットアップとデプロイを実行します。

```bash
$ kamal setup
```

その後のデプロイは次のコマンドで行えます。

```bash
$ kamal deploy
```

デプロイしたRedmineは https://redmine.uchinokot.com/ で動作しています。

## おわりに
Dockerが動く環境であればどこにでもデプロイできるKamalはとても便利でした。
今回はシンプルな構成で試しましたが、Capistranoのように宣言的に書いていく設定なので分かりやすいと感じました。

余談ですが、「Kamal」は名前の由来が良いですよね。

> Kamal is named after the ancient Arab navigational tool used by sailors to keep course by determining their latitude via the Pole Star.

自作ツールをつくって、こんな名前を付けてみたいなと思います。

## 参考
- [Kamal — Deploy web apps anywhere](https://kamal-deploy.org/)
- [Kamal 2 を使い、インフラに詳しくない人でもNext.jsを296円のVPSにデプロイできるよう、説明してみる](https://zenn.dev/naofumik/articles/8849c2e8feecc0)
- [『Ruby on Rails8入門！』](https://techbookfest.org/product/41bEtMuRb2xADJH5E0WWVC?productVariantID=2hufyTuCnbtJu8bCHDG6pU)
