import React from 'react';
import Layout from '~/components/layout';
import Home from '~/containers/Home';

const HomeLayout = props => (
  <Layout {...props}>
    <Home />
  </Layout>
);

export default HomeLayout;
