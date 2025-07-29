import React from 'react';
import heroImage from '../../assets/homeHero.png'
function Hero() {
    return ( 
        <>
        <div className="container p-5 mb-5">
            <div className="row text-center">
                <img src={heroImage} alt="Hero image" className='mb-5'/>
                <h1 className='mt-5'>Invest in everything</h1>
            <h5 className='mb-3 text-muted'>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</h5>
            <button className='mt-3 p-2 btn btn-primary' style={{width:"20%", margin:"0 auto"}}>Sign Up for free</button>
            </div>
            
        </div>
        </>
     );
}

export default Hero;