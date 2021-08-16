import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import Seo from "../components/seo";

const IndexPage = () => {

  const handleFile = (e) => {
    const content = e.target.result;
    console.log(content);
  }

  const handleGram = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
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
  </Layout>
  )
}

export default IndexPage;
