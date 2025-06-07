// Generate a random math problem for the CAPTCHA
"use client";
export const generateCaptcha = () => {
  const operations = ['+', '-', '×'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let num1, num2, answer;
  
  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * 10) + 5; // Ensure num1 >= 5
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // Ensure num2 < num1
      answer = num1 - num2;
      break;
    case '×':
      num1 = Math.floor(Math.random() * 5) + 1; // Keep multiplication simple
      num2 = Math.floor(Math.random() * 5) + 1;
      answer = num1 * num2;
      break;
    default:
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 + num2;
  }
  
  return {
    question: `What is ${num1} ${operation} ${num2}?`,
    answer: answer
  };
};

// Validate the math CAPTCHA
export const validateMathCaptcha = (correctAnswer, userAnswer) => {
  const normalizedUserAnswer = userAnswer.trim();
  
  // Check if the answer is a number
  if (!/^\d+$/.test(normalizedUserAnswer)) {
    return false;
  }
  
  return parseInt(normalizedUserAnswer, 10) === correctAnswer;
};

// Draw image CAPTCHA on canvas (random text with distortion)
export const drawImageCaptcha = (canvas, text) => {
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Set background
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, width, height);
  
  // Add noise (dots)
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3})`;
    ctx.beginPath();
    ctx.arc(
      Math.random() * width,
      Math.random() * height,
      Math.random() * 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  
  // Add lines
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgba(0, 0, 0, ${Math.random() * 0.3})`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.lineTo(Math.random() * width, Math.random() * height);
    ctx.stroke();
  }
  
  // Text settings
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Draw each character with slight rotation
  const chars = text.split('');
  const charWidth = width / (chars.length + 1);
  
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    
    // Save context
    ctx.save();
    
    // Rotate and position each character
    const x = charWidth * (i + 1);
    const y = height / 2 + Math.random() * 10 - 5;
    const rotation = Math.random() * 0.4 - 0.2; // Random rotation between -0.2 and 0.2 radians
    
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    // Draw character
    ctx.fillText(char, 0, 0);
    
    // Restore context
    ctx.restore();
  }
  
  return canvas;
};

// Generate random text for image CAPTCHA
export const generateRandomText = (length = 6) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing characters like I, O, 0, 1
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};