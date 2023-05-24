FROM buildkite/puppeteer
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
RUN apt-get update
RUN apt-get install -y fonts-wqy-zenhei
COPY . /web_to_pdf_action/
ENTRYPOINT ["node", "/web_to_pdf_action/dist/index.js"]
