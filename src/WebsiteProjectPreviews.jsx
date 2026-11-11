import './WebsiteProjectPreviews.css';

// Actual captures of the project sites. Keep page typography and UI intact.
function websitePreview(name, alternate, mobile = false) {
  return <span className={`website-preview website-preview-${name}`} aria-hidden="true">
    <img className="website-backdrop" src={`/thumbnails/sites/${name}.png`} alt="" draggable="false" />
    <span className="website-sheet website-sheet-primary"><img src={`/thumbnails/sites/${name}.png`} alt="" draggable="false" /></span>
    <span className={`website-sheet website-sheet-secondary${mobile ? ' website-sheet-mobile' : ''}`}><img src={`/thumbnails/sites/${alternate}.png`} alt="" draggable="false" /></span>
  </span>;
}

export function LoadersWebsitePreview() { return websitePreview('loaders', 'loaders-detail'); }
export function ChartsWebsitePreview() { return websitePreview('charts', 'charts-mobile', true); }
export function LowstakesAppPreview() {
  return <span className="lowstakes-app-preview" aria-hidden="true">
    <span className="lowstakes-app-phone"><img src="/thumbnails/lowstakes-app.png" alt="" draggable="false" /></span>
  </span>;
}
