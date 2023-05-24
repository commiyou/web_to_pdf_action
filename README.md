# Webpage to PDF action with Chinese font

This action is based on the [misaelnieto/web_to_pdf_action](https://github.com/misaelnieto/web_to_pdf_action) repository. Modifications have been made to support Chinese fonts.

A [GitHub Action](https://github.com/features/actions) to convert any webpage to a PDF document.

Internally uses Puppeteer's mojo to get the page and render it to print it to PDF.

## Inputs

* `webPageURL`: This is the URL of the page. **Required**.
* `outputFile`: Path to the generated PDF file. **Required**.
* `usePuppeteer`: If you need to use Puppeteer or your chrome.
* `disableJavaScript`: If you need to disable js, default false
* `useScreen`: If you want to use the option emulateMediaType to generate with screen  media and not print media
* `pdfOptions`: PDF options as described on [Puppeteer's documentation](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions). This is optional.

## ✨ Example Usage

```yml
- name: html to pdf
  uses: commiyou/web_to_pdf_action@master
  with:
    webPageURL: https://www.noenieto.com/resume/
    outputFile: ./path/to/my/resume.pdf
    usePuppeteer: true
    useScreen: true
    disableJavaScript: true
    pdfOptions: '{"format": "Letter", "margin": {"top": "10mm", "left": "10mm", "right": "10mm", "bottom": "10mm"}}'
```

## You may also like ...

[Fifsky's HTML to PDF action](https://github.com/fifsky/html-to-pdf-action).
