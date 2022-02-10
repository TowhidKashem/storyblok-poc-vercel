import type { NextPage } from 'next';
import Layout from '@components/Layout/Layout';

const NotFound: NextPage<{
  layout: any;
}> = ({ layout }) => {
  return (
    // <Layout layout={layout}>
    <section className="not-found content-center">
      <h1 className="text-3xl font-bold">Custom 404!</h1>
      <p className="text-2xl py-10">Oops not found!</p>
    </section>
    // </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {}
  };
}

export default NotFound;
