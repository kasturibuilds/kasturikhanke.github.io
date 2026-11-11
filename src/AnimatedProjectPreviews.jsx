// Matrix preview adapted from Generative Loaders' matrix variant.
// Copyright (c) 2026 Kasturi Khanke and Generative Loaders contributors.
// MIT license: ../docs/generative-loaders-LICENSE.txt
export function LoaderPreview() {
  return <span className="live-preview loader-preview" aria-hidden="true">
    <span className="preview-matrix">
      {Array.from({ length: 25 }, (_, i) => {
        const distance = Math.abs(i % 5 - 2) + Math.abs(Math.floor(i / 5) - 2);
        return <i key={i} style={{ width: `${72 - distance * 7}%`, animationDelay: `${distance * -.13 - i * .008}s` }} />;
      })}
    </span>
  </span>;
}

// A close crop of Mono Editorial marks, composed for a thumbnail rather than a dashboard.
export function ChartPreview() {
  return <span className="live-preview chart-preview" aria-hidden="true">
    <svg className="chart-cover" viewBox="0 0 720 960" fill="none">
      <rect width="720" height="960" fill="#f3f3f1" />
      <rect x="60" y="170" width="600" height="620" rx="12" fill="white" />
      {[330, 440, 550, 660].map(y => <path key={y} d={`M116 ${y}H604`} stroke="#e9e9e5" strokeWidth="1" />)}
      {[146, 232, 196, 310, 366, 426].map((height, i) => <rect className="chart-cover-bar" style={{ animationDelay: `${i * -.15}s` }} key={i} x={126 + i * 80} y={660 - height} width="44" height={height} stroke="#242424" strokeWidth="2" fill="white" />)}
      <path d="M116 660H604" stroke="#242424" strokeWidth="2" />
    </svg>
  </span>;
}
