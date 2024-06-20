import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set your OpenAI API key
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel('gemini-1.5-flash')

def get_diagnosis(question, context):
  custom_prompt_template = f"""
You are a medical diagnosis model and a medical professional, you will be given a question and a context.
Try to figure out possible causes for symptoms provided by the user
Write in a list the possible causes detailed reasons why you concluded on each cause
If you do not have enough information to reach a conclusion ask the user for more information
Use any information you have access to to answer the user's question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Do not say I am not a medical professional and cannot provide medical advice.

Context: {context}
Question: {question}

Only return the helpful answer below and nothing else.
Helpful answer:
"""

  response = model.generate_content(custom_prompt_template)
  return response
