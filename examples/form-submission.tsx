/**
 * Example 3: Form Submission with Animation
 *
 * This example demonstrates using the AiCreating component
 * with form submission and validation.
 */

'use client';

import { useState, FormEvent } from 'react';
import { AiCreating } from '../index';

interface FormData {
  title: string;
  description: string;
  category: string;
}

export default function FormSubmissionExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'general',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitted(false);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Process the form data
      console.log('Form submitted:', formData);

      setSubmitted(true);

      // Reset form after delay
      setTimeout(() => {
        setFormData({ title: '', description: '', category: 'general' });
        setSubmitted(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Form Submission Example</h1>

      {/* Show animation during submission */}
      {isLoading ? (
        <div className="mb-6">
          <AiCreating
            isLoading={isLoading}
            onComplete={() => console.log('Form submitted successfully!')}
          />
          <p className="text-center text-gray-600 mt-4">Processing your submission...</p>
        </div>
      ) : submitted ? (
        <div className="mb-6 p-6 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">✓ Success!</h2>
          <p>Your form has been submitted successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter title..."
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter description..."
            />
          </div>

          {/* Category Field */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="general">General</option>
              <option value="technical">Technical</option>
              <option value="creative">Creative</option>
              <option value="business">Business</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            Submit Form
          </button>
        </form>
      )}
    </div>
  );
}
