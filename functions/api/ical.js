export async function onRequest(context) {
  const CALENDAR_URL = "https://calendar.google.com/calendar/ical/info.lamartina.co%40gmail.com/public/basic.ics";

  try {
    const res = await fetch(CALENDAR_URL);
    if (!res.ok) {
      return new Response(JSON.stringify({ error: `Failed to fetch calendar: ${res.statusText}` }), {
        status: res.status,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    const data = await res.text();
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
