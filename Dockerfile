FROM mhart/alpine-node:base-4
MAINTAINER Alexei Broner <alexei.broner@gmail.com>

WORKDIR /opt/repository-list
ADD build .

ENV LISTEN_PORT 443

EXPOSE 443
CMD ["node", "index.js"]
