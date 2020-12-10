import React from 'react'

export default function Footer() {
  const FOOTER_STYLE = {
    height: "100%",
    background: "#292b2c",
    fontSize: ".7rem",
    position: "relative",
  }

  const FOOTER_TEXT = {
    // position: "absolute",
    // marginBottom: "auto",
    // marginTop: "2em",
    // paddingBottom: "20px",
    padding: "5px",
    height: "75px",
    width: "100%",
    textAlign: "center",
    top: "0",

  }

  const LINK_BAR = {
    padding: "5px",
    position: "absolute",
    textAlign: "center",
    width: "100%",
    bottom: "0",
    backgroundColor: "#3f484f",
  }


  return (
    <div style={FOOTER_STYLE} >
      <div style={FOOTER_TEXT} className="text-white-50 d-flex align-items-center justify-content-center">
        <p className="text-center"><i>“Strength does not come from winning. Your struggles develop your strengths. When you go through hardships and decide not to surrender, that is strength.”</i>- Arnold Schwarzenegger</p>
        
      </div>
      <div style={LINK_BAR} >
        <a className="text-white-50" href="http://www.oscarchavez.com" target="_blank" rel="noreferrer">www.OscarChavez.com</a>
      </div>
    </div>
  )
}
