FROM buildkite/puppeteer
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN apt-get update && apt-get install -y fonts-wqy-zenhei
COPY . /web_to_pdf_action/
ENTRYPOINT ["node", "/web_to_pdf_action/dist/index.js"]
