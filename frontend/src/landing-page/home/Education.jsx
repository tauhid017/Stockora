import React from 'react';
import educationsvg from '../../assets/education.svg'
function Education() {
    return ( 
       <div className="container mt-5 mb-5">
        <div className="row">
            <div className="col-6">
                <img src={educationsvg} alt="educationsvg" className='mx-5' />
            </div>
            <div className="col-6 mt-5">
                <h2>Free and open market education</h2>
                <p className='text-muted mt-4'>Varsity, the largest online stock market education book in the world <br /> covering everything from the basics to advanced trading.</p>
                <a href="#" style={{textDecoration:"none"}} className='mt-4'>Varsity <i class="fa-solid fa-arrow-right"></i></a>
                 <p className='text-muted mt-5'>TradingQ&A, the most active trading and investment community in <br /> India for all your market related queries.</p>
                <a href="#" style={{textDecoration:"none"}} className='mt-4'>TradingQ&A  <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        </div>
       </div>
     );
}

export default Education;