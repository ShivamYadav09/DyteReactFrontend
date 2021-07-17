import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import '../index.css';
import useLocalStorage from '../hooks/useLocalStorage.js'

function App() {
  const [html, sethtml] = useLocalStorage('html', '')
  const [css, setcss] = useLocalStorage('css', '')
  const [js, setjs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  const [open, setOpen] = useState(true)


  return(
    <>
      <div className="explorer">
        <div className="para">File Explorer</div>
        <button class="expand-collapse-btn" onClick={() => setOpen(prevOpen => !prevOpen)}>index.html</button><br></br>
        <button class="expand-collapse-btn" onClick={() => setOpen(prevOpen => !prevOpen)}>index.css</button><br></br>
        <button class="expand-collapse-btn" onClick={() => setOpen(prevOpen => !prevOpen)}>index.js</button><br></br>
      </div>

      <div className="pane code">
        <Editor class= 'ehtml' language='xml' displayName='HTML' value={html} onChange={sethtml}/>
        <Editor class= 'ecss' language='css' displayName='CSS' value={css} onChange={setcss}/>
        <Editor class= 'ejs' language='js' displayName='JS' value={js} onChange={setjs}/>
      </div>

      <div className="pane view">
        <iframe
          srcDoc={srcDoc}
          title="Live View"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
          />
      </div>
    </>
  )
}

export default App;
