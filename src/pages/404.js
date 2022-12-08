import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";

export default () => (
  <div>
    <Layout>
      <SEO pagetitle='ページが見つかりません' />
      <h1 style={{ padding: "20vh 0", textAlign: "center" }}>
        お探しのページが見つかりませんでした。
      </h1>
    </Layout>
  </div>
);
