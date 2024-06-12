import React, { useState } from 'react';
import { xml2json } from 'xml-js';
import pd from 'pretty-data';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';

const MonacoEditor = dynamic(import('@monaco-editor/react'), { ssr: false });

const parseXmlToJson = (xml) => {
  const json = JSON.parse(xml2json(xml, { compact: true, spaces: 2 }));
  return json;
};

const renderButtons = (json) => {
  if (!json || typeof json !== 'object') return null;

  const renderButtonFromNode = (key, value) => {
    if (value._text) {
      return (
        <button key={key} className={styles.button}>
          {`${key}: ${value._text}`}
        </button>
      );
    } else if (typeof value === 'object') {
      return Object.keys(value).map((nestedKey) =>
        renderButtonFromNode(nestedKey, value[nestedKey])
      );
    }
    return null;
  };

  return Object.keys(json).map((key) => renderButtonFromNode(key, json[key]));
};

const Home = () => {
  const initialXml = '<root><child>Hello World</child><child>Another Child</child></root>';
  const [xml, setXml] = useState(pd.pd.xml(initialXml));
  const [json, setJson] = useState(parseXmlToJson(initialXml));

  const handleXmlChange = (newXml) => {
    try {
      const formattedXml = pd.pd.xml(newXml);
      setXml(formattedXml);
      const newJson = parseXmlToJson(formattedXml);
      setJson(newJson);
    } catch (e) {
      console.error('Invalid XML:', e);
    }
  };

  return (
    <div className={styles.container}>
      <h1>XML Editor</h1>
      <div className={styles.editor}>
        <h2>XML Editor</h2>
        <MonacoEditor
          height="400px"
          defaultLanguage="xml"
          value={xml}
          onChange={handleXmlChange}
          theme="vs-dark"
          options={{ automaticLayout: true }}
        />
      </div>
      <div className={styles.viewer}>
        <h2>Rendered Components</h2>
        <div className={styles.buttonsContainer}>
          {renderButtons(json)}
        </div>
      </div>
    </div>
  );
};

export default Home;
