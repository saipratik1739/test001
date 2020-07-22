# Set the builder image to custom nodejs:6 (base image is centos 7)
#FROM docker.optum.com/dchoi1/nodejs:6
##FROM docker.optum.com/provider-onboarding/onboarding-ui:nodejs-10-centos7
#FROM node:10.15.3
FROM docker.repo1.uhc.com/provider-onboarding/base-images:node-10.15.3-internal

### File Author / Maintainer
MAINTAINER Tom McShane <thomas.mcshane@optum.com@optum.com>

# Expose port
EXPOSE 8080

## Set env variables for node app\
# we only need a NODE_ENV for the gulp to build
ENV NODE_ENV dev
ENV MY_KEY value
ENV PORT 8080
# ENV NODE_ENV production
# ENV BABEL_DISABLE_CACHE 1
# ENV pfx certificates/OPCert-HPBC-Stage.pfx
# ENV PASSPHRASE unitedhealth1A

USER root

# Define working directory and copy source files in
#RUN mkdir -p /www && useradd -u 1001 -r -g 0 -d /www -c "Default Application User" default

# Best practices to cache layers

WORKDIR /www

COPY . /www

RUN npm install
RUN export NODE_ENV=production && npm run build

##RUN chown -R 1001:0 /opt/app-root/src/dynatrace && chmod -R g+wrx /opt/app-root/src/dynatrace

# Here are the layers that changes frequently
# Something to clear the cache
# RUN echo "0"
#RUN npm run build
##RUN chown -R 1001:0 /www
##RUN chmod -R g+wrx /www
RUN chown -R 1001:0 /www && chmod -R g+wrx /www

USER 1001

CMD ["npm", "run", "start"]
##CMD ["/bin/sh", "-c", "npm run start-ocp"]
