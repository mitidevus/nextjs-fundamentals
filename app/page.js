import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="short-header">
        <div className="gradient-block"></div>

        <div className="row header-content">
          <div className="logo">
            <a href="index.html">Author</a>
          </div>

          <nav id="main-nav-wrap">
            <ul className="main-navigation sf-menu">
              <li className="current">
                <a href="index.html" title="">
                  Home
                </a>
              </li>
              <li className="has-children">
                <a href="category.html" title="">
                  Categories
                </a>
                <ul className="sub-menu">
                  <li>
                    <a href="category.html">Wordpress</a>
                  </li>
                  <li>
                    <a href="category.html">HTML</a>
                  </li>
                  <li>
                    <a href="category.html">Photography</a>
                  </li>
                  <li>
                    <a href="category.html">UI</a>
                  </li>
                  <li>
                    <a href="category.html">Mockups</a>
                  </li>
                  <li>
                    <a href="category.html">Branding</a>
                  </li>
                </ul>
              </li>
              <li className="has-children">
                <a href="single-standard.html" title="">
                  Blog
                </a>
                <ul className="sub-menu">
                  <li>
                    <a href="single-video.html">Video Post</a>
                  </li>
                  <li>
                    <a href="single-audio.html">Audio Post</a>
                  </li>
                  <li>
                    <a href="single-gallery.html">Gallery Post</a>
                  </li>
                  <li>
                    <a href="single-standard.html">Standard Post</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="style-guide.html" title="">
                  Styles
                </a>
              </li>
              <li>
                <a href="about.html" title="">
                  About
                </a>
              </li>
              <li>
                <a href="contact.html" title="">
                  Contact
                </a>
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

            <a href="#" id="close-search" className="close-btn">
              Close
            </a>
          </div>

          <div className="triggers">
            <a className="search-trigger" href="#">
              <i className="fa fa-search"></i>
            </a>
            <a className="menu-toggle" href="#">
              <span>Menu</span>
            </a>
          </div>
        </div>
      </header>

      <section id="bricks">
        <div className="row masonry">
          <div className="bricks-wrapper">
            <div className="grid-sizer"></div>

            <div className="brick entry featured-grid animate-this">
              <div className="entry-content">
                <div id="featured-post-slider" className="flexslider">
                  <ul className="slides">
                    <li>
                      <div className="featured-post-slide">
                        <div
                          className="post-background"
                          style={{
                            backgroundImage: `url(
                              "images/thumbs/featured/featured-1.jpg"
                            )`,
                          }}
                        ></div>

                        <div className="overlay"></div>

                        <div className="post-content">
                          <ul className="entry-meta">
                            <li>September 06, 2016</li>
                            <li>
                              <a href="#">Naruto Uzumaki</a>
                            </li>
                          </ul>

                          <h1 className="slide-title">
                            <a href="single-standard.html" title="">
                              Minimalism Never Goes Out of Style
                            </a>
                          </h1>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="featured-post-slide">
                        <div
                          className="post-background"
                          style={{
                            backgroundImage: `url(
                              "images/thumbs/featured/featured-2.jpg"
                            )`,
                          }}
                        ></div>

                        <div className="overlay"></div>

                        <div className="post-content">
                          <ul className="entry-meta">
                            <li>August 29, 2016</li>
                            <li>
                              <a href="#">Sasuke Uchiha</a>
                            </li>
                          </ul>

                          <h1 className="slide-title">
                            <a href="single-standard.html" title="">
                              Enhancing Your Designs with Negative Space
                            </a>
                          </h1>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="featured-post-slide">
                        <div
                          className="post-background"
                          style={{
                            backgroundImage: `url(
                              "images/thumbs/featured/featured-3.jpg"
                            )`,
                          }}
                        ></div>

                        <div className="overlay"></div>

                        <div className="post-content">
                          <ul className="entry-meta">
                            <li>August 27, 2016</li>
                            <li>
                              <a href="#" className="author">
                                Naruto Uzumaki
                              </a>
                            </li>
                          </ul>

                          <h1 className="slide-title">
                            <a href="single-standard.html" title="">
                              Music Album Cover Designs for Inspiration
                            </a>
                          </h1>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <article className="brick entry format-standard animate-this">
              <div className="entry-thumb">
                <a href="single-standard.html" className="thumb-link">
                  <Image
                    src="/images/thumbs/diagonal-building.jpg"
                    alt="building"
                    width={800}
                    height={800}
                  />
                </a>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <a href="#">Design</a>
                      <a href="#">Photography</a>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <a href="single-standard.html">
                      Just a Standard Format Post.
                    </a>
                  </h1>
                </div>
                <div className="entry-excerpt">
                  Lorem ipsum Sed eiusmod esse aliqua sed incididunt aliqua
                  incididunt mollit id et sit proident dolor nulla sed commodo
                  est ad minim elit reprehenderit nisi officia aute incididunt
                  velit sint in aliqua cillum in consequat consequat in culpa in
                  anim.
                </div>
              </div>
            </article>

            <article className="brick entry format-standard animate-this">
              <div className="entry-thumb">
                <a href="single-standard.html" className="thumb-link">
                  <Image
                    src="/images/thumbs/ferris-wheel.jpg"
                    alt="ferris wheel"
                    width={800}
                    height={800}
                  />
                </a>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <a href="#">Design</a>
                      <a href="#">UI</a>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <a href="single-standard.html">
                      This Is Another Standard Format Post.
                    </a>
                  </h1>
                </div>
                <div className="entry-excerpt">
                  Lorem ipsum Sed eiusmod esse aliqua sed incididunt aliqua
                  incididunt mollit id et sit proident dolor nulla sed commodo
                  est ad minim elit reprehenderit nisi officia aute incididunt
                  velit sint in aliqua cillum in consequat consequat in culpa in
                  anim.
                </div>
              </div>
            </article>

            <article className="brick entry format-audio animate-this">
              <div className="entry-thumb">
                <a href="single-audio.html" className="thumb-link">
                  <Image
                    src="/images/thumbs/concert.jpg"
                    alt="concert"
                    width={800}
                    height={800}
                  />
                </a>

                <div className="audio-wrap">
                  <audio
                    id="player"
                    src="media/AirReview-Landmarks-02-ChasingCorporate.mp3"
                    width="100%"
                    height="42"
                    controls="controls"
                  ></audio>
                </div>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <a href="#">Design</a>
                      <a href="#">Music</a>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <a href="single-audio.html">This Is a Audio Format Post.</a>
                  </h1>
                </div>
                <div className="entry-excerpt">
                  Lorem ipsum Sed eiusmod esse aliqua sed incididunt aliqua
                  incididunt mollit id et sit proident dolor nulla sed commodo
                  est ad minim elit reprehenderit nisi officia aute incididunt
                  velit sint in aliqua cillum in consequat consequat in culpa in
                  anim.
                </div>
              </div>
            </article>

            <article className="brick entry format-quote animate-this">
              <div className="entry-thumb">
                <blockquote>
                  <p>
                    Good design is making something intelligible and memorable.
                    Great design is making something memorable and meaningful.
                  </p>

                  <cite>Dieter Rams</cite>
                </blockquote>
              </div>
            </article>

            <article className="brick entry animate-this">
              <div className="entry-thumb">
                <a href="single-standard.html" className="thumb-link">
                  <Image
                    src="/images/thumbs/shutterbug.jpg"
                    alt="Shutterbug"
                    width={800}
                    height={800}
                  />
                </a>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <a href="#">Photography</a>
                      <a href="#">html</a>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <a href="single-standard.html">
                      Photography Skills Can Improve Your Graphic Design.
                    </a>
                  </h1>
                </div>
                <div className="entry-excerpt">
                  Lorem ipsum Sed eiusmod esse aliqua sed incididunt aliqua
                  incididunt mollit id et sit proident dolor nulla sed commodo
                  est ad minim elit reprehenderit nisi officia aute incididunt
                  velit sint in aliqua cillum in consequat consequat in culpa in
                  anim.
                </div>
              </div>
            </article>

            <article className="brick entry animate-this">
              <div className="entry-thumb">
                <a href="single-standard.html" className="thumb-link">
                  <Image
                    src="/images/thumbs/usaf-rocket.jpg"
                    alt="USAF rocket"
                    width={800}
                    height={800}
                  />
                </a>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <a href="#">Branding</a>
                      <a href="#">Mockup</a>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <a href="single-standard.html">
                      The 10 Golden Rules of Clean Simple Design.
                    </a>
                  </h1>
                </div>
                <div className="entry-excerpt">
                  Lorem ipsum Sed eiusmod esse aliqua sed incididunt aliqua
                  incididunt mollit id et sit proident dolor nulla sed commodo
                  est ad minim elit reprehenderit nisi officia aute incididunt
                  velit sint in aliqua cillum in consequat consequat in culpa in
                  anim.
                </div>
              </div>
            </article>

            <article className="brick entry format-gallery group animate-this">
              <div className="entry-thumb">
                <div className="post-slider flexslider">
                  <ul className="slides">
                    <li>
                      <Image
                        src="/images/thumbs/gallery/work1.jpg"
                        alt="work1"
                        width={800}
                        height={800}
                      />
                    </li>
                    <li>
                      <Image
                        src="/images/thumbs/gallery/work2.jpg"
                        alt="work2"
                        width={800}
                        height={800}
                      />
                    </li>
                    <li>
                      <Image
                        src="/images/thumbs/gallery/work3.jpg"
                        alt="work3"
                        width={800}
                        height={800}
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <a href="#">Branding</a>
                      <a href="#">Wordpress</a>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <a href="single-gallery.html">
                      Workspace Design Trends and Ideas.
                    </a>
                  </h1>
                </div>
                <div className="entry-excerpt">
                  Lorem ipsum Sed eiusmod esse aliqua sed incididunt aliqua
                  incididunt mollit id et sit proident dolor nulla sed commodo
                  est ad minim elit reprehenderit nisi officia aute incididunt
                  velit sint in aliqua cillum in consequat consequat in culpa in
                  anim.
                </div>
              </div>
            </article>

            <article className="brick entry format-link animate-this">
              <div className="entry-thumb">
                <div className="link-wrap">
                  <p>
                    Looking for affordable &amp; reliable web hosting? We
                    recommend Dreamhost.
                  </p>
                  <cite>
                    <a
                      target="_blank"
                      href="http://www.dreamhost.com/r.cgi?287326"
                    >
                      http://www.dreamhost.com
                    </a>
                  </cite>
                </div>
              </div>
            </article>

            <article className="brick entry animate-this">
              <div className="entry-thumb">
                <a href="single-standard.html" className="thumb-link">
                  <Image
                    src="/images/thumbs/diagonal-pattern.jpg"
                    alt="Pattern"
                    width={800}
                    height={800}
                  />
                </a>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <a href="#">Design</a>
                      <a href="#">UI</a>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <a href="single-standard.html">
                      You Can See Patterns Everywhere.
                    </a>
                  </h1>
                </div>
                <div className="entry-excerpt">
                  Lorem ipsum Sed eiusmod esse aliqua sed incididunt aliqua
                  incididunt mollit id et sit proident dolor nulla sed commodo
                  est ad minim elit reprehenderit nisi officia aute incididunt
                  velit sint in aliqua cillum in consequat consequat in culpa in
                  anim.
                </div>
              </div>
            </article>

            <article className="brick entry format-video animate-this">
              <div className="entry-thumb video-image">
                <a
                  href="http://player.vimeo.com/video/14592941?title=0&amp;byline=0&amp;portrait=0&amp;color=F64B39"
                  data-lity
                >
                  <Image
                    src="/images/thumbs/ottawa-bokeh.jpg"
                    alt="bokeh"
                    width={800}
                    height={800}
                  />
                </a>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <a href="#">Design</a>
                      <a href="#">Branding</a>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <a href="single-video.html">This Is a Video Post Format.</a>
                  </h1>
                </div>
                <div className="entry-excerpt">
                  Lorem ipsum Sed eiusmod esse aliqua sed incididunt aliqua
                  incididunt mollit id et sit proident dolor nulla sed commodo
                  est ad minim elit reprehenderit nisi officia aute incididunt
                  velit sint in aliqua cillum in consequat consequat in culpa in
                  anim.
                </div>
              </div>
            </article>

            <article className="brick entry animate-this">
              <div className="entry-thumb">
                <a href="single-standard.html" className="thumb-link">
                  <Image
                    src="/images/thumbs/lighthouse.jpg"
                    alt="Lighthouse"
                    width={800}
                    height={800}
                  />
                </a>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <a href="#">Photography</a>
                      <a href="#">Design</a>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <a href="single-standard.html">
                      Breathtaking Photos of Lighthouses.
                    </a>
                  </h1>
                </div>
                <div className="entry-excerpt">
                  Lorem ipsum Sed eiusmod esse aliqua sed incididunt aliqua
                  incididunt mollit id et sit proident dolor nulla sed commodo
                  est ad minim elit reprehenderit nisi officia aute incididunt
                  velit sint in aliqua cillum in consequat consequat in culpa in
                  anim.
                </div>
              </div>
            </article>

            <article className="brick entry animate-this">
              <div className="entry-thumb">
                <a href="single-standard.html" className="thumb-link">
                  <Image
                    src="/images/thumbs/liberty.jpg"
                    alt="Liberty"
                    width={800}
                    height={800}
                  />
                </a>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <a href="#">Branding</a>
                      <a href="#">html</a>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <a href="single-standard.html">
                      Designing With Black and White.
                    </a>
                  </h1>
                </div>
                <div className="entry-excerpt">
                  Lorem ipsum Sed eiusmod esse aliqua sed incididunt aliqua
                  incididunt mollit id et sit proident dolor nulla sed commodo
                  est ad minim elit reprehenderit nisi officia aute incididunt
                  velit sint in aliqua cillum in consequat consequat in culpa in
                  anim.
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="row">
          <nav className="pagination">
            <span className="page-numbers prev inactive">Prev</span>
            <span className="page-numbers current">1</span>
            <a href="#" className="page-numbers">
              2
            </a>
            <a href="#" className="page-numbers">
              3
            </a>
            <a href="#" className="page-numbers">
              4
            </a>
            <a href="#" className="page-numbers">
              5
            </a>
            <a href="#" className="page-numbers">
              6
            </a>
            <a href="#" className="page-numbers">
              7
            </a>
            <a href="#" className="page-numbers">
              8
            </a>
            <a href="#" className="page-numbers">
              9
            </a>
            <a href="#" className="page-numbers next">
              Next
            </a>
          </nav>
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
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>

            <div className="col-two tab-1-3 mob-1-2 social-links">
              <h4>Social</h4>

              <ul>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Dribbble</a>
                </li>
                <li>
                  <a href="#">Google+</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
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
                  Design by <a href="http://www.styleshout.com/">styleshout</a>
                </span>
              </div>

              <div id="go-top">
                <a className="smoothscroll" title="Back to Top" href="#top">
                  <i className="icon icon-arrow-up"></i>
                </a>
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
