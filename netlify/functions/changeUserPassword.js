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
  
  const { current, password, newPassword, checkNewPassword } = JSON.parse(event.body);

  if (current == password) {
    if (newPassword == checkNewPassword) {
      if (!/[a-zA-Z]/.test(newPassword )) {
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ success: false, message: "새로운 비밀번호가 영어를 포함하지 않습니다.\n비밀번호는 8자 이상이어야 하며 영문자, 숫자를 포함해야합니다." }),
        };
      } else if (!/[0-9]/.test(newPassword )) {
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ success: false, message: "새로운 비밀번호가 숫자를 포함하지 않습니다.\n비밀번호는 8자 이상이어야 하며 영문자, 숫자를 포함해야합니다." }),
        };
      } else if (newPassword.length < 8) {
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ success: false, message: "새로운 비밀번호가 8자 미만입니다.\n비밀번호는 8자 이상이어야 하며 영문자, 숫자를 포함해야합니다." }),
        };
      } else {
        const { data, error } = await supabase
          .from('users')
          .update({ user_pw: newPassword })
          .eq('user_pw', password)

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
          body: JSON.stringify({ success: true, message: "비밀번호 변경 성공" }),
        };
      }
    } else {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ success: false, message: "새로운 비밀번호가 일치하지 않습니다." }),
      };
    }
  } else {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: false, message: "기존 비밀번호가 일치하지 않습니다." }),
    };
  }
};
