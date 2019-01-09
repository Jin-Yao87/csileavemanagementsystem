import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.footerMessage = `CSI Interfusion Sdn. Bhd. All rights reserved.`;
  }

  render() {
    const footerStyle = {
      align: "center",
      textAlign: "center",
      
    };

    return (
      <div className="card" style={footerStyle}>
        <div className="card-header">
          Copyright &copy; {new Date().getFullYear()} {this.footerMessage}
        </div>
      </div>
    );
  }
}

export default Footer;




