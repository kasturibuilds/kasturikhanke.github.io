/* eslint-disable react/prop-types */
export default function RollingText({ children }) {
  return <span className="rolling-text">
    <span className="rolling-text-line">{children}</span>
    <span className="rolling-text-line rolling-text-copy" aria-hidden="true">{children}</span>
  </span>;
}
