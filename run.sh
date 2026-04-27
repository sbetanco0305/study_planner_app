#!/bin/bash

echo "🚀 Starting Study Planner App..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Start the development server
echo "🔥 Running dev server..."
npm run dev