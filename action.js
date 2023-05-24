"use strict";
const core = require('@actions/core');
const puppeteer = require('puppeteer');

(async () => {
  try {
    const googlePath = '/opt/google/chrome/chrome';
    const webPageURL = core.getInput('webPageURL');
    const outputFile = core.getInput('outputFile');
    const usePuppeteer = core.getInput('usePuppeteer');
    const disableJS = core.getInput('disableJavaScript');
    const useScreen = core.getInput('useScreen');
    console.log(`Starting PDF generation for ${webPageURL}`);
    if (usePuppeteer) {
      const pdfDefaults = {
        'displayHeaderFooter': false,
        'path': outputFile
      };
      const pdfOpts = Object.assign({}, JSON.parse(core.getInput('pdfOptions')), pdfDefaults);
      const pptrOpts = {
        executablePath: googlePath,
        args: ['--no-sandbox', '--headless', '--disable-gpu']
      };

      const browser = await puppeteer.launch(pptrOpts);
      const daPage = await browser.newPage();
      if (disableJS) daPage.setJavaScriptEnabled(false);
      await daPage.goto(webPageURL, {
        waitUntil: "networkidle0",
      })
      if (useScreen) {
        await daPage.emulateMediaType('screen');
      }
      await daPage.pdf(pdfOpts)
      await browser.close()

    } else {
      const { exec } = require("child_process");
      exec(`${googlePath} --no-sandbox --headless --disable-gpu --print-to-pdf="${outputFile}" ${webPageURL}`, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    }
    console.log(`DONE. Generated PDf file is at ${outputFile}`)
  }
  catch (error) {
    core.setFailed(error.message);
  }
})();
