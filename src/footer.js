import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container-fluid text-light py-4" style={{ background: '#051225' }}>
        <div class="container">
            <div class="row g-0">
                <div class="col-md-6 text-center text-md-start">
                    <p className="mb-md-0">&copy; <span className="text-white border-bottom">DENCARE</span>. All Rights Reserved.</p>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <p class="mb-0">Designed for Dencare</p>
                </div>
            </div>
        </div>
    </div>
    </footer>
  );
};

export default Footer;
