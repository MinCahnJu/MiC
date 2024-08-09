require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async function(event, context) {
  const now = new Date();
  const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  const lastWeek = new Date(koreaTime.setDate(koreaTime.getDate() - 7)).toISOString().slice(0, 19).replace('T', ' ');

  const { data, error } = await supabase
    .from('problems')
    .select('contest_name, problem_name, id')
    .gte('created_at', lastWeek);

  if (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
};
