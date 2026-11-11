// Original demo datasets from Generativecharts/app/components/gallery.tsx.
// These are illustrative gallery data, not portfolio performance metrics.
export const sampleData = [
  { label: "Jan", revenue: 42, target: 38, users: 28, size: 7 }, { label: "Feb", revenue: 58, target: 48, users: 34, size: 10 },
  { label: "Mar", revenue: 51, target: 55, users: 39, size: 8 }, { label: "Apr", revenue: 74, target: 62, users: 46, size: 13 },
  { label: "May", revenue: 82, target: 72, users: 52, size: 15 }, { label: "Jun", revenue: 96, target: 84, users: 61, size: 12 },
];

export const rankedBarData = [{ name: "Nova Chat", signal: 94, type: "AI-native" }, { name: "Atlas AI", signal: 88, type: "AI-native" }, { name: "Assistly", signal: 83, type: "AI-native" }, { name: "InsightOS", signal: 78, type: "AI-native" }, { name: "CanvasPro", signal: 72, type: "AI-enhanced" }, { name: "SearchLab", signal: 69, type: "AI-native" }, { name: "Muse Studio", signal: 61, type: "AI-enhanced" }, { name: "Flowdesk", signal: 58, type: "AI-enhanced" }];

export const heatData = ["Mon", "Tue", "Wed", "Thu", "Fri"].flatMap((day, y) => ["9", "12", "15", "18"].map((time, x) => ({ day, time, value: ((x + 2) * (y + 3) * 13) % 94 + 6 })));

export const terrainData = Array.from({ length: 24 }, (_, index) => {
  const x = index % 6, z = Math.floor(index / 6);
  return { label: `P${index + 1}`, x, z, elevation: Math.round(18 + Math.sin(x * 1.2) * 22 + Math.cos(z * 1.5) * 14 + Math.exp(-((x - 3.8) ** 2 + (z - 1.2) ** 2) / 2.2) * 54) };
});
