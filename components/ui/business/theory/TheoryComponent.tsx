import React, { useMemo, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { WebView, WebViewMessageEvent } from 'react-native-webview'

interface TheoryModel {
  text: string
}

interface TheoryComponentProps {
  theories: TheoryModel[]
}

const { width } = Dimensions.get('window')

const TheoryComponent = ({ theories }: TheoryComponentProps) => {
  const content = theories[0]?.text || ''

  const parseContent = (text: string) => {
    let parsed = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    parsed = parsed.replace(
      /<div class='inputs-line-break-h1'><\/div>/g,
      '<br/><br/>',
    )
    parsed = parsed.replace(
      /<div class='inputs-line-break-h2'><\/div>/g,
      '<br/><br/><br/>',
    )

    parsed = parsed.replace(/\$(.+?)\$/g, '\\($1\\)')

    parsed = parsed.replace(/\$\$(.+?)\$\$/g, '\\[$1\\]')
    parsed = parsed.replace(/\\\[(.+?)\\\]/g, '\\[$1\\]')

    return parsed
  }

  const htmlContent = useMemo(() => {
    const parsedContent = parseContent(content)

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Theory</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
          <script id="MathJax-script" async
            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
          </script>
          <style>
            body { 
              font-size: 16px; 
              padding: 10px; 
              color: #000;
              background-color: #fff;
            }
            br { line-height: 1.6; }
            .MathJax_Display {
              margin: 1em 0;
            }
          </style>
        </head>
        <body>
          ${parsedContent}
        </body>
      </html>
    `
  }, [content])

  const [webViewHeight, setWebViewHeight] = useState(0)

  const [isWebViewLoading, setIsWebViewLoading] = useState(true)

  const injectedJavaScript = `
    function sendHeight() {
      var height = document.body.scrollHeight;
      window.ReactNativeWebView.postMessage(height);
    }
    window.onload = sendHeight;
    window.onresize = sendHeight;
  `

  const handleMessage = (event: WebViewMessageEvent) => {
    const height = Number(event.nativeEvent.data)
    if (height && height > 0) {
      setWebViewHeight(height)
    }
  }

  if (!content) {
    return (
      <ScrollView style={styles.container}>
        <Text>Сабаққа қосылған теория табылмады</Text>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ position: 'relative', minHeight: webViewHeight || 1000 }}>
        {isWebViewLoading && (
          <View style={styles.loadingContainer}>
            <View style={styles.fakeTheory}>
              {Array.from({ length: 4 }).map((_, index) => (
                <View key={index} style={styles.fakeTheoryComponent} />
              ))}
            </View>
          </View>
        )}
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={{
            width: width - 20,
            height: webViewHeight || 1000,
            opacity: isWebViewLoading ? 0 : 1,
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          automaticallyAdjustContentInsets={false}
          injectedJavaScript={injectedJavaScript}
          onMessage={handleMessage}
          scrollEnabled={false}
          onLoadStart={() => setIsWebViewLoading(true)}
          onLoadEnd={() => setIsWebViewLoading(false)}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  fakeTheory: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fakeTheoryComponent: {
    width: '80%',
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
})

export default TheoryComponent
