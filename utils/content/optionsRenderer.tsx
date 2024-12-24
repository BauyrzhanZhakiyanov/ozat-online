import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { WebView, WebViewMessageEvent } from 'react-native-webview'

interface OptionRendererProps {
  content: string
}

const OptionRenderer = (props: OptionRendererProps) => {
  const { content } = props
  const [webViewHeight, setWebViewHeight] = useState(0)

  const combinedHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
      <style>
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
        .content-class {
          text-align: left;
          font-size: 16px;
          font-family: 'Inter', sans-serif; 
          font-weight: 500;
        }
        *, html, body {
          box-sizing: border-box;
        }
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
      style={[styles.webView, { height: webViewHeight || 40 }]}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      onMessage={onMessage}
      scalesPageToFit={false}
      scrollEnabled={false}
    />
  )
}

const styles = StyleSheet.create({
  webView: {
    width: '100%',
  },
})

export default OptionRenderer
