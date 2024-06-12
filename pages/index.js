import React, { useState } from 'react';
import { xml2json, json2xml } from 'xml-js';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/theme-github';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [xml, setXml] = useState('<root><child>Hello World</child></root>');
  const [json, setJson] = useState(xml2json(xml, { compact: true, spaces: 2 }));

  const handleXmlChange = (newXml) => {
    setXml(newXml);
    try {
      const newJson = xml2json(newXml, { compact: true, spaces: 2 });
      setJson(newJson);
    } catch (e) {
      console.error('Invalid XML:', e);
    }
  };



  return (
    <div className={styles.container}>
      <h1>XML Viewer and Editor</h1>
      <div className={styles.editor}>
        <h2>XML Editor</h2>
        <AceEditor
          mode="xml"
          theme="github"
          onChange={handleXmlChange}
          value={xml}
          name="xmlEditor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="200px"
        />
      </div>

    </div>
  );
};

export default Home;
