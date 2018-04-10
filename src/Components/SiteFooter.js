import React from 'react';
import { SocialIcon } from 'react-social-icons'

const SiteFooter = () => (
  <div className="siteFooter row">
    <div className="col-md-12 credits text-center">
      <h4>Open source Dota 2 data platform - powered by <a href="http://www.opendota.com" title="opendota website">opendota.com</a></h4>
    </div>

    <div className="col-md-12 navigation">
      <ul className="list-group navigation text-center">
        <li className="list-group-item">
          <SocialIcon url="http://www.youtube.com" network="youtube" color="#fff" style={{ height: 30, width: 40 }} title = "Dota 2 on Youtube" />
        </li>
        <li className="list-group-item">
          <SocialIcon url="http://www.facebook.com" network="facebook" color="#fff" style={{ height: 30, width: 40 }} title = "Dota 2 on Facebook" />
        </li>
        <li className="list-group-item">
          <SocialIcon url="http://www.instagram.com" network="instagram" color="#fff" style={{ height: 30, width: 40  }} title = "Dota 2 on Instagram" />
        </li>
      </ul>
    </div>
  </div>
)

export default SiteFooter;
