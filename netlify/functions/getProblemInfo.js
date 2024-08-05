require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async function(event, context) {
  const id = event.queryStringParameters.id;

  if (!id) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'ID parameter is required' }),
    };
  }

  const { data, error } = await supabase
    .from('problems')
    .select('*')
    .eq("id", id);

  if (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message }),
    };
  }

  if (!data || data.length === 0) {
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Problem not found' }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data[0]),
  };
};