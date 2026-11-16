import './SiteFooter.css';

export default function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-container site-footer-columns">
        <div>
          <p>Kasturi is a product designer who gets things done with care, craft, and delight.</p>
          <p>San Francisco, CA</p>
        </div>
        <div>
          <p>Available for freelance product design engagements.</p>
          <a href="mailto:kasturikhanke@gmail.com">kasturikhanke@gmail.com</a>
        </div>
      </div>
      <div className="site-footer-signature" aria-hidden="true">KASTURI KHANKE</div>
    </footer>
  );
}
