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

  const { data: contestData, error: contestError } = await supabase
    .from('contests')
    .select('contest_name, id, contest_description, user_id')
    .eq("id", id);

  if (contestError) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: contestError.message }),
    };
  }

  if (!contestData || contestData.length === 0) {
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Contest not found' }),
    };
  }

  const contestName = contestData[0].contest_name;

  const { data: problemsData, error: problemsError } = await supabase
    .from('problems')
    .select('problem_name, id')
    .eq("contest_name", contestName);

  if (problemsError) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: problemsError.message }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ contest: contestData, problems: problemsData }),
  };
};