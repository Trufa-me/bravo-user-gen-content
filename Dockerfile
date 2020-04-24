FROM 796467622059.dkr.ecr.eu-west-1.amazonaws.com/stepweb-node10-15:latest
LABEL maintainer="Stepstone UK"
USER root
RUN \
    useradd -ms /bin/bash learninghub-frontend && \
    mkdir /opt/learninghub-frontend && \
    chown -R learninghub-frontend:learninghub-frontend /opt/learninghub-frontend
COPY . /opt/learninghub-frontend
RUN chown -R learninghub-frontend:learninghub-frontend /opt/learninghub-frontend /opt/learninghub-frontend/config
USER learninghub-frontend
WORKDIR /opt/learninghub-frontend
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION=eu-west-1
ENV AWS_REGION=eu-west-1
RUN echo "https://verdaccio.trufa.me/" > ~/.npmrc
RUN yarn install --frozen-lockfile && yarn cache clean
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
