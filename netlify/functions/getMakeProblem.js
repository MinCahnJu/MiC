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
  
  const { contestName, problemName, problemDescription, problemInputDescription, problemOutputDescription, problemExampleInput, problemExampleOutput } = JSON.parse(event.body);

  const { data, error} = await supabase
    .from('problems')
    .insert([
      { contest_name: contestName,
        problem_name: problemName,
        problem_description: problemDescription,
        problem_input_description: problemInputDescription,
        problem_output_description: problemOutputDescription,
        problem_example_input: problemExampleInput,
        problem_example_output: problemExampleOutput,
      }
    ]);

  if (error) {
    if (error.message == "duplicate key value violates unique constraint \"problems_problem_name_key\"") {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ success: false, message: "중복된 문제 제목입니다." }),
      };
    }
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
    body: JSON.stringify({ success: true, message: "문제 추가 성공!" }),
  };
};