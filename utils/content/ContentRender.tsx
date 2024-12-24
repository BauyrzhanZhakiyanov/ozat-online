import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { WebView } from 'react-native-webview'

interface ContentRenderProps {
  htmlContent: string
  containerStyle?: StyleProp<ViewStyle>
  isOption?: boolean
  textColor?: string
}

const ContentRender = (props: ContentRenderProps) => {
  const {
    htmlContent,
    containerStyle,
    isOption = false,
    textColor = '#000',
  } = props
  const webviewRef = useRef<WebView>(null)
  const [webViewHeight, setWebViewHeight] = useState(0)
  const [loading, setLoading] = useState(true)
  const [contentKey, setContentKey] = useState(htmlContent)

  useEffect(() => {
    setContentKey(htmlContent)
    setLoading(true)
    setWebViewHeight(0)
  }, [htmlContent])

  const injectedJavaScript = `
    setTimeout(() => {
      const height = document.documentElement.scrollHeight || document.body.scrollHeight;
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'setHeight', height }));
    }, 100);
  `

  const mathJaxConfig = `
    window.MathJax = {
      tex: {
        inlineMath: [['\\\\(', '\\\\)']],
        displayMath: [['\\\\[', '\\\\]'], ['$$', '$$']],
        processEscapes: true
      },
      svg: {
        fontCache: 'global'
      }
    };
  `

  const generateHtml = () => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-size: 16px;
            padding: ${isOption ? '0px' : '10px'};
            margin: 0px;
            color: ${textColor};
            background-color: transparent;
            overflow: hidden;
            display: ${isOption ? 'flex' : 'block'};
            justify-content: ${isOption ? 'center' : 'flex-start'};
            align-items: ${isOption ? 'center' : 'flex-start'};
          }
          img {
            max-width: 100%;
            height: auto;
          }
          p, span, div {
            color: ${textColor};
          }
        </style>
        <script>
          ${mathJaxConfig}
        </script>
        <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js" async></script>
      </head>
      <body>
        ${htmlContent}
        <script>
          function updateHeight() {
            if (window.MathJax && MathJax.typesetPromise) {
              MathJax.typesetPromise().then(() => {
                const height = document.documentElement.scrollHeight || document.body.scrollHeight;
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'setHeight', height }));
              });
            } else {
              const height = document.documentElement.scrollHeight || document.body.scrollHeight;
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'setHeight', height }));
            }
          }

          window.addEventListener('load', updateHeight);
        </script>
      </body>
    </html>
  `

  const onMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data)
      if (data.type === 'setHeight') {
        const height = parseInt(data.height, 10)
        if (!isNaN(height)) {
          setWebViewHeight(height)
          setLoading(false)
        }
      }
    } catch (error) {
      console.error('Error parsing message from WebView:', error)
    }
  }, [])

  return (
    <View style={[styles.container, containerStyle]}>
      {loading && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )}
      <WebView
        key={contentKey}
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: generateHtml() }}
        style={[styles.webview, { height: webViewHeight }]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode="always"
        mediaPlaybackRequiresUserAction={false}
        scrollEnabled={false}
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent
          console.warn('WebView error: ', nativeEvent)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  webview: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -10,
    marginTop: -10,
    zIndex: 1,
  },
})

export default ContentRender
