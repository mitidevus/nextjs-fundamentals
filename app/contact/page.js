import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <header className="short-header">
        <div className="gradient-block"></div>

        <div className="row header-content">
          <div className="logo">
            <Link href="/">Author</Link>
          </div>

          <nav id="main-nav-wrap">
            <ul className="main-navigation sf-menu">
              <li>
                <Link href="/" title="">
                  Home
                </Link>
              </li>
              <li className="has-children">
                <Link href="/category" title="">
                  Categories
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link href="/category">Wordpress</Link>
                  </li>
                  <li>
                    <Link href="/category">HTML</Link>
                  </li>
                  <li>
                    <Link href="/category">Photography</Link>
                  </li>
                  <li>
                    <Link href="/category">UI</Link>
                  </li>
                  <li>
                    <Link href="/category">Mockups</Link>
                  </li>
                  <li>
                    <Link href="/category">Branding</Link>
                  </li>
                </ul>
              </li>
              <li className="has-children">
                <Link href="/single-standard" title="">
                  Blog
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link href="/single-video">Video Post</Link>
                  </li>
                  <li>
                    <Link href="/single-audio">Audio Post</Link>
                  </li>
                  <li>
                    <Link href="/single-gallery">Gallery Post</Link>
                  </li>
                  <li>
                    <Link href="/single-standard">Standard Post</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/style-guide" title="">
                  Styles
                </Link>
              </li>
              <li>
                <Link href="/about" title="">
                  About
                </Link>
              </li>
              <li className="current">
                <Link href="/contact" title="">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="search-wrap">
            <form role="search" method="get" className="search-form" action="#">
              <label>
                <span className="hide-content">Search for:</span>
                <input
                  type="search"
                  className="search-field"
                  placeholder="Type Your Keywords"
                  value=""
                  name="s"
                  title="Search for:"
                  autoComplete="off"
                  readOnly
                />
              </label>
              <input
                type="submit"
                className="search-submit"
                value="Search"
                readOnly
              />
            </form>

            <Link href="#" id="close-search" className="close-btn">
              Close
            </Link>
          </div>

          <div className="triggers">
            <Link className="search-trigger" href="#">
              <i className="fa fa-search"></i>
            </Link>
            <Link className="menu-toggle" href="#">
              <span>Menu</span>
            </Link>
          </div>
        </div>
      </header>

      <section id="content-wrap" className="site-page">
        <div className="row">
          <div className="col-twelve">
            <section>
              <div className="content-media">
                <div id="map-wrap">
                  <div id="map-container"></div>
                  <div id="map-zoom-in"></div>
                  <div id="map-zoom-out"></div>
                </div>
              </div>

              <div className="primary-content">
                <h1 className="entry-title add-bottom">
                  Get In Touch With Us.
                </h1>

                <p className="lead">
                  Lorem ipsum Deserunt est dolore Ut Excepteur nulla occaecat
                  magna occaecat Excepteur nisi esse veniam dolor consectetur
                  minim qui nisi esse deserunt commodo ea enim ullamco non
                  voluptate consectetur minim aliquip Ut incididunt amet ut
                  cupidatat.
                </p>

                <p>
                  Duis ex ad cupidatat tempor Excepteur cillum cupidatat fugiat
                  nostrud cupidatat dolor sunt sint sit nisi est eu exercitation
                  incididunt adipisicing veniam velit id fugiat enim mollit amet
                  anim veniam dolor dolor irure velit commodo cillum sit nulla
                  ullamco magna amet magna cupidatat qui labore cillum sit in
                  tempor veniam consequat non laborum adipisicing aliqua ea nisi
                  sint ut quis proident ullamco ut dolore culpa occaecat ut
                  laboris in sit minim cupidatat ut dolor voluptate enim veniam
                  consequat occaecat fugiat in adipisicing in amet Ut nulla nisi
                  non ut enim aliqua laborum mollit quis nostrud sed sed.
                </p>

                <div className="row">
                  <div className="col-six tab-full">
                    <h4>Where to Find Us</h4>

                    <p>
                      1600 Amphitheatre Parkway
                      <br />
                      Mountain View, CA
                      <br />
                      94043 US
                    </p>
                  </div>

                  <div className="col-six tab-full">
                    <h4>Contact Info</h4>

                    <p>
                      someone@abstractwebsite.com
                      <br />
                      info@abstractwebsite.com <br />
                      Phone: (+63) 555 1212
                    </p>
                  </div>
                </div>
              </div>

              <form name="cForm" id="cForm" method="post" action="">
                <fieldset>
                  <div className="form-field">
                    <input
                      name="cName"
                      type="text"
                      id="cName"
                      className="full-width"
                      placeholder="Your Name"
                      value=""
                      readOnly
                    />
                  </div>

                  <div className="form-field">
                    <input
                      name="cEmail"
                      type="text"
                      id="cEmail"
                      className="full-width"
                      placeholder="Your Email"
                      value=""
                      readOnly
                    />
                  </div>

                  <div className="form-field">
                    <input
                      name="cWebsite"
                      type="text"
                      id="cWebsite"
                      className="full-width"
                      placeholder="Website"
                      value=""
                      readOnly
                    />
                  </div>

                  <div className="message form-field">
                    <textarea
                      name="cMessage"
                      id="cMessage"
                      className="full-width"
                      placeholder="Your Message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="submit button-primary full-width-on-mobile"
                  >
                    Submit
                  </button>
                </fieldset>
              </form>
            </section>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <div className="row">
            <div className="col-four tab-full mob-full footer-info">
              <h4>About Our Site</h4>

              <p>
                Lorem ipsum Ut velit dolor Ut labore id fugiat in ut fugiat
                nostrud qui in dolore commodo eu magna Duis cillum dolor officia
                esse mollit proident Excepteur exercitation nulla. Lorem ipsum
                In reprehenderit commodo aliqua irure labore.
              </p>
            </div>

            <div className="col-two tab-1-3 mob-1-2 site-links">
              <h4>Site Links</h4>

              <ul>
                <li>
                  <Link href="#">About Us</Link>
                </li>
                <li>
                  <Link href="#">Blog</Link>
                </li>
                <li>
                  <Link href="#">FAQ</Link>
                </li>
                <li>
                  <Link href="#">Terms</Link>
                </li>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
              </ul>
            </div>

            <div className="col-two tab-1-3 mob-1-2 social-links">
              <h4>Social</h4>

              <ul>
                <li>
                  <Link href="#">Twitter</Link>
                </li>
                <li>
                  <Link href="#">Facebook</Link>
                </li>
                <li>
                  <Link href="#">Dribbble</Link>
                </li>
                <li>
                  <Link href="#">Google+</Link>
                </li>
                <li>
                  <Link href="#">Instagram</Link>
                </li>
              </ul>
            </div>

            <div className="col-four tab-1-3 mob-full footer-subscribe">
              <h4>Subscribe</h4>

              <p>Keep yourself updated. Subscribe to our newsletter.</p>

              <div className="subscribe-form">
                <form id="mc-form" className="group" noValidate={true}>
                  <input
                    type="email"
                    value=""
                    name="dEmail"
                    className="email"
                    id="mc-email"
                    placeholder="Type &amp; press enter"
                    required=""
                    readOnly
                  />

                  <input type="submit" name="subscribe" readOnly />

                  <label
                    htmlFor="mc-email"
                    className="subscribe-message"
                  ></label>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="row">
            <div className="col-twelve">
              <div className="copyright">
                <span>© Copyright Abstract 2016</span>
                <span>
                  Design by{" "}
                  <Link href="http://www.styleshout.com/">styleshout</Link>
                </span>
              </div>

              <div id="go-top">
                <Link className="smoothscroll" title="Back to Top" href="#top">
                  <i className="icon icon-arrow-up"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div id="preloader">
        <div id="loader"></div>
      </div>
    </>
  );
}
