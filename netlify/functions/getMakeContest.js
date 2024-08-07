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
  
  const { current, userId, contestName, contestPassword, contestCheckPassword, contestDescription } = JSON.parse(event.body);

  if (current == userId) {
    if (contestPassword == contestCheckPassword) {
      const { data, error} = await supabase
        .from('contests')
        .insert([
          { contest_name: contestName,
            contest_description: contestDescription,
            user_id: userId,
            contest_pw: contestPassword,
          }
        ]);
  
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
        body: JSON.stringify({ success: true, message: "대회 개최 성공!", contest: { contest_name: contestName,
          contest_description: contestDescription,
          user_id: userId,
          contest_pw: contestPassword } }),
      };
    } else {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ success: false, message: "비밀번호가 일치하지 않습니다." }),
      };
    }
  } else {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: false, message: "본인 아이디를 압력해주세요." }),
    };
  }
};