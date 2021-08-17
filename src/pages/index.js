import React, { useEffect, useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/seo";

let vgObj = require("../../static/contacts_vg-clipped.json");

const IndexPage = () => {

  const [vgJson, setVgJson] = useState({});

  useEffect(() => {

    let vbObj = {};
    
    for (let i=1; i <= 300; i++) {
      let key, path, milli;
      if (i >= 100) {
        key = "1234567" + i;
        path = "../../DD/0000000" + i + ".mp4"
        milli = i;
      } 
      if (i < 100) {
        key = "12345670" + i;
        path = "../../DD/00000000" + i + ".mp4"
        milli = "0" + i;
      }
      if (i < 10) {
        key = "123456700" + i;
        path = "../../DD/000000000" + i + ".mp4"
        milli = "00" + i;
      }
      
      let addVg = {
          "createdDate":"2021-08-15T22:34:28." + milli,
          "id":key,
          "isKeyframeCorrupted":false,
          "isRead":true,
          "isVideogramCorrupted":false,
          "keyframe":"254898489.png",
          "mailType":"VOutMail",
          "orientation":"Landscape",
          "recipientID":"T51485",
          "syncStatus":"ON_DEVICE",
          "videoPath":path
        }

        vbObj[key] = addVg;
    }

    setVgJson(vbObj);
  }, []);

  const handleFile = (e) => {
    const jsoncontent = e.target.result;
    let a = document.createElement("a");
    a.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(jsoncontent));
    a.setAttribute("download", "contacts_vg.json");
    a.click();
  }

  const handleGram = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  }

  const handleGeneric = () => {
    vgObj.contactList[Object.keys(vgObj.contactList)[0]].videogrames = vgJson;
    let a = document.createElement("a");
    a.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vgObj)));
    a.setAttribute("download", "contacts_vg.json");
    a.click();
    console.log(vgObj);
  }

  return (
  <Layout>
    <Seo title="Home" />
    <h1>Give me gram to smash.</h1>
    <StaticImage
      src="../images/smash.jpg"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="A gram smasher..."
      style={{ marginBottom: `1.45rem` }}
    />
    <p>
      <input type="file" onChange={e => handleGram(e.target.files[0])} />
    </p>
    <p>
      <button onClick={handleGeneric}>Download Generic contacts_vg</button>
    </p>
  </Layout>
  )
}

export default IndexPage;
