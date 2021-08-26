import React, { useEffect, useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { saveAs } from 'file-saver';
import Layout from "../components/layout";
import Seo from "../components/seo";
import "../components/bootstrap.css";

let vgRawJson = {"contactList":{},"isSuspended":false,"isVGEnabled":true};

const BuildGroups = () => {

    const [vgJson, setVgJson] = useState({});
    const [groupName, setGroupName] = useState("");
    const [slots, setSlots] = useState("");
    const [groups, setGroups] = useState([]);

    const addGroup = () => {
        
        let newGroup = {
            groupName: groupName,
            slots: slots
        }
        
        setGroups((prevState) => [...prevState, newGroup]);
        setSlots("");
        setGroupName("");
    }

    const buildVg = () => {
        let contactObj = {}, contactNum;
        let maxIndex = 1; 

        // Iterate over each group.
        groups.forEach((group) => {

            contactNum = Math.floor(1000000 + Math.random() * 9000000);
            let vgObj = {};
            
            // Loop to create gram slots in current group.
            for (let i=0; i<group.slots; i++) {
                let key, path, milli, fileName;
                fileName = (i + maxIndex);
                
                if (fileName >= 100) {
                    key = "1234567" + fileName;
                    path = "../../DD/0000000" + fileName + ".mp4"
                    milli = fileName;
                } 
                if (fileName < 100) {
                    key = "12345670" + fileName;
                    path = "../../DD/00000000" + fileName + ".mp4"
                    milli = "0" + fileName;
                }
                if (fileName < 10) {
                    key = "123456700" + fileName;
                    path = "../../DD/000000000" + fileName + ".mp4"
                    milli = "00" + fileName;
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

                vgObj[key] = addVg;
            }

            contactObj["" + contactNum + ""] = {
                "id": contactNum,
                "isSuspended":false,
                "name":group.groupName,
                "videogrames":vgObj,
                "visible":true
            };
            
            maxIndex = Number(maxIndex) + Number(group.slots);
        });
        vgRawJson.contactList = contactObj;
        
        const jsonFile = new Blob([JSON.stringify(vgRawJson)], {
            type: 'application/json',
            name: "contacts_vg.json"
          });
      
          saveAs(jsonFile, "contacts_vg.json");
    }

    return (
        <Layout>
        <p>
            <h3>This is in beta version. Currently for testing only.</h3>
            With this option, you can create groups, and place movies/shows within each group.
            This will make it much easier to navigate to whatever you're trying to watch.
        </p>
        <p>
            <table style={{ border: `none` }}>
                <tr>
                    <td style={{ width: `200px` }}>
                        Enter name of group:
                    </td>
                    <td>
                        <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td style={{ width: `200px` }}>
                        Enter number of slots:
                    </td>
                    <td>
                        <input type="text" value={slots} onChange={(e) => setSlots(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <button onClick={addGroup} className="btn btn-primary">Add Group</button>
                    </td>
                </tr>
            </table>
        </p>
        <p>
            <ul>
            {
                groups.map((group, i) => (
                    <li>
                        <h2>** Group {(i+1)} ** </h2> <b>Name:</b> { group.groupName } -- <b>Slots:</b> { group.slots }
                    </li>
                ))
            }
            </ul>
            <br />
            { 
                (groups.length > 0) ? 
                    <button onClick={buildVg} className="btn btn-info">Build contact_vg.json</button> 
                    : 
                    "" 
            }
        </p>
        </Layout>
    )
}

export default BuildGroups;