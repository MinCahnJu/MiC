require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async function(event, context) {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Invalid request, no body provided" })
    };
  }
  
  const { name, value } = JSON.parse(event.body);

  const { data, error } = await supabase
    .from('users')
    .update({ authority: value })
    .eq('name', name)

  if (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: false, message: error.message }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ success: true, message: "권한 수정 성공" }),
  };
};
