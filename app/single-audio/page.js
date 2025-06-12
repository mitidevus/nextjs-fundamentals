import Image from "next/image";
import Link from "next/link";

export default function SingleAudio() {
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
              <li className="has-children current">
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

      <section id="content-wrap" className="blog-single">
        <div className="row">
          <div className="col-twelve">
            <article className="format-audio">
              <div className="content-media">
                <div className="post-thumb">
                  <Image
                    src="/images/thumbs/single/single-02.jpg"
                    alt="single2"
                    width={800}
                    height={800}
                  />
                </div>
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

              <div className="primary-content">
                <h1 className="entry-title">
                  Hey, This Is an Audio Format Post.
                </h1>

                <ul className="entry-meta">
                  <li className="date">October 09, 2015</li>
                  <li className="cat">
                    <Link href="">Wordpress</Link>
                    <Link href="">Design</Link>
                  </li>
                </ul>

                <p className="lead">
                  Duis ex ad cupidatat tempor Excepteur cillum cupidatat fugiat
                  nostrud cupidatat dolor sunt sint sit nisi est eu exercitation
                  incididunt adipisicing veniam velit id fugiat enim mollit amet
                  anim veniam dolor dolor irure velit commodo cillum sit nulla
                  ullamco magna amet magna cupidatat qui labore cillum sit in
                  tempor veniam consequat non laborum adipisicing aliqua ea nisi
                  sint.
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

                <p>
                  <Image
                    src="/images/shutterbug.jpg"
                    alt=""
                    width={800}
                    height={800}
                  />
                </p>

                <h2>Large Heading</h2>

                <p>
                  Harum quidem rerum facilis est et expedita distinctio. Nam
                  libero tempore, cum soluta nobis est eligendi optio cumque
                  nihil impedit quo minus{" "}
                  <Link href="#">omnis voluptas assumenda est</Link> id quod
                  maxime placeat facere possimus, omnis dolor repellendus.
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et.
                </p>

                <blockquote>
                  <p>
                    This is a simple example of a styled blockquote. A
                    blockquote tag typically specifies a section that is quoted
                    from another source of some sort, or highlighting text in
                    your post.
                  </p>
                </blockquote>

                <p>
                  Odio dignissimos ducimus qui blanditiis praesentium voluptatum
                  deleniti atque corrupti dolores et quas molestias excepturi
                  sint occaecati cupiditate non provident, similique sunt in
                  culpa. Aenean eu leo quam. Pellentesque ornare sem lacinia
                  quam venenatis vestibulum. Nulla vitae elit libero, a pharetra
                  augue laboris in sit minim cupidatat ut dolor voluptate enim
                  veniam consequat occaecat fugiat in adipisicing in amet Ut
                  nulla nisi non ut enim aliqua laborum mollit quis nostrud sed
                  sed..
                </p>

                <h3>Smaller Heading</h3>

                <p>
                  Quidem rerum facilis est et expedita distinctio. Nam libero
                  tempore, cum soluta nobis est eligendi optio cumque nihil
                  impedit quo minus id quod maxime placeat facere possimus,
                  omnis voluptas assumenda est, omnis dolor repellendus.
                </p>

                <p>
                  Quidem rerum facilis est et expedita distinctio. Nam libero
                  tempore, cum soluta nobis est eligendi optio cumque nihil
                  impedit quo minus id quod maxime placeat facere possimus,
                  omnis voluptas assumenda est, omnis dolor repellendus.
                </p>

                <pre>
                  <code></code>
                </pre>

                <p>
                  Odio dignissimos ducimus qui blanditiis praesentium voluptatum
                  deleniti atque corrupti dolores et quas molestias excepturi
                  sint occaecati cupiditate non provident, similique sunt in
                  culpa.
                </p>

                <ul>
                  <li>
                    Donec nulla non metus auctor fringilla.
                    <ul>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                  </li>
                  <li>Donec nulla non metus auctor fringilla.</li>
                  <li>Donec nulla non metus auctor fringilla.</li>
                </ul>

                <p>
                  Odio dignissimos ducimus qui blanditiis praesentium voluptatum
                  deleniti atque corrupti dolores et quas molestias excepturi
                  sint occaecati cupiditate non provident, similique sunt in
                  culpa. Aenean eu leo quam. Pellentesque ornare sem lacinia
                  quam venenatis vestibulum. Nulla vitae elit libero, a pharetra
                  augue laboris in sit minim cupidatat ut dolor voluptate enim
                  veniam consequat occaecat fugiat in adipisicing in amet Ut
                  nulla nisi non ut enim aliqua laborum mollit quis nostrud sed
                  sed..
                </p>

                <p className="tags">
                  <span>Tagged in :</span>
                  <Link href="#">orci</Link>
                  <Link href="#">lectus</Link>
                  <Link href="#">varius</Link>
                  <Link href="#">turpis</Link>
                </p>

                <div className="author-profile">
                  <Image
                    src="/images/avatars/user-05.jpg"
                    alt=""
                    width={800}
                    height={800}
                  />

                  <div className="about">
                    <h4>
                      <Link href="#">Jonathan Smith</Link>
                    </h4>

                    <p>
                      Alias aperiam at debitis deserunt dignissimos dolorem
                      doloribus, fuga fugiat impedit laudantium magni maxime
                      nihil nisi quidem quisquam sed ullam voluptas voluptatum.
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>

                    <ul className="author-social">
                      <li>
                        <Link href="#">Facebook</Link>
                      </li>
                      <li>
                        <Link href="#">Twitter</Link>
                      </li>
                      <li>
                        <Link href="#">GooglePlus</Link>
                      </li>
                      <li>
                        <Link href="#">Instagram</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pagenav group">
                <div className="prev-nav">
                  <Link href="#" rel="prev">
                    <span>Previous</span>
                    Tips on Minimalist Design
                  </Link>
                </div>
                <div className="next-nav">
                  <Link href="#" rel="next">
                    <span>Next</span>
                    Less Is More
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="comments-wrap">
          <div id="comments" className="row">
            <div className="col-full">
              <h3>5 Comments</h3>

              <ol className="commentlist">
                <li className="depth-1">
                  <div className="avatar">
                    <Image
                      width="50"
                      height="50"
                      className="avatar"
                      src="/images/avatars/user-01.jpg"
                      alt=""
                    />
                  </div>

                  <div className="comment-content">
                    <div className="comment-info">
                      <cite>Itachi Uchiha</cite>

                      <div className="comment-meta">
                        <time
                          className="comment-time"
                          dateTime="2014-07-12T23:05"
                        >
                          Jul 12, 2014 @ 23:05
                        </time>
                        <span className="sep">/</span>
                        <Link className="reply" href="#">
                          Reply
                        </Link>
                      </div>
                    </div>

                    <div className="comment-text">
                      <p>
                        Adhuc quaerendum est ne, vis ut harum tantas noluisse,
                        id suas iisque mei. Nec te inani ponderum vulputate,
                        facilisi expetenda has et. Iudico dictas scriptorem an
                        vim, ei alia mentitum est, ne has voluptua praesent.
                      </p>
                    </div>
                  </div>
                </li>

                <li className="thread-alt depth-1">
                  <div className="avatar">
                    <Image
                      width="50"
                      height="50"
                      className="avatar"
                      src="/images/avatars/user-04.jpg"
                      alt=""
                    />
                  </div>

                  <div className="comment-content">
                    <div className="comment-info">
                      <cite>John Doe</cite>

                      <div className="comment-meta">
                        <time
                          className="comment-time"
                          dateTime="2014-07-12T24:05"
                        >
                          Jul 12, 2014 @ 24:05
                        </time>
                        <span className="sep">/</span>
                        <Link className="reply" href="#">
                          Reply
                        </Link>
                      </div>
                    </div>

                    <div className="comment-text">
                      <p>
                        Sumo euismod dissentiunt ne sit, ad eos iudico qualisque
                        adversarium, tota falli et mei. Esse euismod urbanitas
                        ut sed, et duo scaevola pericula splendide. Primis
                        veritus contentiones nec ad, nec et tantas semper
                        delicatissimi.
                      </p>
                    </div>
                  </div>

                  <ul className="children">
                    <li className="depth-2">
                      <div className="avatar">
                        <Image
                          width="50"
                          height="50"
                          className="avatar"
                          src="/images/avatars/user-03.jpg"
                          alt=""
                        />
                      </div>

                      <div className="comment-content">
                        <div className="comment-info">
                          <cite>Kakashi Hatake</cite>

                          <div className="comment-meta">
                            <time
                              className="comment-time"
                              dateTime="2014-07-12T25:05"
                            >
                              Jul 12, 2014 @ 25:05
                            </time>
                            <span className="sep">/</span>
                            <Link className="reply" href="#">
                              Reply
                            </Link>
                          </div>
                        </div>

                        <div className="comment-text">
                          <p>
                            Duis sed odio sit amet nibh vulputate cursus a sit
                            amet mauris. Morbi accumsan ipsum velit. Duis sed
                            odio sit amet nibh vulputate cursus a sit amet
                            mauris
                          </p>
                        </div>
                      </div>

                      <ul className="children">
                        <li className="depth-3">
                          <div className="avatar">
                            <Image
                              width="50"
                              height="50"
                              className="avatar"
                              src="/images/avatars/user-04.jpg"
                              alt=""
                            />
                          </div>

                          <div className="comment-content">
                            <div className="comment-info">
                              <cite>John Doe</cite>

                              <div className="comment-meta">
                                <time
                                  className="comment-time"
                                  dateTime="2014-07-12T25:15"
                                >
                                  July 12, 2014 @ 25:15
                                </time>
                                <span className="sep">/</span>
                                <Link className="reply" href="#">
                                  Reply
                                </Link>
                              </div>
                            </div>

                            <div className="comment-text">
                              <p>
                                Investigationes demonstraverunt lectores legere
                                me lius quod ii legunt saepius. Claritas est
                                etiam processus dynamicus, qui sequitur
                                mutationem consuetudium lectorum.
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li className="depth-1">
                  <div className="avatar">
                    <Image
                      width="50"
                      height="50"
                      className="avatar"
                      src="/images/avatars/user-02.jpg"
                      alt=""
                    />
                  </div>

                  <div className="comment-content">
                    <div className="comment-info">
                      <cite>Shikamaru Nara</cite>

                      <div className="comment-meta">
                        <time
                          className="comment-time"
                          dateTime="2014-07-12T25:15"
                        >
                          July 12, 2014 @ 25:15
                        </time>
                        <span className="sep">/</span>
                        <Link className="reply" href="#">
                          Reply
                        </Link>
                      </div>
                    </div>

                    <div className="comment-text">
                      <p>
                        Typi non habent claritatem insitam; est usus legentis in
                        iis qui facit eorum claritatem.
                      </p>
                    </div>
                  </div>
                </li>
              </ol>

              <div className="respond">
                <h3>Leave a Comment</h3>

                <form
                  name="contactForm"
                  id="contactForm"
                  method="post"
                  action=""
                >
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

                    <button type="submit" className="submit button-primary">
                      Submit
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
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
