# ️🚌️ 밤길 (BAMGIL) - client 🚌

## Description

막차에 대한 카운트다운과 귀가 옵션을 제공하는 웹 어플리케이션.

## Dev stack

- React

## Features

- [x] 막차 확인
- [x] 귀가 교통편 확인
- [ ] 주변 심야 영업 POI 확인

## Getting Started

### Prerequisites

| Require                              | Description                                                          |
| ------------------------------------ | -------------------------------------------------------------------- |
| [Node.js](nodejs.org)                | 10.16.0 LTS or above                                                 |
| [Yarn](https://yarnpkg.com/lang/en/) | Recommend [stable version](https://github.com/yarnpkg/yarn/releases) |
| Secret Key                           | Secret key for Kakao REST API needed                                 |

#### Install nvm, yarn

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
$ command -v nvm
$ which node
$ npm install -g yarn
```

#### Install project

```bash
$ nvm install 10.16.0
$ nvm use
$ yarn install
```

#### Build project

```bash
$ yarn build
```

#### Test project

Currently not supported.

```bash
$ yarn test
```

#### Start project

```bash
$ yarn start
```

## License

MIT
