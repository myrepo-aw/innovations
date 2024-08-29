import React, { Fragment } from 'react';

import '@popperjs/core';

/* Components */
import Goals from '../components/Goals';
import MyNavbar from '@/components/MyNavbar';

function Home() {

  return ( 
    <Fragment>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12">
            <MyNavbar />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Goals />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;