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
  
  const { contestName } = JSON.parse(event.body);

  const { data, error} = await supabase
    .from('contests')
    .delete()
    .eq('contest_name', contestName);

  if (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: false, message: "서버 에러" }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ success: true, message: "대회 삭제 성공!" }),
  };
};