import Head from 'next/head'
import Home from '/components/Home.js'
import About from '/components/About.js'
import Work from '/components/Work.js'
import Skill from '/components/Skill.js'
import Contact from '/components/Contact.js'
import ReactFullpage from '@fullpage/react-fullpage';
import React, { useEffect, useRef } from "react";
import $ from 'jquery';
import gsap from "gsap";



const index = () => {
  const wave = useRef(null)
  const about = useRef(null)
  const contact = useRef(null)
  const allowMouse = false;
  useEffect(() => {

    gsap.from(wave.current, { duration: 1.3, y: '-95%', x: -'50%', ease: "in", delay: 0.2 });

    setTimeout(() => {
      allowMouse = true;
    }, 2000)
    // fix fullpage.js bug with aos.js
    window.addEventListener('resize', () => {
      setTimeout(() => {
        $('.fp-table.active .aos-init').addClass('aos-animate');
      }, 100);
    })
  }, []);
  const onLeave = (origin, { index }) => {
    // fix fullpage.js bug with aos.js
    $('.section:gt(0)').eq(origin.index - 1).find('[data-aos]').removeClass('aos-animate');
    // leave to
    switch (index) {
      case 1:
        about.current.toggleEffect()
        break;
      case 4:
        contact.current.toggleEffect();
        break;
      default:
        break;
    }
    // leave from
    switch (origin.index) {
      case 4:
        contact.current.cancelEffect();
        break;
    }
  }
  const handleMouseMove = ({ nativeEvent: { clientX, clientY } }) => {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent)) {
      let x = ((clientX - (window.innerWidth / 2)) / window.innerWidth * 2).toFixed(2)
      let y = (((window.innerHeight / 2) - clientY) / window.innerHeight * 2).toFixed(2)
      if (allowMouse) {
        wave.current.style.left = -x * 20 - 50 + "%"
      }
    }
  }


  const meta = {
    title: "Ryan Kwan - Portfolio",
    description: `Full-Stack Developer | UX Designer -
My aspiration is to deliver exceptional design solutions to address problems and meet people’s actual needs.`,
    image: "/image/meta.png"
  }



  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Greetings, I'm Ryan Kwan." />
        <meta name="description" content={meta.description} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:image" content={meta.image} />
      </Head>

      <div className="dark bg-crayola" onMouseMove={handleMouseMove}>
        <ReactFullpage
          scrollOverflow={true}
          onLeave={onLeave}
          afterLoad={() => {
            // fix fullpage.js bug with aos.js
            $('.fp-table.active .aos-init').addClass('aos-animate');
          }}

          render={({ state, fullpageApi }) => {
            return (
              <div id="fullpage-wrapper">

                <div className="section bg-background">
                  <Home OnClickStarted={() => fullpageApi.moveTo(2)} />
                  <div className="pattern bg-wave-pattern w-[200%] -left-1/2 " ref={wave}></div>
                </div>

                <div className="section">
                  <About ref={about} />
                </div>

                <div className="section" >
                  <Skill />
                </div>

                <div className="section pattern bg-peak-pattern">
                  <Work />
                </div>
                <div className="section bg-viridian">
                  <Contact ref={contact} />
                </div>


              </div>
            );
          }}
        />
      </div>
    </div>

  )
}

export default index

