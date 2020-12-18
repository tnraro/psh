# Personalized Smart Home

## Prerequisites

도커 이미지(psh.tar)가 있다면 nodejs와 yarn은 필수 사항이 아닙니다.

- docker >= 20.10.0
- nodejs >= 15.0.1
- yarn >= 1.22.10

## Installation

릴리즈한 도커 이미지를 받았다면 다음 명령어로 이미지를 로드합니다.

```sh
$ docker load -i [docker-image-tar]
```

이미지가 없다면, 소스에서 직접 빌드해야합니다. 다음 명령어로 이미지를 빌드할 수 있습니다.

```sh
$ yarn build
```

이미지를 빌드가 끝나면 다음 명령어로 실행할 수 있습니다.

```sh
$ yarn start
```

만약 빌드 환경과 서버가 다르다면, 원격 서버에 이미지를 전달하기 위해 Docker Hub를 이용하거나, 다음 명령어로 이미지를 `.tar` 형식의 파일로 저장할 수 있습니다.

```sh
$ yarn docker:release
# or
$ docker save -o out.tar psh
```

`out.tar`를 전달받은 서버에서, 다음 명령어로 이미지를 로드할 수 있습니다.

```sh
# load image
$ docker load -i out.tar
```

## Run

실행하기 전에, `.env`를 같은 디렉토리에 만들어야합니다. `.env`가 없다면, `.env.example`을 참고해서 파일을 작성합니다.

다음 명령어를 실행해 Docker 컨테이너를 만들고 실행합니다.

```sh
$ docker run --env-file .env -p 80:80 -p 1883:1883 --restart unless-stopped -d psh
```

이제 도커가 백그라운드에서 실행됩니다.

환경에 따라 추가적으로 80번과 1883번 포트를 열어야할 수 있습니다.