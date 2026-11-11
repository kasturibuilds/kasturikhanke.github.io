import './MobileProjectPreviews.css';

function projectPhotograph(project, alt) {
  return <img className="photographic-project-cover" src={`/thumbnails/photographic-${project}.png`} alt={alt} draggable="false" />;
}

export function SpacesPreview() {
  return projectPhotograph('spaces', 'PDF Spaces on a phone resting on a cobalt-blue table in sunlight');
}
export function AssistantPreview() {
  return projectPhotograph('assistant', 'Adobe AI Assistant on a phone resting on warm limestone');
}
export function SezzlePreview() {
  return projectPhotograph('sezzle', 'Sezzle Up on a phone resting on a sage-green table');
}
export function LowstakesPreview() {
  return projectPhotograph('lowstakes', 'Lowstakes app on a phone resting on an oak table in afternoon sunlight');
}
