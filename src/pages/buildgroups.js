import React, { useState } from "react";
import { saveAs } from 'file-saver';
import Layout from "../components/layout";
import Seo from "../components/seo";
import "../components/bootstrap.css";
import { StaticImage } from "gatsby-plugin-image";

let vgRawJson = {"contactList":{},"isSuspended":false,"isVGEnabled":true};

const BuildGroups = () => {

    const [groupName, setGroupName] = useState("");
    const [slots, setSlots] = useState("");
    const [groups, setGroups] = useState([]);
    const [prevIndex, setPrevIndex] = useState(0);

    const names = ["Ava", "Olivia", "Sophia", "Isabella", 
    "Mia", "Charlotte", "Emma", "Wren", "Victoria", "Taylor", "Rebecca", "Scarlette"];
    const rndName = names[Math.floor(Math.random()*names.length)];

    const addGroup = () => {

        let firstFile, lastFile, firstFileNm;
        let lastIndex = (Number(prevIndex) + Number(slots));

        // First file
        firstFile = Number(prevIndex) + 1;
        
        if (firstFile >= 100) {
            firstFileNm = "0000000" + firstFile + ".MP4";
        } 
        if (firstFile < 100) {
            firstFileNm = "00000000" + firstFile + ".MP4";
        }
        if (firstFile < 10) {
            firstFileNm = "000000000" + firstFile + ".MP4";
        }

        // Last file
        if (lastIndex >= 100) {
            lastFile = "0000000" + lastIndex + ".MP4";
        } 
        if (lastIndex < 100) {
            lastFile = "00000000" + lastIndex + ".MP4";
        }
        if (lastIndex < 10) {
            lastFile = "000000000" + lastIndex + ".MP4";
        }
        
        let newGroup = {
            groupName: rndName + " " + groupName,
            slots: slots,
            fileNames: firstFileNm + " -------> " + lastFile
        }
        
        setGroups((prevState) => [...prevState, newGroup]);
        setSlots("");
        setGroupName("");
        setPrevIndex(lastIndex);
    }

    const buildVg = () => {
        let contactObj = {}, contactNum;
        let maxIndex = 1; 
        let d = new Date("2020-02-15T22:34:28.001");

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

                d.setDate(d.getDate() + 1);
                const noZ = d.toISOString().replace('Z', '');
               
                let addVg = {
                    "createdDate":noZ,
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
        <Seo title="GramSmash Group Builder" description= "Gramsmash group builder - Mr. Art Sphitz" />
        <p>
            With this option, you can create groups, and place movies/shows within each group.
            This will make it much easier navigating to whatever you're trying to watch.
        </p>
        <p>
            Unless you find a compatible browser, chances are you'll have to use this from a phone.
            If you're on a tablet, download the pre-built group file below until you get to a jack!
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
            {
                (groups.length > 0) ? 
                <><b>Pay close attention to File Names here!</b>
                <> You must name your files accordingly for your videos to show up in 
                the correct group.</><br /><br /></>
                : 
                ""
            }

            <ul>
            {
                groups.map((group, i) => (
                    <li>
                        <h2>** Group {(i+1)} ** </h2> 
                        <b>Name:</b> { group.groupName } -- <b>Slots:</b> { group.slots }
                        <br />
                        <b>File Names: </b> { group.fileNames }
                    </li>
                ))
            }
            </ul>
            <br />
            { 
                (groups.length > 0) ? 
                    <button onClick={buildVg} className="btn btn-info">
                        Build and Download contact_vg.json
                    </button> 
                    : 
                    "" 
            }
        </p>
        { 
                (groups.length == 0) ?
                    <p>
                        <h2>Pre-Built Group File</h2>
                        <br/>
                        <a download href="http://gramsmash.netlify.app/vg/group1/contacts_vg.json" style={{ color: `white` }} className="btn btn-info">
                            Download Pre-Built Groups contact_vg.json
                        </a>
                        <br/>
                        <StaticImage
                        src="../images/group1.png"
                        width={440}
                        quality={95}
                        formats={["AUTO", "WEBP", "AVIF"]}
                        alt="A gram smasher group..."
                        style={{ marginBottom: `1rem` }}
                        />
                    </p>
                    :
                    ""
        }
        </Layout>
    )
}

export default BuildGroups;