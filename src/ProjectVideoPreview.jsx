/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';

export default function ProjectVideoPreview({ name, version, poster, active, paused }) {
  const video = useRef(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (active && !paused) setRequested(true);
  }, [active, paused]);

  useEffect(() => {
    const node = video.current;
    if (!node) return;
    if (active && !paused && requested) node.play().catch(() => {});
    else node.pause();
  }, [active, paused, requested]);

  return <span className="project-video-preview" data-preview={name} aria-hidden="true">
    <img src={poster} alt="" draggable="false" loading={active ? 'eager' : 'lazy'} style={{ opacity: loaded && !failed ? 0 : 1 }} />
    {!failed && <video ref={video} src={requested ? `/previews/${name}.mp4${version ? `?v=${version}` : ''}` : undefined} poster={poster} muted loop playsInline preload="none" tabIndex={-1} onLoadedData={() => setLoaded(true)} onError={() => setFailed(true)} style={{ opacity: loaded ? 1 : 0 }} />}
  </span>;
}
