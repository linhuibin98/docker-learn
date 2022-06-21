FROM node:16-alpine as builder

WORKDIR /code
# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json yarn.lock /code/
# 此时，pnpm 可以利用缓存，如果 yarn.lock 内容没有变化，则不会重新依赖安装
RUN yarn

ADD . /code

RUN yarn build

CMD yarn preview

# 选择更小体积的基础镜像
FROM nginx:alpine
COPY --from=builder code/dist /usr/share/nginx/html

EXPOSE 80
