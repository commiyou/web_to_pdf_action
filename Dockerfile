FROM buildkite/puppeteer
RUN apt-get update
RUN apt-get install -y fonts-wqy-zenhei
COPY . /web_to_pdf_action/
ENTRYPOINT ["node", "/web_to_pdf_action/dist/index.js"]
