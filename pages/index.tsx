import { NextPage } from "next";
import Layout from "../src/components/Layout/Layout";
import getAccountType from "../src/server/auth";

const Page: NextPage = () => <Layout>index</Layout>;

Page.getInitialProps = async ctx => {
  const accountType = getAccountType(ctx);
  return {};
};

export default Page;
