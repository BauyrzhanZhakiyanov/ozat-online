import React, { useState } from 'react'
import { WebView, WebViewMessageEvent } from 'react-native-webview'

interface CombinedRendererProps {
  content: string
  isMCQ?: boolean
  textStyle?: { [key: string]: string }
}

const CombinedRenderer = (props: CombinedRendererProps) => {
  const { content, isMCQ = false, textStyle = {} } = props
  const [webViewHeight, setWebViewHeight] = useState(0)

  const customTextStyle = Object.entries(textStyle)
    .map(
      ([key, value]) =>
        `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`,
    )
    .join(' ')

  const styles = `
    body, html, #content {
      margin: 0;
      padding: 0;
      font-size: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      max-width: 100%;
      overflow-x: hidden;
      word-wrap: break-word;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    .center {
      text-align: center;
    }
    .inputs-gap-filling {
      ${
        isMCQ
          ? `
        width: 54px;
        height: 37px;
        border: 1px solid #F7931E;
        border-radius: 4px;
        background-color: #F7931E;
        opacity: 0.25;
        pointer-events: none;
      `
          : `
        width: auto;
        margin: 0 2px;
        padding: 0 2px;
      `
      }
    }
    .content-class {
      text-align: center;
      font-size: 24px;
      font-family: 'Inter', sans-serif; 
      font-weight: 600;
    }
    *, html, body {
      box-sizing: border-box;
    }

    /* Apply custom text styles if provided */
    p, span, div {
      ${customTextStyle}
    }
  `

  const additionalScripts = isMCQ
    ? `
    var inputs = document.querySelectorAll('.inputs-gap-filling');
    inputs.forEach(function(input) {
      input.setAttribute('readonly', true);
    });
  `
    : ''

  const combinedHTML = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <style>
      ${styles}
    </style>
  </head>
  <body>
    <div id="content" class="content-class">
      ${content}
    </div>
    <script>
      (function() {
        function sendHeight() {
          var height = document.getElementById('content').offsetHeight;
          window.ReactNativeWebView.postMessage(height.toString());
        }

        MathJax.typesetPromise().then(function() {
          ${additionalScripts}
          sendHeight();
        }).catch(function (err) {
          console.error(err);
          sendHeight();
        });

        window.addEventListener('resize', sendHeight);
      })();
    </script>
  </body>
  </html>
  `

  const onMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data
    const height = parseInt(data)
    if (!isNaN(height)) {
      setWebViewHeight(height)
    }
  }

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: combinedHTML }}
      style={[{ width: '100%', height: webViewHeight || 100 }]}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      onMessage={onMessage}
      scalesPageToFit={false}
      scrollEnabled={false}
    />
  )
}

export default CombinedRenderer
