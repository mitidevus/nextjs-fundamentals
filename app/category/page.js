import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function CategoryPage() {
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
              <li className="has-children current">
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
              <li>
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

      <section id="page-header">
        <div className="row current-cat">
          <div className="col-full">
            <h1>Category: Photography</h1>
          </div>
        </div>
      </section>

      <section id="bricks" className="with-top-sep">
        <div className="row masonry">
          <div className="bricks-wrapper">
            <div className="grid-sizer"></div>

            <article className="brick entry format-standard animate-this">
              <div className="entry-thumb">
                <Link href="/single-standard" className="thumb-link">
                  <Image
                    src="/images/thumbs/diagonal-building.jpg"
                    alt="building"
                    width={800}
                    height={800}
                  />
                </Link>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <Link href="#">Design</Link>
                      <Link href="#">Photography</Link>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <Link href="/single-standard">
                      Just a Standard Format Post.
                    </Link>
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
                <Link href="/single-standard" className="thumb-link">
                  <Image
                    src="/images/thumbs/ferris-wheel.jpg"
                    alt="ferris wheel"
                    width={800}
                    height={800}
                  />
                </Link>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <Link href="#">Design</Link>
                      <Link href="#">UI</Link>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <Link href="/single-standard">
                      This Is Another Standard Format Post.
                    </Link>
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
                <Link href="/single-audio" className="thumb-link">
                  <Image
                    src="/images/thumbs/concert.jpg"
                    alt="concert"
                    width={800}
                    height={800}
                  />
                </Link>

                <div className="audio-wrap">
                  <audio
                    id="player2"
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
                      <Link href="#">Design</Link>
                      <Link href="#">Music</Link>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <Link href="/single-audio">
                      This Is a Audio Format Post.
                    </Link>
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

            <article className="brick entry format-standard animate-this">
              <div className="entry-thumb">
                <Link href="/single-standard" className="thumb-link">
                  <Image
                    src="/images/thumbs/shutterbug.jpg"
                    alt="Shutterbug"
                    width={800}
                    height={800}
                  />
                </Link>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <Link href="#">Photography</Link>
                      <Link href="#">html</Link>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <Link href="/single-standard">
                      Photography Skills Can Improve Your Graphic Design.
                    </Link>
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
                <Link href="/single-standard" className="thumb-link">
                  <Image
                    src="/images/thumbs/usaf-rocket.jpg"
                    alt="USAF rocket"
                    width={800}
                    height={800}
                  />
                </Link>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <Link href="#">Branding</Link>
                      <Link href="#">Mockup</Link>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <Link href="/single-standard">
                      The 10 Golden Rules of Clean Simple Design.
                    </Link>
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
                      <Link href="#">Branding</Link>
                      <Link href="#">Wordpress</Link>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <Link href="/single-gallery">
                      Workspace Design Trends and Ideas.
                    </Link>
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
                    <Link
                      target="_blank"
                      href="http://www.dreamhost.com/r.cgi?287326"
                    >
                      http://www.dreamhost.com
                    </Link>
                  </cite>
                </div>
              </div>
            </article>

            <article className="brick entry animate-this">
              <div className="entry-thumb">
                <Link href="/single-standard" className="thumb-link">
                  <Image
                    src="/images/thumbs/diagonal-pattern.jpg"
                    alt="Pattern"
                    width={800}
                    height={800}
                  />
                </Link>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <Link href="#">Design</Link>
                      <Link href="#">UI</Link>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <Link href="/single-standard">
                      You Can See Patterns Everywhere.
                    </Link>
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
                <Link
                  href="http://player.vimeo.com/video/14592941?title=0&amp;byline=0&amp;portrait=0&amp;color=F64B39"
                  data-lity
                >
                  <Image
                    src="/images/thumbs/ottawa-bokeh.jpg"
                    alt="bokeh"
                    width={800}
                    height={800}
                  />
                </Link>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <Link href="#">Design</Link>
                      <Link href="#">Branding</Link>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <Link href="/single-video">
                      This Is a Video Post Format.
                    </Link>
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
                <Link href="/single-standard" className="thumb-link">
                  <Image
                    src="/images/thumbs/lighthouse.jpg"
                    alt="Lighthouse"
                    width={800}
                    height={800}
                  />
                </Link>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <Link href="#">Photography</Link>
                      <Link href="#">Design</Link>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <Link href="/single-standard">
                      Breathtaking Photos of Lighthouses.
                    </Link>
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
                <Link href="/single-standard" className="thumb-link">
                  <Image
                    src="/images/thumbs/liberty.jpg"
                    alt="Liberty"
                    width={800}
                    height={800}
                  />
                </Link>
              </div>

              <div className="entry-text">
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="cat-links">
                      <Link href="#">Branding</Link>
                      <Link href="#">html</Link>
                    </span>
                  </div>

                  <h1 className="entry-title">
                    <Link href="/single-standard">
                      Designing With Black and White.
                    </Link>
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
            <Link href="#" className="page-numbers">
              2
            </Link>
            <Link href="#" className="page-numbers">
              3
            </Link>
            <Link href="#" className="page-numbers">
              4
            </Link>
            <Link href="#" className="page-numbers">
              5
            </Link>
            <Link href="#" className="page-numbers">
              6
            </Link>
            <Link href="#" className="page-numbers">
              7
            </Link>
            <Link href="#" className="page-numbers">
              8
            </Link>
            <Link href="#" className="page-numbers">
              9
            </Link>
            <Link href="#" className="page-numbers next">
              Next
            </Link>
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

      <Script src="js/jquery-2.1.3.min.js" strategy="beforeInteractive" />
      <Script src="js/plugins.js" />
      <Script src="js/main.js" />
    </>
  );
}
