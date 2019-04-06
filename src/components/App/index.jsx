import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Gnb from '~/components/Gnb';
import Footer from '~/components/Footer';
import { BLACK_COLOR, WHITE_COLOR } from '~/components/Common/constants';
import { Wrapper } from './styled';

const App = ({
  location,
  categories,
  postInformations,
  hasPortfolio,
  children,
}) => {
  const [isDracula, changeTheme] = useState(false);
  const theme = isDracula ? {
    color: WHITE_COLOR,
    backgroundColor: BLACK_COLOR,
  } : {
    color: BLACK_COLOR,
    backgroundColor: WHITE_COLOR,
  };
  const toggleTheme = useCallback(() => {
    changeTheme(!isDracula);
  }, [isDracula]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <nav>
          <Gnb
            location={location}
            categories={categories}
            postInformations={postInformations}
            hasPortfolio={hasPortfolio}
            toggleTheme={toggleTheme}
          />
        </nav>
        <main>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </Wrapper>
    </ThemeProvider>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  postInformations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  hasPortfolio: PropTypes.bool.isRequired,
};

export default App;
