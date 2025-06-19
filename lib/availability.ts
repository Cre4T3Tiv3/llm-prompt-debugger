export async function validateModelAvailability(model: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/model-availability?model=${encodeURIComponent(model)}`);
    if (!res.ok) return false;
    const data = await res.json();
    return data.available;
  } catch {
    return false;
  }
}
