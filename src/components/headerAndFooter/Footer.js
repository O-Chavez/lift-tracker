import React from 'react'

export default function Footer() {
  const FOOTER_STYLE = {
    background: "#292b2c",
    fontSize: ".75rem",
    position: "relative",
  }

  const FOOTER_TEXT = {
    height: "60px",
    paddingTop: "12px",
    textAlign: "center",
  }

  const LINK_BAR = {
    padding: "5px",
    postion: "absolute",
    textAlign: "center",
    bottom: "0px",
    backgroundColor: "#3f484f",
  }


  return (
    <div style={FOOTER_STYLE} >
      <div style={FOOTER_TEXT} className="text-white-50">
        <i>“Strength does not come from winning. Your struggles develop your strengths. When you go through hardships and decide not to surrender, that is strength.”</i>
        <p>- Arnold Schwarzenegger</p> 
      </div>
      <div style={LINK_BAR} >
        <a className="text-white-50" href="http://www.oscarchavez.com" target="_blank" rel="noreferrer">www.OscarChavez.com</a>
      </div>

    </div>
  )
}
