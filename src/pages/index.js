import React, { useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import { Link } from 'gatsby';
import Layout from "../components/layout";
import Seo from "../components/seo";
import "../components/bootstrap.css";

let vgObj = require("../../static/contacts_vg-clipped.json");

const IndexPage = () => {

  const [vgJson, setVgJson] = useState({});
  const [slots, setSlots] = useState(300);

  useEffect(() => {
    let vbObj = {};
    
    for (let i=1; i <= slots; i++) {
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
  }, [slots]);

  const handleFile = (e) => {
    const jsoncontent = e.target.result;

    console.log(jsoncontent.stringify(jsoncontent));

    // let a = document.createElement("a");
    // a.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(jsoncontent));
    // a.setAttribute("download", "contacts_vg.json");
    // a.click();
  }

  const handleGram = (file) => {
    let fileData = new FileReader();
    
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  }

  const handleGeneric = () => {

    vgObj.contactList[Object.keys(vgObj.contactList)[0]].videogrames = vgJson;

    const jsonFile = new Blob([JSON.stringify(vgObj)], {
      type: 'application/json',
      name: "contacts_vg.json"
    });

    saveAs(jsonFile, "contacts_vg.json");
    // let a = document.createElement("a");
    // a.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vgObj)));
    // a.setAttribute("download", "contacts_vg.json");
    // a.click();
  }

  return (
  <Layout>
    <Seo title="Home" />
    <h2>These buttons generate a json file called: contacts_vg.json</h2>
    <br/>
    <h3>
      You will replace the contacts_vg.json in the videograms directory of your tablet
      with the one generated here. 
    </h3><br/>
    <h3>
      Once you've done that, create your trusty DD folder at the root of your tablet. Name your movies
      as follows: 0000000001.MP4    -     0000000002.MP4    -    0000000100.MP4
      <br/>
      ** IT'S IMPORTANT THAT THE FILE NAME BE 10 DIGITS LONG AND OBVIOUSLY .MP4 CAPITALIZED.
    </h3><br/>
    <p>
      For either of these options to work, you need to have had videograms on your tablet at some
      point.
    </p>
    <p>
      Delete all the videograms using the tablet interface.
      Then, overwrite the contacts_vg.json file with the file generated by the methods below.
    </p>
    <p>
      These buttons simply allow you to download a contact_vg.json file with a given
      number of slots for movies.
      <div className="btn-group">
        <a download href="vg/50/contacts_vg.json" style={{ color: `white` }} className="btn btn-primary">50-Slots</a>
        <a download href="vg/75/contacts_vg.json" style={{ color: `white` }} className="btn btn-primary">75-Slots</a>
        <a download href="vg/100/contacts_vg.json" style={{ color: `white` }} className="btn btn-primary">100-Slots</a>
        <a download href="vg/150/contacts_vg.json" style={{ color: `white` }} className="btn btn-primary">150-Slots</a>
        <a download href="vg/200/contacts_vg.json" style={{ color: `white` }} className="btn btn-primary">200-Slots</a>
        <a download href="vg/250/contacts_vg.json" style={{ color: `white` }} className="btn btn-primary">250-Slots</a>
        <a download href="vg/300/contacts_vg.json" style={{ color: `white` }} className="btn btn-primary">300-Slots</a>
      </div>
    </p>
    <p>
      <p>
        **<b>This option may not work depending on your browser version. If 
          it doesn't, you'll have to use a pre-made one from above.</b>**
      This method doesn't give you any of your grams that you already had. It just adds
      300 slots for movies, or however many slots you enter in the field.
      </p>
      How many slots do you want? 
      <input onChange={(e) => {
        setSlots(e.target.value);
      }
      } 
      type="text" 
      value={slots} /> &nbsp;&nbsp;&nbsp;
      <button className="btn btn-primary" onClick={handleGeneric}>Download Generic contacts_vg</button>
    </p>
    <p>
      <p>
        <h3>This is in beta version. Currently for testing only.</h3>
        This option will take your current contact_vg.json file, and add a given number of slots 
        to it. This will allow you to keep your current video grams, and just tack some slots on
        after them.
      </p>
      <input type="file" onChange={e => handleGram(e.target.files[0])} />
    </p>
    <p>
      <Link to="/buildgroups/">Build Groups</Link>
    </p>
  </Layout>
  )
}

export default IndexPage;
