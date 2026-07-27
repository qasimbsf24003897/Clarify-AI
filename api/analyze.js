import Groq from "groq-sdk";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({error:"Method not allowed"});
  }

  try {

    const groq = new Groq({
      apiKey: process.env.VITE_GROQ_API_KEY,
    });

    const { decision } = req.body;

    const completion = await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      temperature: 0.6,

      response_format:{
        type:"json_object"
      },

      messages:[
        {
          role:"system",
          content:`You are Clarify AI. Return only JSON with:
{
"confidence":85,
"recommendation":"",
"pros":["","",""],
"cons":["",""],
"nextStep":"",
"riskScore":30,
"riskLevel":"",
"riskReason":""
}`
        },
        {
          role:"user",
          content: decision
        }
      ]

    });


    const data = JSON.parse(
      completion.choices[0].message.content
    );


    res.status(200).json(data);


  } catch(error){

    console.log(error);

    res.status(500).json({
      error:"AI failed"
    });

  }

}