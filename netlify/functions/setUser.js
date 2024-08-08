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
  
  const { userId, current, password, email, phone } = JSON.parse(event.body);

  if (current == password) {
    const { data, error } = await supabase
      .from('users')
      .update({ email: email, phone: phone })
      .eq('user_id', userId)

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
      body: JSON.stringify({ success: true, message: "정보 수정 성공" }),
    };
  } else {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: false, message: "비밀번호 불일치" }),
    };
  }
};
