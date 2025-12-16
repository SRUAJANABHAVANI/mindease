// controllers/aiController.js
const AIQuestion = require('../models/aiQuestionModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { OpenAI } = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Process a question and determine if it should trigger the chatbot
const processQuestion = asyncHandler(async (req, res) => {
  const { question } = req.body;
  
  if (!question) {
    res.status(400);
    throw new Error('Please provide a question');
  }
  
  // Check if the question contains keywords that should trigger the chatbot
  const lowercaseQuestion = question.toLowerCase();
  const triggerKeywords = await AIQuestion.find({
    triggerChatbot: true
  });
  
  let shouldTriggerChatbot = false;
  
  for (const trigger of triggerKeywords) {
    if (trigger.keywords.some(keyword => 
      lowercaseQuestion.includes(keyword.toLowerCase())
    )) {
      shouldTriggerChatbot = true;
      break;
    }
  }
  
  let response;
  
  if (shouldTriggerChatbot) {
    // Use OpenAI to generate a response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for students. Provide concise, accurate answers to their questions about education, learning, and personal development."
        },
        {
          role: "user",
          content: question
        }
      ],
      max_tokens: 150
    });
    
    response = completion.choices[0].message.content;
    
    // Save this interaction to the user's history
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          aiChatHistory: {
            question,
            answer: response,
            timestamp: new Date()
          }
        }
      }
    );
  } else {
    // Return a message indicating that the AI assistant needs more information
    response = "I need more information to assist you properly. Please provide more details about your question.";
  }
  
  res.json({
    question,
    answer: response,
    showChatbot: shouldTriggerChatbot
  });
});

// Save an interaction to user history
const saveInteraction = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;
  
  if (!question || !answer) {
    res.status(400);
    throw new Error('Please provide question and answer');
  }
  
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        aiChatHistory: {
          question,
          answer,
          timestamp: new Date()
        }
      }
    },
    { new: true }
  );
  
  res.json(updatedUser.aiChatHistory);
});

// Get chat history
const getChatHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  res.json(user.aiChatHistory);
});

module.exports = {
  processQuestion,
  saveInteraction,
  getChatHistory
};