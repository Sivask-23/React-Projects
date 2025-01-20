import React from 'react'
import '../../ComponentsCss/Common Pages/IndexPageExpComp.css'


const IndexPageExpComp = () => {
  return (
    <div className='outer-exp' style={{ backgroundImage: `url(${require('../../Assets/indexbanner2.jpg')})` }}>
        <div className='inner-exp'>
            <div className='inner-exp-sub1'>
                <div className='sub1head'>Empowering Your Learning Journey</div>
                <div className='sub1head2'><b>Learn with us</b> to unlock your full potential with a tailored, flexible approach that suits your needs. We provide interactive resources, expert-led courses, and continuous support to ensure your success</div>
            </div>
            <div className='inner-exp-sub2'>
                <div className='expCard'>
                    <div className='expIcon'><img src={require('../../Assets/cap.png')} alt="logo" /></div>
                    <div className='expDesc'>
                        <b>Exclusive courses</b>
                        <div>Our exclusive courses offer access to high-quality content curated by industry experts</div>
                    </div>
                    <div className='rdmore'>Read More →</div>
                </div>
                <div className='expCard' style={{marginBottom:'30px'}}>
                    <div className='expIcon'><img src={require('../../Assets/cert.png')} alt="logo" /></div>
                    <div className='expDesc'>
                        <b>Certifications</b>
                        <div>Upon completing our courses, you'll earn industry-recognized certifications that validate your skills</div>
                    </div>
                    <div className='rdmore'>Read More →</div>
                </div>
                <div className='expCard'>
                    <div className='expIcon'><img src={require('../../Assets/bulb.png')} alt="logo" /></div>
                    <div className='expDesc'>
                        <b>Creative Learning</b>
                        <div>Our platform promotes creative learning by encouraging innovative approaches to acquiring new skills</div>
                    </div>
                    <div className='rdmore'>Read More →</div>
                </div>
                <div className='expCard' style={{marginBottom:'30px'}}>
                    <div className='expIcon'><img src={require('../../Assets/book.png')} alt="logo" /></div>
                    <div className='expDesc'>
                        <b>Diverse book assortment</b>
                        <div>Our diverse book collection offers a vast array of titles across various genres and subjects.</div>
                    </div>
                    <div className='rdmore'>Read More →</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IndexPageExpComp