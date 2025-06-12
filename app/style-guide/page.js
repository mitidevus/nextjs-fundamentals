import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function StyleGuide() {
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
              <li className="current">
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

      <div id="content-wrap" className="styles">
        <div className="row narrow add-bottom text-center">
          <div className="col-twelve tab-full">
            <h1>Style Guide Page.</h1>

            <p className="lead">
              Lorem ipsum Officia elit ad tempor dolore est ex incididunt
              incididunt occaecat culpa deserunt sunt labore in cillum ullamco
              magna in Excepteur consequat in reprehenderit proident mollit
              incididunt officia commodo. Duis ea officia sed dolor pariatur
              enim dolore dolore quis incididunt nulla exercitation commodo
              veniam et ea incididunt.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-six tab-full">
            <h3>Paragraph and Image</h3>

            <p>
              <Link href="#">
                <Image
                  width="120"
                  height="120"
                  className="pull-left"
                  alt="sample-image"
                  src="/images/sample-image.jpg"
                />
              </Link>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              libero. Suspendisse bibendum.Cras id urna. Morbi tincidunt, orci
              ac convallis aliquam, lectus turpis varius lorem, eu posuere nunc
              justo tempus leo. Donec mattis, purus nec placerat bibendum, dui
              pede condimentum odio, ac blandit ante orci ut diam. Cras
              fringilla magna. Phasellus suscipit, leo a pharetra condimentum,
              lorem tellus eleifend magna, eget fringilla velit magna id neque
              posuere nunc justo tempus leo.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              libero. Suspendisse bibendum. Cras id urna. Morbi tincidunt, orci
              ac convallis aliquam, lectus turpis varius lorem, eu posuere nunc
              justo tempus leo. Donec mattis, purus nec placerat bibendum, dui
              pede condimentumodio, ac blandit ante orci ut diam.
            </p>

            <p>
              A <Link href="#">link</Link>,
              <abbr title="this really isn't a very good description">
                abbrebation
              </abbr>
              , <strong>strong text</strong>, <em>em text</em>,
              <del>deleted text</del>, and
              <mark>this is a mark text.</mark>
              <code>.code</code>
            </p>
          </div>

          <div className="col-six tab-full">
            <h3>Drop Caps</h3>

            <p className="drop-cap">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean. A small river named Duden flows by their
              place and supplies it with the necessary regelialia. Morbi
              tincidunt, orci ac convallis aliquam, lectus turpis varius lorem,
              eu posuere nunc justo tempus leo. Donec mattis, purus nec placerat
              bibendum, dui pede condimentum odio, ac blandit ante orci ut diam.
              Cras fringilla magna. Phasellus suscipit, leo a pharetra
              condimentum, lorem tellus eleifend magna, eget fringilla velit
              magna id neque.
            </p>

            <h3>Small Print</h3>

            <p>
              Buy one widget, get one free!
              <small>
                (While supplies last. Offer expires on the vernal equinox. Not
                valid in Ohio.)
              </small>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-six tab-full">
            <h3>Pull Quotes</h3>

            <aside className="pull-quote">
              <blockquote>
                <p>
                  It is a paradisematic country, in which roasted parts of
                  sentences fly into your mouth. Even the all-powerful Pointing
                  has no control about the blind texts it is an almost
                  unorthographic life One day however a small line of blind text
                  by the name of Lorem Ipsum decided to leave for the far World
                  of Grammar.
                </p>
              </blockquote>
            </aside>
          </div>

          <div className="col-six tab-full">
            <h3>Block Quotes</h3>

            <blockquote cite="http://where-i-got-my-info-from.com">
              <p>
                Your work is going to fill a large part of your life, and the
                only way to be truly satisfied is to do what you believe is
                great work. And the only way to do great work is to love what
                you do. If you haven&apos;t found it yet, keep looking.
                Don&apos;t settle. As with all matters of the heart, you&apos;ll
                know when you find it.
              </p>
              <cite>
                <Link href="#">Steve Jobs</Link>
              </cite>
            </blockquote>

            <blockquote>
              <p>Good design is as little design as possible.</p>
              <cite>Dieter Rams</cite>
            </blockquote>
          </div>
        </div>

        <div className="row half-bottom">
          <div className="col-six tab-full">
            <h3>Example Lists</h3>

            <ol>
              <li>Here is an example</li>
              <li>of an ordered list.</li>
              <li>
                A parent list item.
                <ul>
                  <li>one</li>
                  <li>two</li>
                  <li>three</li>
                </ul>
              </li>
              <li>A list item.</li>
            </ol>

            <ul className="disc">
              <li>Here is an example</li>
              <li>of an unordered list.</li>
            </ul>

            <h3>Definition Lists</h3>

            <h5>a) Multi-line Definitions (default)</h5>

            <dl>
              <dt>
                <strong>This is a term</strong>
              </dt>
              <dd>
                this is the definition of that term, which both live in a
                <code>dl</code>.
              </dd>
              <dt>
                <strong>Another Term</strong>
              </dt>
              <dd>And it gets a definition too, which is this line</dd>
              <dd>
                This is a 2<sup>nd</sup> definition for a single term. A
                <code>dt</code> may be followed by multiple <code>dd</code>s.
              </dd>
            </dl>
          </div>

          <div className="col-six tab-full">
            <h3>Headers</h3>

            <h1>H1 Heading</h1>
            <h2>H2 Heading</h2>
            <h3>H3 Heading</h3>
            <h4>H4 Heading</h4>
            <h5>H5 Heading</h5>
            <h6>H6 Heading</h6>

            <h3>Buttons</h3>

            <p>
              <Link className="button button-primary full-width" href="#">
                Primary Button
              </Link>
              <Link className="button full-width" href="#">
                Default Button
              </Link>
            </p>
          </div>
        </div>

        <div className="row half-bottom">
          <div className="col-twelve">
            <h3>Stats Tabs</h3>

            <ul className="stats-tabs">
              <li>
                <Link href="#">
                  1,234 <em>Sasuke</em>
                </Link>
              </li>
              <li>
                <Link href="#">
                  567 <em>Hinata</em>
                </Link>
              </li>
              <li>
                <Link href="#">
                  23,456 <em>Naruto</em>
                </Link>
              </li>
              <li>
                <Link href="#">
                  3,456 <em>Kiba</em>
                </Link>
              </li>
              <li>
                <Link href="#">
                  456 <em>Shikamaru</em>
                </Link>
              </li>
              <li>
                <Link href="#">
                  26 <em>Sakura</em>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="row half-bottom">
          <div className="col-six tab-full">
            <h3>Responsive Image</h3>
            <p>
              <Image
                src="/images/shutterbug.jpg"
                alt="shutterbug"
                width={800}
                height={800}
              />
            </p>
          </div>

          <div className="col-six tab-full">
            <h3>Responsive video</h3>

            <div className="fluid-video-wrapper">
              <iframe
                src="http://player.vimeo.com/video/14592941?title=0&amp;byline=0&amp;portrait=0&amp;color=F64B39"
                width="500"
                height="281"
                frameBorder="0"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
        </div>

        <div className="row add-bottom">
          <div className="col-twelve">
            <h3>Tables</h3>
            <p>
              Be sure to use properly formed table markup with
              <code>&lt;thead&gt;</code> and <code>&lt;tbody&gt;</code> when
              building a <code>table</code>.
            </p>

            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Naruto Uzumaki</td>
                    <td>16</td>
                    <td>Male</td>
                    <td>Konoha</td>
                  </tr>
                  <tr>
                    <td>Sakura Haruno</td>
                    <td>16</td>
                    <td>Female</td>
                    <td>Konoha</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-six tab-full">
            <h3>Form Styles</h3>

            <form>
              <div>
                <label htmlFor="sampleInput">Your email</label>
                <input
                  className="full-width"
                  type="email"
                  placeholder="test@mailbox.com"
                  id="sampleInput"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="sampleRecipientInput">
                  Reason for contacting
                </label>
                <div className="ss-custom-select">
                  <select className="full-width" id="sampleRecipientInput">
                    <option value="Option 1">Questions</option>
                    <option value="Option 2">Report</option>
                    <option value="Option 3">Others</option>
                  </select>
                </div>
              </div>

              <label htmlFor="exampleMessage">Message</label>
              <textarea
                className="full-width"
                placeholder="Your message"
                id="exampleMessage"
              ></textarea>

              <label className="add-bottom">
                <input type="checkbox" readOnly />
                <span className="label-text">Send a copy to yourself</span>
              </label>

              <input
                className="button-primary full-width-on-mobile"
                type="submit"
                value="Submit"
                readOnly
              />
            </form>
          </div>

          <div className="col-six tab-full">
            <h3>Code Block</h3>

            <pre>
              <code></code>
            </pre>

            <h3>Alert Boxes</h3>

            <div className="alert-box ss-error hideit">
              <p>Error Message. Your Message Goes Here.</p>
              <i className="fa fa-times close"></i>
            </div>

            <div className="alert-box ss-success hideit">
              <p>Success Message. Your Message Goes Here.</p>
              <i className="fa fa-times close"></i>
            </div>

            <div className="alert-box ss-info hideit">
              <p>Info Message. Your Message Goes Here.</p>
              <i className="fa fa-times close"></i>
            </div>

            <div className="alert-box ss-notice hideit">
              <p>Notice Message. Your Message Goes Here.</p>
              <i className="fa fa-times close"></i>
            </div>
          </div>
        </div>
      </div>

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
