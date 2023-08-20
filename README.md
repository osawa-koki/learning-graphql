# learning-graphql

🦉🦉🦉 GraphQLについて学習するためのリポジトリです！  

![成果物(Query)](./docs/img/fruit.query.webp)  
![成果物(Query)](./docs/img/fruit.mutation.webp)  

## 実行方法

```shell
# サーバーサイド
cd ./server/
yarn install
yarn db:reset && yarn db:create && yarn db:seed
yarn dev
# yarn codegen # GraphQLのスキーマ定義から型定義を生成する。

# クライアントサイド
cd ./client/
yarn install
yarn dev
# yarn codegen # GraphQLのスキーマ定義から型定義を生成する。
```
