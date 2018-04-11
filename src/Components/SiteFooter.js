import React from 'react';
import { SocialIcon } from 'react-social-icons'

const SiteFooter = () => {

  const socialNetworks = ["youtube", "facebook", "instagram"];
  const socialList = socialNetworks.map(social => {
    return (
    <li className="list-group-item" key={social}>
      <SocialIcon url={`http://www.${social}.com`} network={social} color="#fff" style={{ height: 30, width: 40 }} title={`Dota 2 on ${social}`} />
    </li>
    )
  })

  return (
    <div className="siteFooter row">
      <div className="col-md-12 credits text-center">
        <h4>Open source Dota 2 data platform - powered by <a href="http://www.opendota.com" title="opendota website">opendota.com</a></h4>
      </div>

      <div className="col-md-12 navigation">
        <ul className="list-group navigation text-center">
          {socialList}
        </ul>
      </div>
    </div>
  )

}

export default SiteFooter;
