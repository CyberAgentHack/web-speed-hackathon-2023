# Web Speed Hackathon 2023

## 概要

**"Web Speed Hackathon 2023" は、非常に重たい Web アプリをチューニングして、いかに高速にするかを競う競技です。**

- 募集要項: https://cyberagent.connpass.com/event/270424

## 課題

今回のテーマは、架空のショッピングサイト「買えるオーガニック」です。
後述のレギュレーションを守った上で、買えるオーガニック のパフォーマンスを改善してください。

- デモサイト: https://web-speed-hackathon-2023.fly.dev
- リーダーボード (順位表): https://web-speed-hackathon-scoring-server-2023.fly.dev

## 提出方法

評価対象となる環境（URL）を作成し、以下のレポジトリから参加登録を行なってください。

https://github.com/CyberAgentHack/web-speed-hackathon-2023-scoring-tool

## デプロイ

提出用環境の作成は、以下のいずれかの手順でローカルのアプリケーションをデプロイすることで行えます。

### Fly.io へデプロイする場合

1. このレポジトリを自分のレポジトリに fork します
   - https://docs.github.com/ja/github/getting-started-with-github/fork-a-repo
1. 下記手順などに従い Fly.io へデプロイの設定を行います
   - https://fly.io/docs/hands-on/install-flyctl
1. `flyctl launch`コマンドで新規アプリケーションの設定を行います
   - 既にコミットしてある fly.toml ファイルを利用すると必要な設定を省くことができます
   - 実行途中に表示される Postgresql と Redis のセットアップに関しては行う必要はありません
1. 以降、`flyctl deploy`コマンドでデプロイを行うことができます

※ Github アカウントを紐づけて Fly.io のアカウントを新規作成すると、クレジットカードの登録なしで無料枠を利用することができます

### Fly.io 外へデプロイする場合

- 無料の範囲内であれば、Fly.io 以外へデプロイしてもかまいません
  - **外部のサービスは全て無料枠の範囲内で使用してください。万が一コストが発生した場合は、全て自己負担となります。**
  - Fly.io 外へのデプロイについて、運営からサポートしません
  - デプロイ方法がわからない方は Fly.io で立ち上げることをオススメします

## 採点

採点は GitHub Actions を用いて、参加登録がされた時点および参加者が採点を要求した任意の時点で行われます。

採点の詳細についてはこちらに記載しています

https://github.com/CyberAgentHack/web-speed-hackathon-2023-scoring-tool/blob/main/docs/SCORING.md

## レギュレーション

レギュレーションに違反した場合には、順位対象外となります。

レギュレーションの詳細についてはこちらに記載しています

https://github.com/CyberAgentHack/web-speed-hackathon-2023-scoring-tool/blob/main/docs/REGULATION.md

### 上位にランクインしたアプリケーションについて

競技終了後、リーダーボードで上位にランクインしたアプリケーションをレギュレーションに抵触していないか運営が確認します。
確認にはチェックリストに基づいて運営が手作業で確認を行います

チェックリストの詳細についてはこちらに記載しています

https://github.com/CyberAgentHack/web-speed-hackathon-2023-scoring-tool/blob/main/docs/CHECKLIST.md

## 開発方法

### 環境

- Node.js (v18 以上)
- pnpm

### コマンド

最低限のコマンドだけ記載します。
それ以外については、各フォルダの `package.json` を参照してください。

#### 準備

```bash
pnpm install
```

#### ビルド

```bash
pnpm build
```

#### 開発環境の起動

ファイル変更時にクライアント・サーバー両方のビルドと再起動が自動で行われます。
**ホットリロードはありません**ので、変更をブラウザで確認するには変更後にリロードしてください。

標準では `http://localhost:8080` でアクセスできます。

```bash
pnpm start
```

## ライセンス

- Code: (c) CyberAgent, Inc.
- Image data: Unsplash License by https://unsplash.com
- Video data: Pixabay License by https://pixabay.com/
