exports.handler = async (event, context) => {
  const apiKey = process.env.REACT_APP_TICKETMASTER_APIKEY;
  const apiBaseUrl = process.env.REACT_APP_TICKETMASTER_API_BASE_URL || 'https://app.ticketmaster.com';
  const apiPath = process.env.REACT_APP_TICKETMASTER_API_PATH || '/discovery/v2';

  // Extract the path from the request
  // URL format: /api/ticketmaster/events?...
  const requestPath = event.path.replace('/api/ticketmaster', '');
  const queryString = event.queryStringParameters 
    ? '?' + new URLSearchParams(event.queryStringParameters).toString()
    : '';

  const targetUrl = `${apiBaseUrl}${apiPath}${requestPath}${queryString}`;

  try {
    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
