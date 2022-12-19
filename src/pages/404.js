import React from "react";
import Seo from "../components/seo";
import Layout from "../components/layout";

const NotFound = ({ location }) => (
  <div>
    <Layout>
      <Seo pagetitle='ページが見つかりません' pagepath={location.pathname} />
      <h1 style={{ padding: "20vh 0", textAlign: "center" }}>
        お探しのページが見つかりませんでした。
      </h1>
    </Layout>
  </div>
);
export default NotFound;
