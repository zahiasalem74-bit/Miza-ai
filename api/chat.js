exports.handler = async (event) => {

  if (event.httpMethod === 'OPTIONS') {

    return {

      statusCode: 200,

      headers: {

        'Access-Control-Allow-Origin': '*',

        'Access-Control-Allow-Headers': 'Content-Type'

      },

      body: ''

    };

  }



  try {

    const { system, messages } = JSON.parse(event.body || '{}');



    const response = await fetch('https://api.anthropic.com/v1/messages', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

        'x-api-key': process.env.ANTHROPIC_API_KEY,

        'anthropic-version': '2023-06-01'

      },

      body: JSON.stringify({

        model: 'claude-3-haiku-20240307',

        max_tokens: 700,

        system: system || 'You are a warm, ethical AI intake assistant. Ask one question at a time. Do not diagnose.',

        messages: messages || []

      })

    });



    const data = await response.json();



    return {

      statusCode: response.ok ? 200 : response.status,

      headers: {

        'Access-Control-Allow-Origin': '*',

        'Content-Type': 'application/json'

      },

      body: JSON.stringify(data)

    };

  } catch (error) {

    return {

      statusCode: 500,

      headers: {

        'Access-Control-Allow-Origin': '*',

        'Content-Type': 'application/json'

      },

      body: JSON.stringify({ error: error.message })

    };

  }

};
